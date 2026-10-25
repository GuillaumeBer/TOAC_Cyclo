"""Base de données des sorties (SQLite, fichier db/sorties.sqlite).

Trois rôles distincts :
  - `sorties` + `circuits` : ce que l'agent a trouvé (source de vérité, alimentée à chaque recherche, y compris en simulation) ;
  - `envois` : ce qui a été communiqué sur chaque canal (WhatsApp, fichier...), pour ne pas répéter un message ;
  - `recherches` : l'historique des recherches (période, nombre de sorties, coût).

Consultation :  python db.py [période]     ex. python db.py octobre
"""

import json
import sqlite3
import sys
from contextlib import closing
from datetime import date, datetime
from pathlib import Path

import tracking
from periode import Periode, format_date, parse_periode

HERE = Path(__file__).parent
DB_PATH = HERE / "db" / "sorties.sqlite"
LEGACY_STATE = HERE / "state" / "sent.json"

SCHEMA = """
CREATE TABLE IF NOT EXISTS sorties (
    id                   TEXT PRIMARY KEY,          -- semaine ISO + commune, ex. 2026-W38|venerque
    date                 TEXT NOT NULL,             -- AAAA-MM-JJ
    titre                TEXT,
    organisateur         TEXT,
    federation           TEXT,                      -- FFVélo | FSGT | UFOLEP | autre | NULL si aucun indice explicite
    lieu_depart          TEXT,
    code_postal          TEXT,
    adresse_depart       TEXT,
    heure_rdv            TEXT,
    heure_depart         TEXT,
    disciplines          TEXT,                      -- JSON : ["route", "vtt"]
    tarif_inscription    TEXT,
    contact              TEXT,
    url                  TEXT,
    type                 TEXT,                      -- ouverte | sortie_club | permanente
    statut               TEXT,                      -- maintenue | annulee
    fiabilite            TEXT,                      -- confirmee | a_verifier
    preuve_date          TEXT,                      -- citation prouvant l'édition de l'année
    distance_toulouse_km REAL,
    ecartee              TEXT,                      -- motif si la sortie ne remplit pas les critères (NULL = retenue)
    premiere_vue         TEXT NOT NULL,
    derniere_vue         TEXT NOT NULL,
    donnees              TEXT NOT NULL              -- fiche complète en JSON
);
CREATE INDEX IF NOT EXISTS idx_sorties_date ON sorties(date);

CREATE TABLE IF NOT EXISTS circuits (
    sortie_id   TEXT NOT NULL REFERENCES sorties(id) ON DELETE CASCADE,
    discipline  TEXT,
    distance_km REAL,
    denivele_m  REAL,
    lien_trace  TEXT,
    trace_titre TEXT,                               -- titre du tracé sur OpenRunner
    trace_annee TEXT                                -- année lue dans ce titre (peut différer de l'édition)
);
CREATE INDEX IF NOT EXISTS idx_circuits_sortie ON circuits(sortie_id);

CREATE TABLE IF NOT EXISTS envois (
    canal      TEXT NOT NULL,
    sortie_id  TEXT NOT NULL,
    etat       TEXT NOT NULL,                       -- JSON : {sent, candidate, candidate_count, ref}
    mis_a_jour TEXT NOT NULL,
    PRIMARY KEY (canal, sortie_id)
);

CREATE TABLE IF NOT EXISTS recherches (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    lancee_le  TEXT NOT NULL,
    debut      TEXT NOT NULL,
    fin        TEXT NOT NULL,
    libelle    TEXT,
    retenues   INTEGER,
    ecartees   INTEGER,
    cout_usd   REAL
);
"""

COLUMNS = ("date", "titre", "organisateur", "federation", "lieu_depart", "code_postal", "adresse_depart", "heure_rdv", "heure_depart",
           "tarif_inscription", "contact", "url", "type", "statut", "fiabilite", "preuve_date", "distance_toulouse_km")


def connect() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    conn.executescript(SCHEMA)
    _ensure_columns(conn)
    _migrate_legacy_state(conn)
    return conn


def _ensure_columns(conn: sqlite3.Connection) -> None:
    """Ajoute à une base existante les colonnes créées après coup (CREATE TABLE IF NOT EXISTS ne modifie pas une table déjà là)."""
    existing = {row["name"] for row in conn.execute("PRAGMA table_info(sorties)")}
    for column in COLUMNS:
        if column not in existing:
            conn.execute(f"ALTER TABLE sorties ADD COLUMN {column} " + ("REAL" if column.endswith("_km") else "TEXT"))
    existing = {row["name"] for row in conn.execute("PRAGMA table_info(circuits)")}
    for column in ("trace_titre", "trace_annee"):
        if column not in existing:
            conn.execute(f"ALTER TABLE circuits ADD COLUMN {column} TEXT")
    conn.commit()


def _now() -> str:
    return datetime.now().isoformat(timespec="seconds")


def _migrate_legacy_state(conn: sqlite3.Connection) -> None:
    """Reprend l'ancien état JSON (state/sent.json, rangé par week-end) dans la table `envois`, une seule fois."""
    if not LEGACY_STATE.exists():
        return
    legacy = json.loads(LEGACY_STATE.read_text(encoding="utf-8"))
    for entries in legacy.values():
        for old_key, entry in entries.items():
            sent_date = (entry.get("ref") or {}).get("date") or entry["sent"].get("date")
            if not sent_date:
                continue
            year, week, _ = date.fromisoformat(sent_date).isocalendar()
            conn.execute(
                "INSERT OR IGNORE INTO envois (canal, sortie_id, etat, mis_a_jour) VALUES ('whatsapp', ?, ?, ?)",
                (f"{year}-W{week:02d}|{old_key}", json.dumps(entry, ensure_ascii=False), _now()),
            )
    conn.commit()
    LEGACY_STATE.rename(LEGACY_STATE.with_suffix(".json.migre"))


# --- Ce que l'agent a trouvé -------------------------------------------------------------------------------------

def save_search(
    periode: Periode, kept: list[dict], rejected: list[tuple[dict, str]], cost_usd: float = 0.0
) -> None:
    """Enregistre le résultat d'une recherche : sorties retenues, sorties écartées (avec le motif) et l'historique."""
    now = _now()
    with closing(connect()) as conn, conn:
        for sorties, motifs in ((kept, None), ([s for s, _ in rejected], [m for _, m in rejected])):
            keyed = tracking.assign_keys(sorties) if sorties else {}
            for i, (key, s) in enumerate(keyed.items()):
                _upsert(conn, key, s, motifs[i] if motifs else None, now)
        conn.execute(
            "INSERT INTO recherches (lancee_le, debut, fin, libelle, retenues, ecartees, cout_usd) VALUES (?,?,?,?,?,?,?)",
            (now, periode.start.isoformat(), periode.end.isoformat(), periode.label, len(kept), len(rejected), cost_usd),
        )


def _upsert(conn: sqlite3.Connection, key: str, s: dict, motif: str | None, now: str) -> None:
    values = {c: s.get(c) for c in COLUMNS}
    if values["date"] is None:
        return  # sans date, la sortie n'est pas exploitable
    conn.execute(
        f"""INSERT INTO sorties (id, {', '.join(COLUMNS)}, disciplines, ecartee, premiere_vue, derniere_vue, donnees)
            VALUES (?, {', '.join('?' for _ in COLUMNS)}, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                {', '.join(f'{c}=excluded.{c}' for c in COLUMNS)},
                disciplines=excluded.disciplines, ecartee=excluded.ecartee,
                derniere_vue=excluded.derniere_vue, donnees=excluded.donnees""",
        (key, *values.values(), json.dumps(s.get("disciplines") or []), motif, now, now, json.dumps(s, ensure_ascii=False)),
    )
    conn.execute("DELETE FROM circuits WHERE sortie_id = ?", (key,))
    conn.executemany(
        "INSERT INTO circuits (sortie_id, discipline, distance_km, denivele_m, lien_trace, trace_titre, trace_annee) VALUES (?,?,?,?,?,?,?)",
        [(key, c.get("discipline"), c.get("distance_km"), c.get("denivele_m"), c.get("lien_trace"), c.get("trace_titre"), c.get("trace_annee"))
         for c in s.get("circuits") or []],
    )


def update_sorties(sorties: list[dict]) -> None:
    """Met à jour des sorties déjà en base (identifiant conservé), par exemple après une revérification ciblée."""
    now = _now()
    technical = {"id", "donnees", "ecartee", "premiere_vue", "derniere_vue"}
    with closing(connect()) as conn, conn:
        for s in sorties:
            _upsert(conn, s["id"], {k: v for k, v in s.items() if k not in technical}, s.get("ecartee"), now)


def sorties_between(periode: Periode, retenues_seulement: bool = True) -> list[dict]:
    """Sorties enregistrées dans la période, avec leurs circuits."""
    with closing(connect()) as conn:
        rows = conn.execute(
            "SELECT * FROM sorties WHERE date BETWEEN ? AND ? " + ("AND ecartee IS NULL " if retenues_seulement else "")
            + "ORDER BY date, COALESCE(heure_depart, heure_rdv, '99:99')",
            (periode.start.isoformat(), periode.end.isoformat()),
        ).fetchall()
        result = []
        for row in rows:
            # la fiche JSON complète apporte les champs sans colonne (indice de fédération, vérification...) ; les colonnes priment
            s = {**json.loads(row["donnees"]), **dict(row)}
            s["disciplines"] = json.loads(row["disciplines"] or "[]")
            s["circuits"] = [dict(c) for c in conn.execute(
                "SELECT discipline, distance_km, denivele_m, lien_trace, trace_titre, trace_annee FROM circuits WHERE sortie_id = ? ORDER BY discipline, distance_km",
                (s["id"],))]
            result.append(s)
        return result


def all_retenues(depuis: str | None = None, jusqu_a: str | None = None) -> list[dict]:
    """Toutes les sorties retenues en base dans la fenêtre [depuis, jusqu_a], avec leurs circuits."""
    with closing(connect()) as conn:
        query = "SELECT * FROM sorties WHERE ecartee IS NULL "
        params: list[str] = []
        if depuis:
            query += "AND date >= ? "
            params.append(depuis)
        if jusqu_a:
            query += "AND date <= ? "
            params.append(jusqu_a)
        query += "ORDER BY date, COALESCE(heure_depart, heure_rdv, '99:99')"
        rows = conn.execute(query, tuple(params)).fetchall()
        result = []
        for row in rows:
            s = {**json.loads(row["donnees"]), **dict(row)}
            s["disciplines"] = json.loads(row["disciplines"] or "[]")
            s["circuits"] = [dict(c) for c in conn.execute(
                "SELECT discipline, distance_km, denivele_m, lien_trace, trace_titre, trace_annee FROM circuits WHERE sortie_id = ? ORDER BY discipline, distance_km",
                (s["id"],))]
            result.append(s)
        return result


def last_search_info() -> dict | None:
    """Renvoie les métadonnées de la dernière recherche enregistrée."""
    with closing(connect()) as conn:
        row = conn.execute("SELECT * FROM recherches ORDER BY id DESC LIMIT 1").fetchone()
        return dict(row) if row else None


# --- Ce qui a été communiqué sur chaque canal ---------------------------------------------------------------------

def load_state(canal: str) -> dict:
    with closing(connect()) as conn:
        return {r["sortie_id"]: json.loads(r["etat"]) for r in conn.execute("SELECT * FROM envois WHERE canal = ?", (canal,))}


def save_state(canal: str, state: dict) -> None:
    now = _now()
    with closing(connect()) as conn, conn:
        conn.executemany(
            "INSERT INTO envois (canal, sortie_id, etat, mis_a_jour) VALUES (?,?,?,?) "
            "ON CONFLICT(canal, sortie_id) DO UPDATE SET etat=excluded.etat, mis_a_jour=excluded.mis_a_jour",
            [(canal, key, json.dumps(entry, ensure_ascii=False), now) for key, entry in state.items()],
        )


def lister(periode: Periode) -> None:
    """Affiche les sorties enregistrées pour la période (retenues et écartées)."""
    found = sorties_between(periode, retenues_seulement=False)
    print(f"{len(found)} sortie(s) enregistrée(s) — {periode.describe()}  (base : {DB_PATH})\n")
    for s in found:
        status = "retenue" if not s["ecartee"] else f"écartée : {s['ecartee']}"
        liens = sum(1 for c in s["circuits"] if c["lien_trace"])
        print(f"{format_date(date.fromisoformat(s['date']))} {s['heure_depart'] or s['heure_rdv'] or '?':>5}  {s['titre']} ({s['lieu_depart']}) "
              f"[{s['fiabilite']}, {len(s['circuits'])} circuits, {liens} tracés] — {status}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    lister(parse_periode(" ".join(sys.argv[1:]) or "4 prochaines semaines"))

