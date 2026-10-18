"""Suivi de ce qui a déjà été communiqué sur un canal : un message seulement pour une nouvelle sortie ou un vrai changement.

L'état d'un canal (voir db.py, table `envois`) est un dictionnaire { identifiant de sortie : entrée } avec
    entrée = {"sent": fiche envoyée, "candidate": fiche vue une fois|None, "candidate_count": n, "ref": identité}

Une « fiche » ne contient que les champs dont un changement mérite une alerte : statut, date, horaires, lieu, distances,
présence de liens de tracé. Les autres champs (titre, dénivelé, organisateur, lien...) varient d'une exécution à l'autre
selon la source consultée par l'agent : les comparer enverrait de fausses alertes.
"""

import re
import unicodedata
from datetime import date

from periode import Periode

# Exécutions consécutives nécessaires pour notifier un changement. 1 = tout de suite : à la demande, la simulation est relue
# avant l'envoi. Passer à 2 si l'agent tourne automatiquement, pour filtrer les erreurs ponctuelles de l'agent.
CONFIRMATIONS_NEEDED = 1

FIELD_LABELS = {
    "statut": "Statut",
    "date": "Date",
    "heure_rdv": "RDV",
    "heure_depart": "Départ",
    "lieu_depart": "Lieu",
    "parcours": "Parcours (km)",
}
REF_FIELDS = ("titre", "organisateur", "lieu_depart", "date", "url", "type", "statut")


def slug(text: str | None) -> str:
    text = unicodedata.normalize("NFKD", text or "").encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def fiche(s: dict) -> dict:
    """Champs suivis, normalisés pour qu'une reformulation ne compte pas comme un changement."""
    distances = sorted({round(c["distance_km"]) for c in s.get("circuits") or [] if c.get("distance_km")})
    return {
        "statut": s.get("statut") or "maintenue",
        "date": s.get("date"),
        "heure_rdv": s.get("heure_rdv"),
        "heure_depart": s.get("heure_depart"),
        "lieu_depart": slug(s.get("lieu_depart")) or None,
        "parcours": distances,
        "liens": sorted({c["lien_trace"] for c in s.get("circuits") or [] if c.get("lien_trace")}),
    }


def ref(s: dict) -> dict:
    """Identité minimale d'une sortie, gardée pour pouvoir la revérifier lors d'une recherche ultérieure."""
    return {k: s.get(k) for k in REF_FIELDS}


def assign_keys(sorties: list[dict]) -> dict[str, dict]:
    """Identifiant stable d'une sortie : semaine ISO + commune de départ (le titre varie trop d'une recherche à l'autre).
    La date n'est pas dans la clé, pour qu'un report de samedi à dimanche soit vu comme une modification et non comme
    une nouvelle sortie."""
    keyed: dict[str, dict] = {}
    for s in sorties:
        year, week, _ = date.fromisoformat(s["date"]).isocalendar()
        base = f"{year}-W{week:02d}|{slug(s.get('lieu_depart')) or slug(s.get('titre')) or 'sortie'}"
        key, n = base, 2
        while key in keyed:  # deux sorties dans la même commune la même semaine
            key, n = f"{base}-{n}", n + 1
        keyed[key] = s
    return keyed


def known_refs(state: dict, periode: Periode) -> dict[str, dict]:
    """Sorties déjà communiquées dans cette période (identifiant -> identité), sauf celles annoncées annulées."""
    return {
        key: entry["ref"]
        for key, entry in state.items()
        if entry.get("ref")
        and entry["sent"].get("statut") != "annulee"
        and entry["ref"].get("date")
        and periode.contains(date.fromisoformat(entry["ref"]["date"]))
    }


def describe_changes(old: dict, new: dict) -> list[str]:
    """Changements réels : on ignore un champ inconnu qui devient connu (ce n'est pas une modification de la sortie)."""
    def show(field: str, value) -> str:
        if field == "parcours":
            return " / ".join(map(str, value)) or "?"
        return str(value) if value else "?"

    return [
        f"{FIELD_LABELS[f]} : {show(f, old.get(f))} → {show(f, new[f])}"
        for f in FIELD_LABELS
        if old.get(f) and new[f] and old.get(f) != new[f]  # info qui disparaît = oubli de l'agent, pas un changement
    ]


# Notification : (nature, sortie, changements) avec nature = "nouvelle" | "modification" | "annulation"
Notification = tuple[str, dict, list[str]]


def decide(sorties: list[dict], state: dict) -> tuple[list[Notification], dict, list[str]]:
    """Renvoie (notifications à envoyer, nouvel état, journal). N'écrit rien : à l'appelant de sauvegarder l'état
    une fois les notifications réellement envoyées."""
    entries = {k: {**v} for k, v in state.items()}
    notifications: list[Notification] = []
    log: list[str] = []

    for key, s in assign_keys(sorties).items():
        f = fiche(s)
        entry = entries.get(key)
        name = s.get("titre") or key

        if entry is not None and s.get("fiabilite") == "confirmee":
            entry["ref"] = ref(s)  # identité à jour, issue de données vérifiées
        if entry is None:
            entries[key] = {"sent": f, "candidate": None, "candidate_count": 0, "ref": ref(s)}
            notifications.append(("annulation" if f["statut"] == "annulee" else "nouvelle", s, []))
            log.append(f"[nouvelle] {name}")
        elif f == entry["sent"]:
            entry["candidate"], entry["candidate_count"] = None, 0
            log.append(f"[inchangée] {name}")
        elif s.get("fiabilite") != "confirmee" and f["statut"] != "annulee":
            # Édition non prouvée chez l'organisateur : les valeurs varient d'une exécution à l'autre, une « modification »
            # serait probablement un faux positif. On n'alerte que sur des données vérifiées (ou une annulation).
            log.append(f"[non vérifiée, aucune alerte] {name}")
        else:
            count = entry["candidate_count"] + 1 if entry["candidate"] == f else 1
            urgent = f["statut"] == "annulee"
            changes = describe_changes(entry["sent"], f)
            if f["liens"] and not entry["sent"].get("liens"):
                changes.append("Tracés des circuits désormais disponibles")  # info utile : on prévient
            if not changes and not urgent:
                # seule de l'information manquante est apparue (ex. RDV inconnu -> connu) : on met à jour sans alerter
                merged = {k: f[k] or entry["sent"].get(k) for k in f}  # une info qui disparaît n'efface pas l'ancienne
                entry.update(sent=merged, candidate=None, candidate_count=0)
                log.append(f"[complétée sans alerte] {name}")
            elif urgent or count >= CONFIRMATIONS_NEEDED:
                notifications.append(("annulation" if urgent else "modification", s, changes))
                entry.update(sent=f, candidate=None, candidate_count=0)
                log.append(f"[modifiée] {name} : {'; '.join(changes)}")
            else:
                entry["candidate"], entry["candidate_count"] = f, count
                log.append(
                    f"[changement à confirmer {count}/{CONFIRMATIONS_NEEDED}] {name} : "
                    + "; ".join(describe_changes(entry["sent"], f))
                )

    return notifications, entries, log
