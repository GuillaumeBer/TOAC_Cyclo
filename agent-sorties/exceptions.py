"""Agent de recherche des « sorties d'exception » : événements cyclotouristes plus longs ou plus lointains que les sorties
du week-end autour de Toulouse (cyclomontagnardes, grands événements gravel, grandes randonnées route), sans compétition.

    python agent.py exceptions [--mois 12] [--max-verif 10] [--themes cyclomontagnardes,gravel,randos]
        Découvre les événements des prochains mois (un passage par thème), vérifie chaque édition chez l'organisateur,
        les enregistre dans db/exceptions.json et publie data/activites.json (+ public/data/activites.json).

    python agent.py exceptions --publier-seulement
        Republie le site à partir de ce qui est déjà enregistré, sans aucune recherche.

Règles déterministes appliquées après l'agent (il ne décide pas seul) :
    - seulement les événements « ouverte » (jamais une compétition ni un événement réservé) ;
    - ceux à moins de 65 km de Toulouse sont exclus : ils sont déjà dans « Autour de Toulouse » ;
    - « exception » si la plus courte option fait moins de 200 km, « ultra » (BRM, grands raids) sinon : les « ultra » sont
      enregistrés mais pas encore publiés ;
    - une date n'est « confirmée » que si une page de l'organisateur la prouve avec une citation contenant l'année.
"""

import json
import re
import sys
import unicodedata
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime, timedelta
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent
STORE = HERE / "db" / "exceptions.json"
OUTPUT_DIR = HERE / "output"

MIN_DISTANCE_TOULOUSE_KM = 65  # en deçà : sorties « Autour de Toulouse »
ULTRA_MIN_KM = 200
FEDERATIONS = ("FFVélo", "FSGT", "UFOLEP")
MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]

THEMES = {
    "cyclomontagnardes": (
        "les cyclomontagnardes et brevets de montagne sous label FFVélo (BCMF) dans les grands massifs français "
        "(Pyrénées, Alpes, Massif central, Jura, Vosges), formules « Grimpeur » ou « Baroudeur » sans chrono"
    ),
    "gravel": (
        "les grands événements gravel et bikepacking non chronométrés en Occitanie et régions voisines "
        "(Nouvelle-Aquitaine, Auvergne-Rhône-Alpes, PACA) : randonnées gravel, traversées, boucles en autonomie"
    ),
    "randos": (
        "les grandes randonnées cyclotouristes ROUTE qui valent le déplacement (paysages, cols, réputation), "
        "en Occitanie et dans un rayon d'environ 350 km autour de Toulouse (Pyrénées, Aveyron, Lot, Tarn, Gers, Ariège, Aude, "
        "Hérault, Gard, Landes, Pays basque), de 100 à 199 km, non chronométrées"
    ),
}

DISCOVERY_PROMPT = """Tu aides la section cyclotourisme du TOAC (Toulouse) à repérer des « sorties d'exception » : des événements
cyclotouristes PLUS LONGS OU PLUS LOINTAINS que les randonnées habituelles autour de Toulouse, qui valent un déplacement.

Ta mission : trouver, pour le thème demandé et pour la période indiquée, les événements dont l'édition est annoncée.

Règles :
- Cyclotourisme uniquement : randonnées, brevets, cyclomontagnardes, événements gravel/bikepacking SANS chronométrage ni classement.
  EXCLUS : courses, cyclosportives chronométrées (ex. l'Ariégeoise, la Vélotoise), championnats, épreuves FFC/UFOLEP avec classement,
  enduros, courses VTT. En cas de doute sur le chronométrage, type = "competition".
- Ouvert à tous (licenciés ou non, éventuellement avec licence à la journée). Pas d'événement réservé aux membres d'un club.
- Une seule édition par événement : celle de la période. Les pages mélangent souvent plusieurs années : ne prends pas une ancienne édition.
- Commence par les sources listées, puis complète par ta recherche web. Un agrégateur (Miles Republic, calendriers régionaux) ne suffit
  pas à prouver une date : donne si possible la page de l'ORGANISATEUR. Si seul un agrégateur existe, renseigne-le mais précise-le.
- N'invente rien : champ introuvable = null. Pas de date devinée : si seul le mois est annoncé, renseigne "date_precision": "mois".
- distance_toulouse_km : estimation de la distance routière entre Toulouse et le lieu de départ.
- distance_min_km / distance_max_km : plus courte et plus longue option VÉLO proposées (en km), pas la marche.
- federation : "FFVélo", "FSGT", "UFOLEP" ou "autre", sur un indice explicite (logo, label, calendrier fédéral) sinon null.

Réponse finale : uniquement un bloc ```json
{
  "evenements": [
    {
      "titre": "...",
      "organisateur": "...",
      "date_debut": "AAAA-MM-JJ",
      "date_fin": "AAAA-MM-JJ",
      "date_precision": "jour" | "mois",
      "lieu_depart": "Commune (département)",
      "distance_toulouse_km": 120,
      "distance_min_km": 100,
      "distance_max_km": 180,
      "denivele_max_m": 4400 ou null,
      "disciplines": ["route", "gravel", "vtt"],
      "montagne": true | false,
      "type": "ouverte" | "competition" | "reserve",
      "federation": "FFVélo" | "FSGT" | "UFOLEP" | "autre" | null,
      "url": "page de l'organisateur (ou à défaut de l'agrégateur)",
      "source_organisateur": true | false,
      "preuve_date": "citation courte contenant l'année de l'édition" ou null,
      "resume": "une ou deux phrases : ce qui rend l'événement exceptionnel"
    }
  ],
  "notes": "limites de la recherche"
}
Si tu ne trouves rien, renvoie une liste vide et explique pourquoi dans "notes"."""

VERIFY_PROMPT = """Tu vérifies UNE édition d'événement cyclotouriste pour le TOAC (section cyclotourisme). La fiche vient d'un calendrier ou
d'un agrégateur : dates, distances et dénivelés y sont souvent approximatifs ou périmés.

Méthode :
- Trouve la page officielle de l'ORGANISATEUR consacrée à cet événement (club, comité, office de tourisme organisateur) : agenda,
  programme, parcours, inscriptions. Ouvre plusieurs pages si besoin. Un agrégateur ne suffit pas.
- ÉDITION : ne retiens que l'édition de l'année demandée. Une page qui affiche une autre année n'est pas la bonne.
  "preuve_date" = citation exacte et courte contenant l'année. Si aucune page de l'organisateur ne prouve cette édition, renvoie
  "edition_verifiee": false et laisse le reste à null.
- Dates : recopie les dates de l'édition telles qu'affichées (AAAA-MM-JJ). Chronométrage : si l'événement est chronométré avec classement,
  mets "type": "competition".
- Distances et dénivelés : liste les options VÉLO de l'édition (plus courte et plus longue) et le dénivelé de la plus longue.
- N'invente rien : champ introuvable = null.

Réponse finale : uniquement un bloc ```json
{
  "edition_verifiee": true | false,
  "type": "ouverte" | "competition" | "reserve",
  "date_debut": "AAAA-MM-JJ",
  "date_fin": "AAAA-MM-JJ",
  "preuve_date": "citation exacte",
  "url": "page officielle de l'organisateur pour cette édition",
  "distance_min_km": 100,
  "distance_max_km": 180,
  "denivele_max_m": 4400,
  "federation": "FFVélo" | "FSGT" | "UFOLEP" | "autre" | null,
  "notes": "doutes éventuels"
}"""


def slug(text: str | None) -> str:
    plain = unicodedata.normalize("NFKD", text or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", plain).strip("-")


def event_id(e: dict) -> str:
    return f"{slug(e.get('titre'))}-{(e.get('date_debut') or '')[:4]}"


def parse_json(text: str) -> dict:
    match = re.search(r"```json\s*(\{.*?\})\s*```", text, re.DOTALL)
    raw = match.group(1) if match else text[text.find("{") : text.rfind("}") + 1]
    return json.loads(raw)


# --- Base (fichier JSON local) --------------------------------------------------------------------------------------

def load_store() -> dict:
    """Charge la base ; à la première utilisation, reprend la sélection saisie à la main dans data/activites.json."""
    if STORE.exists():
        return json.loads(STORE.read_text(encoding="utf-8"))
    store: dict = {}
    legacy = ROOT / "data" / "activites.json"
    if legacy.exists():
        for r in json.loads(legacy.read_text(encoding="utf-8")).get("randonnees", []):
            e = {
                "id": r["id"], "titre": r["titre"], "organisateur": None,
                "date_debut": r["start"], "date_fin": r["end"], "date_precision": "jour", "date_label": r.get("date_label"),
                "lieu_depart": r["lieu_depart"], "resume": r.get("resume"), "federation": r.get("federation"),
                "disciplines": r.get("disciplines") or ["route"], "montagne": bool(r.get("montagne")),
                "url": r.get("url"), "type": "ouverte", "classe": "exception", "fiabilite": "a_verifier",
                "distance_toulouse_km": None, "distance_min_km": None, "distance_max_km": None, "denivele_max_m": None,
                "preuve_date": None, "origine": "saisie manuelle",
            }
            store[e["id"]] = e
    return store


def save_store(store: dict) -> None:
    STORE.parent.mkdir(exist_ok=True)
    STORE.write_text(json.dumps(store, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


# --- Doublons -------------------------------------------------------------------------------------------------------

GENERIC_WORDS = {"cyclomontagnarde", "cyclomontagnardes", "brevet", "randonneur", "randonneurs", "gravel", "grand", "depart",
                 "edition", "de", "des", "du", "la", "le", "les", "d", "l", "et", "a", "au", "en", "tour"}
AGGREGATORS = ("milesrepublic", "running.life", "kerrun", "finishers.com")


def _words(e: dict) -> set[str]:
    return {w for w in slug(e.get("titre")).split("-") if len(w) >= 4 and w not in GENERIC_WORDS}


def _commune(e: dict) -> str:
    return slug(re.split(r"[(–,-]", e.get("lieu_depart") or "")[0])


def same_event(a: dict, b: dict) -> bool:
    """Deux fiches du même événement : même jour de départ et même commune, ou même mot distinctif dans le titre."""
    if a.get("date_debut") != b.get("date_debut"):
        return False
    ca, cb = _commune(a), _commune(b)
    return bool((ca and ca == cb) or (_words(a) & _words(b)))


def quality(e: dict) -> tuple:
    """Meilleure fiche à garder : vérifiée, avec parcours, page d'un organisateur plutôt que d'un agrégateur."""
    url = str(e.get("url") or "")
    return (
        e.get("fiabilite") == "confirmee",
        e.get("distance_max_km") is not None,
        not any(a in url for a in AGGREGATORS),
        e.get("origine") != "saisie manuelle",
    )


def dedupe(events: list[dict]) -> list[dict]:
    kept: list[dict] = []
    for e in sorted(events, key=quality, reverse=True):
        if not any(same_event(e, k) for k in kept):
            kept.append(e)
    return sorted(kept, key=lambda e: e["date_debut"])


# --- Règles déterministes ------------------------------------------------------------------------------------------

def year_proven(e: dict) -> bool:
    return (e.get("date_debut") or "")[:4] in (e.get("preuve_date") or "")


def classify(e: dict) -> str:
    """« ultra » dès que la plus courte option fait 200 km ou plus ; sinon « exception »."""
    shortest = e.get("distance_min_km") or e.get("distance_max_km")
    return "ultra" if shortest is not None and shortest >= ULTRA_MIN_KM else "exception"


def keep(e: dict, horizon_end: date, today: date) -> tuple[bool, str]:
    if e.get("type") != "ouverte":
        return False, f"type {e.get('type')!r}"
    try:
        start = date.fromisoformat(e.get("date_debut") or "")
    except ValueError:
        return False, "date illisible"
    if not today <= start <= horizon_end:
        return False, f"date {start} hors de la période"
    d = e.get("distance_toulouse_km")
    if d is not None and d <= MIN_DISTANCE_TOULOUSE_KM:
        return False, f"à {d} km de Toulouse : déjà dans « Autour de Toulouse »"
    if not str(e.get("url") or "").startswith("http"):
        return False, "aucune URL"
    return True, ""


# --- Recherche ------------------------------------------------------------------------------------------------------

def discover(run_claude, theme: str, today: date, horizon_end: date) -> tuple[list[dict], float]:
    sources = (HERE / "sources-exceptions.md").read_text(encoding="utf-8")
    user = (
        f"Thème : {THEMES[theme]}.\n"
        f"Période : du {today.isoformat()} au {horizon_end.isoformat()} (éditions annoncées).\n"
        f"Date du jour : {today.isoformat()}.\n\nSources et pistes de recherche :\n\n{sources}"
    )
    text, envelope = run_claude(DISCOVERY_PROMPT, user)
    OUTPUT_DIR.mkdir(exist_ok=True)
    (OUTPUT_DIR / f"{today.isoformat()}.exceptions-{theme}.txt").write_text(text, encoding="utf-8")
    try:
        events = parse_json(text).get("evenements", [])
    except (ValueError, json.JSONDecodeError):
        print(f"[{theme}] réponse illisible, thème ignoré (voir le fichier exceptions-{theme}.txt)", file=sys.stderr)
        events = []
    return events, envelope.get("total_cost_usd", 0)


def verify(run_claude, e: dict) -> tuple[dict, float]:
    user = (
        f"Événement : {e['titre']} ({e.get('organisateur') or 'organisateur inconnu'}), départ {e.get('lieu_depart')}.\n"
        f"Édition recherchée : {e['date_debut']} au {e.get('date_fin') or e['date_debut']}.\n"
        f"Page déjà repérée : {e.get('url')}\nDate du jour : {date.today().isoformat()}."
    )
    try:
        text, envelope = run_claude(VERIFY_PROMPT, user)
        return parse_json(text), envelope.get("total_cost_usd", 0)
    except Exception as err:  # une vérification qui échoue ne doit pas bloquer les autres
        print(f"[vérification] {e['titre']} : {err}", file=sys.stderr)
        return {"edition_verifiee": False}, 0.0


def merge_verification(e: dict, v: dict) -> None:
    if not v.get("edition_verifiee") or not str(v.get("preuve_date") or ""):
        e["fiabilite"] = "a_verifier"
        return
    for field in ("type", "date_debut", "date_fin", "url", "distance_min_km", "distance_max_km", "denivele_max_m", "federation"):
        if v.get(field) is not None:
            e[field] = v[field]
    e["preuve_date"] = v["preuve_date"]
    e["date_precision"] = "jour"
    e["fiabilite"] = "confirmee" if year_proven(e) else "a_verifier"


def run(run_claude, months: int = 12, max_verif: int = 10, themes: list[str] | None = None) -> None:
    today = date.today()
    horizon_end = today + timedelta(days=round(months * 30.4))
    themes = themes or list(THEMES)
    store = load_store()
    cost = 0.0

    print(f"Recherche des sorties d'exception jusqu'au {horizon_end} ({', '.join(themes)})...", file=sys.stderr)
    with ThreadPoolExecutor(max_workers=3) as pool:
        results = list(pool.map(lambda t: discover(run_claude, t, today, horizon_end), themes))

    found: dict[str, dict] = {}
    for events, c in results:
        cost += c
        for e in events:
            e["id"] = event_id(e)
            ok, reason = keep(e, horizon_end, today)
            if not ok:
                print(f"[écarté] {e.get('titre')} : {reason}", file=sys.stderr)
                continue
            found.setdefault(e["id"], e)

    # Les événements déjà en base sont revérifiés avec les nouveaux : une édition annoncée peut changer ou disparaître.
    candidates = list(found.values())
    for old_id, old in store.items():
        if old_id not in found and date.fromisoformat(old["date_fin"] if "date_fin" in old else old["date_debut"]) >= today:
            candidates.append(old)
    candidates = dedupe(candidates)

    to_verify = [e for e in candidates if e.get("source_organisateur") is not True or not year_proven(e)][:max_verif]
    print(f"Vérification chez les organisateurs ({len(to_verify)} événements)...", file=sys.stderr)
    with ThreadPoolExecutor(max_workers=3) as pool:
        verifications = list(pool.map(lambda e: verify(run_claude, e), to_verify))
    for e, (v, c) in zip(to_verify, verifications):
        cost += c
        merge_verification(e, v)

    for e in candidates:
        ok, reason = keep(e, horizon_end, today)  # la vérification peut révéler une compétition ou une autre date
        if not ok:
            print(f"[écarté après vérification] {e.get('titre')} : {reason}", file=sys.stderr)
            store.pop(e["id"], None)
            continue
        e["classe"] = classify(e)
        e.setdefault("fiabilite", "a_verifier")
        e["vu_le"] = today.isoformat()
        store[e["id"]] = {**store.get(e["id"], {}), **e}

    kept_ids = {e["id"] for e in dedupe(list(store.values()))}  # une fiche par événement, la mieux renseignée
    store = {k: v for k, v in store.items() if k in kept_ids}
    save_store(store)
    print(f"\n[coût équivalent API : ${cost:.2f}]", file=sys.stderr)
    count, targets = publish()
    print(f"{count} sortie(s) d'exception publiée(s) pour le site web dans :")
    for t in targets:
        print(f"  - {t}")


# --- Publication ----------------------------------------------------------------------------------------------------

def date_label(e: dict) -> str:
    start = date.fromisoformat(e["date_debut"])
    end = date.fromisoformat(e.get("date_fin") or e["date_debut"])
    if e.get("date_precision") == "mois":
        return f"{MOIS[start.month - 1].capitalize()} {start.year}"
    if start == end:
        return f"{start.day} {MOIS[start.month - 1]} {start.year}"
    if (start.month, start.year) == (end.month, end.year):
        return f"{start.day}-{end.day} {MOIS[start.month - 1]} {start.year}"
    return f"{start.day} {MOIS[start.month - 1]} - {end.day} {MOIS[end.month - 1]} {end.year}"


def parcours_label(e: dict) -> str | None:
    lo, hi, d = e.get("distance_min_km"), e.get("distance_max_km"), e.get("denivele_max_m")
    if lo is None and hi is None:
        return None
    lo, hi = lo or hi, hi or lo
    km = f"{round(lo)} km" if round(lo) == round(hi) else f"{round(lo)} à {round(hi)} km"
    return f"{km}, jusqu'à {round(d):,} m D+".replace(",", " ") if d else km


def to_site(e: dict) -> dict:
    return {
        "id": e["id"],
        "start": e["date_debut"],
        "end": e.get("date_fin") or e["date_debut"],
        "date_label": date_label(e),
        "titre": e["titre"],
        "organisateur": e.get("organisateur"),
        "lieu_depart": e["lieu_depart"],
        "resume": e.get("resume"),
        "parcours": parcours_label(e),
        "federation": e.get("federation") if e.get("federation") in FEDERATIONS else "autre",
        "disciplines": e.get("disciplines") or ["route"],
        "montagne": bool(e.get("montagne")),
        "url": e.get("url"),
        "fiabilite": e.get("fiabilite") or "a_verifier",
    }


def publish() -> tuple[int, list[Path]]:
    """Écrit data/activites.json (build) et public/data/activites.json (lecture directe sur OVH). Seules les « exception »
    à venir sont publiées ; les « ultra » restent en base pour la future section Ultra & endurance."""
    today = date.today().isoformat()
    store = load_store()
    upcoming = sorted(
        (e for e in dedupe(list(store.values())) if (e.get("date_fin") or e["date_debut"]) >= today and e.get("classe", "exception") == "exception"),
        key=lambda e: e["date_debut"],
    )
    payload = {"updatedAt": datetime.now().replace(microsecond=0).isoformat(), "randonnees": [to_site(e) for e in upcoming]}
    raw = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
    targets = [ROOT / "data" / "activites.json", ROOT / "public" / "data" / "activites.json"]
    for target in targets:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(raw, encoding="utf-8")
    return len(upcoming), targets
