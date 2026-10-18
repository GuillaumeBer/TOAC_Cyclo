"""Export des sorties de la base vers un tableau (CSV) importable dans Google Sheets.

Une ligne par sortie. Le CSV est en UTF-8 avec BOM (Excel et Google Sheets affichent bien les accents) ;
les cellules « circuits » et « tracés » contiennent un élément par ligne.
"""

import csv
import re
from datetime import date
from pathlib import Path
from typing import Callable

from periode import JOURS, MOIS

DISCIPLINES = {"route": "Route", "gravel": "Gravel", "vtt": "VTT"}

COLONNES = [
    "Date", "Jour", "Titre", "Disciplines", "Commune", "Code postal", "Lieu de RDV", "Lien Google Maps",
    "Heure RDV", "Heure départ", "Circuits", "Liens des tracés", "Organisateur", "Fédération", "Tarif", "Contact",
    "Lien de l'événement", "Fiabilité", "Statut", "Dernière vérification",
]


def _num(value: float | None) -> str:
    return f"{value:g}".replace(".", ",") if value is not None else ""


def ligne(s: dict, maps: Callable[[dict], str]) -> list[str]:
    """`maps` construit le lien Google Maps (la même fonction que pour les messages)."""
    jour = date.fromisoformat(s["date"])
    tous = s.get("circuits") or []
    circuits = sorted((c for c in tous if c.get("distance_km") or c.get("lien_trace")),
                      key=lambda c: (c.get("discipline") or "", c.get("distance_km") or 0))
    texte_circuits = "\n".join(
        f"{DISCIPLINES.get(c.get('discipline'), c.get('discipline') or '?')} {_num(c.get('distance_km'))} km"
        + (f" (D+ {_num(c['denivele_m'])} m)" if c.get("denivele_m") else "")
        for c in circuits
    )
    if len(tous) > len(circuits):  # circuits annoncés sans distance ni lien
        texte_circuits += ("\n" if texte_circuits else "") + f"{len(tous) - len(circuits)} circuit(s) annoncé(s), distances non publiées"
    edition = s["date"][:4]
    liens = "\n".join(
        f"{_num(c.get('distance_km'))} km : {c['lien_trace']}"
        + (f" (⚠ tracé titré {c['trace_annee']})" if c.get("trace_annee") and c["trace_annee"] != edition else "")
        for c in circuits if c.get("lien_trace")
    )
    return [
        s["date"], JOURS[jour.weekday()].capitalize(), s.get("titre") or "",
        " · ".join(DISCIPLINES.get(d, d) for d in s.get("disciplines") or []),
        s.get("lieu_depart") or "", s.get("code_postal") or "",
        re.sub(r"\s*\([^)]*\)", "", s.get("adresse_depart") or "").strip(" ,"),  # sans les coordonnées GPS entre parenthèses
        maps(s) if s.get("adresse_depart") or s.get("lieu_depart") else "",
        s.get("heure_rdv") or "", s.get("heure_depart") or "", texte_circuits, liens,
        s.get("organisateur") or "", s.get("federation") or "Non précisée", s.get("tarif_inscription") or "", s.get("contact") or "",
        s.get("url") or "",
        "Vérifiée chez l'organisateur" if s.get("fiabilite") == "confirmee" else "À vérifier",
        "Annulée" if s.get("statut") == "annulee" else "Maintenue",
        (s.get("derniere_vue") or "")[:16].replace("T", " "),
    ]


def ecrire_csv(chemin: Path, sorties: list[dict], maps: Callable[[dict], str]) -> Path:
    chemin.parent.mkdir(exist_ok=True)
    with chemin.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(COLONNES)
        writer.writerows(ligne(s, maps) for s in sorties)
    return chemin
