"""Contrôle des liens de tracé OpenRunner, sans passer par l'agent : titre, distance, dénivelé et année du titre.

La page publique d'un tracé donne « Escalquens - Lauragaise 2025 95km | Vélo de route (96.9 km) | OpenRunner » et une
description avec le dénivelé. Cela permet de compléter un circuit qui n'a que son lien et de repérer un tracé titré d'une
autre année que l'édition (les clubs réutilisent parfois leurs tracés : on le signale, on ne le cache pas).
"""

import re
import urllib.request
from functools import lru_cache

OPENRUNNER = re.compile(r"https://www\.openrunner\.com/(?:[a-z]{2}/)?route-details/\d+")
YEAR = re.compile(r"(?<!\d)(20\d\d)(?!\d)")


@lru_cache(maxsize=512)
def inspect_trace(url: str) -> dict | None:
    """Titre, distance (km), dénivelé positif (m) et année du titre d'un tracé OpenRunner ; None si illisible."""
    if not OPENRUNNER.match(url):
        return None
    try:
        request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept-Language": "fr"})
        with urllib.request.urlopen(request, timeout=20) as resp:
            html = resp.read(800_000).decode("utf-8", "replace")
    except OSError:
        return None
    match = re.search(r"<title>(.*?)</title>", html, re.S)
    if not match:
        return None
    full_title = re.sub(r"\s+", " ", match.group(1)).strip()
    name = full_title.split(" | ")[0]
    distance = re.search(r"\(([\d.,]+) km\)", full_title)
    elevation = re.search(r"ascension cumul[ée]e de plus de ([\d\s  ]+)\s*m", html)
    years = YEAR.findall(name)
    return {
        "titre": name,
        "distance_km": float(distance.group(1).replace(",", ".")) if distance else None,
        "denivele_m": int(re.sub(r"\D", "", elevation.group(1))) if elevation else None,
        "annee": max(years) if years else None,
    }


def annotate_circuits(sortie: dict) -> int:
    """Complète les circuits ayant un lien OpenRunner (distance, dénivelé manquants) et note titre et année du tracé.
    Renvoie le nombre de liens lus."""
    read = 0
    for circuit in sortie.get("circuits") or []:
        info = inspect_trace(circuit["lien_trace"]) if circuit.get("lien_trace") else None
        if not info:
            continue
        read += 1
        if not circuit.get("distance_km") and info["distance_km"]:
            circuit["distance_km"] = round(info["distance_km"], 1)
        if not circuit.get("denivele_m") and info["denivele_m"]:
            circuit["denivele_m"] = info["denivele_m"]
        circuit["trace_titre"], circuit["trace_annee"] = info["titre"], info["annee"]
    return read
