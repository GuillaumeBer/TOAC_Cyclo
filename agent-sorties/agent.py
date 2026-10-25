"""Agent de recherche des sorties cyclo autour de Toulouse, sur la période de votre choix.

L'agent est Claude Code lancé en mode headless (`claude -p`) avec uniquement les outils
WebSearch et WebFetch : aucune clé API à configurer, il utilise la connexion Claude Code existante.

Trois commandes (le résultat de la recherche est enregistré dans la base db/sorties.sqlite) :

    python agent.py rechercher [--periode "dernier week-end de septembre"]
        Cherche les sorties, les vérifie chez les organisateurs et les enregistre dans la base.
        Sans --periode : le prochain week-end. Exemples de périodes : prochain week-end, 2e week-end d'octobre,
        octobre, du 3 au 18 octobre, 2026-10-03/2026-10-18.

    python agent.py envoyer [--periode ...] [--canal whatsapp] [--oui]
        Prépare les messages À PARTIR DE LA BASE (aucune recherche). Sans --oui : aperçu seulement, rien n'est envoyé.

    python agent.py lister [--periode ...]
        Affiche ce que contient la base pour la période.

Variables d'environnement optionnelles :
    CLAUDE_BIN     chemin vers l'exécutable claude (sinon PATH, puis extension VS Code)
    AGENT_MODEL    modèle à utiliser (alias `sonnet`, `opus`, ou identifiant complet)
"""

import argparse
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import unicodedata
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime, timedelta
from pathlib import Path

import db
import tracking
import traces
from periode import JOURS, MOIS, Periode, format_date, next_weekend, parse_periode, rolling_weeks

HERE = Path(__file__).parent
OUTPUT_DIR = HERE / "output"
TIMEOUT_SECONDS = 20 * 60


SYSTEM_PROMPT = """Tu es l'assistant de la section cyclotourisme du TOAC (Toulouse Olympique Aéronautique Club).
Ta mission : trouver sur internet les sorties cyclo (route en priorité, gravel/VTT en second) organisées
autour de Toulouse (rayon d'environ 60 km) pendant la période indiquée, pour que les membres du club
puissent choisir où rouler.

Méthode :
- Commence par les sources listées par l'utilisateur, puis complète par des recherches web (calendriers de
  comités départementaux 31/32/81/82/09, sites de clubs, sites d'inscription, agendas locaux).
- Ouvre les pages pour vérifier date, lieu de départ, horaires et distances. Ne te fie pas aux seuls extraits de recherche.
- Ne retiens que les sorties dont la date tombe dans la période demandée (bornes comprises).
- Exclus les compétitions (courses, cyclosportives chronométrées, championnats, épreuves FFC/UFOLEP avec classement, enduros ou
  courses VTT) : ne garde que les randonnées et sorties de cyclotourisme sans classement, VTT et gravel compris.
- N'invente jamais une information. Si un champ est introuvable, mets null. Chaque sortie doit avoir une URL source réelle
  que tu as consultée.
- Dédoublonne : une même sortie annoncée sur plusieurs sites ne doit apparaître qu'une fois.
- Écarte les sorties dont ni le lieu ni l'organisateur ne sont identifiables : elles sont inutilisables pour le club.
- Une sortie n'entre dans la liste que si la page consultée indique explicitement ce jour précis comme date de l'événement.
  Une randonnée « permanente » (à faire quand on veut sur une période), un parcours en libre accès ou un événement dont la
  date est floue n'ont pas de date : ne les place pas à une date de la période, mets-les en type "permanente".
- "type" : "ouverte" = événement daté ouvert à tous (randonnée, brevet, cyclosportive, gravel... avec inscription ou accueil
  des non-licenciés/non-membres) ; "sortie_club" = sortie régulière ou interne d'un club, réservée ou à confirmer avec ses
  membres (ex. sorties dominicales hebdomadaires) ; "permanente" = voir ci-dessus. En cas de doute sur l'ouverture à tous,
  choisis "sortie_club".
- "statut" = "annulee" seulement si une source (site du club, comité, réseaux, presse) annonce explicitement l'annulation de cet
  événement ; sinon "maintenue". Si une sortie est reportée à une autre date, donne sa nouvelle date.
- "fiabilite" ne porte jamais sur la date : si tu doutes de la date, l'événement ne doit pas figurer dans la liste.
- ÉDITION : les pages d'événements récurrents mélangent souvent plusieurs années (édition précédente encore en ligne, anciens
  tarifs, anciennes distances, ancien règlement). Ne retiens que ce qui concerne l'édition de la période demandée. Une page qui
  affiche une autre année (ex. 2025) ne prouve rien pour cette édition. "preuve_date" = citation exacte et courte tirée de la
  page qui donne la date ET l'année de l'édition (ex. "Dimanche 20 septembre 2026"). Si tu ne peux pas la citer, n'inclus pas la sortie.
- Reste concis, le résultat est lu sur un téléphone :
  "titre" = nom court de l'événement, sans numéro d'édition ni précision entre parenthèses ;
  "lieu_depart" = commune uniquement (ex. "Colomiers") ;
  "adresse_depart" = adresse ou nom du lieu de rendez-vous tel qu'annoncé (ex. "Maison de l'Oustalet, 14 avenue du Mont Frouzi") ;
  "notes" en 3 phrases maximum.
- Horaires : "heure_rdv" = heure de rendez-vous / d'accueil / d'inscription, "heure_depart" = heure de départ. Si un seul horaire
  est annoncé, renseigne "heure_depart" et laisse "heure_rdv" à null. En cas de départs échelonnés, donne le premier créneau.
- Circuits : un objet par circuit proposé, avec sa distance, son dénivelé positif et le lien de son tracé (OpenRunner, Strava,
  Komoot, Visorando, GPX...). Ne renseigne "lien_trace" que si tu as vu ce lien sur une page consultée : ne le devine et ne le
  construis jamais, mets null. Indique la discipline de chaque circuit ("route", "gravel" ou "vtt") : un même événement en propose
  souvent plusieurs, liste-les tous. Ignore les parcours de marche.
- Pour l'"url", donne la page de la sortie elle-même quand elle existe, pas une page de liste ou d'accueil.
- Les interclubs FSGT sont ouverts à tous : type "ouverte".

Réponse finale : uniquement un bloc ```json contenant un objet de la forme
{
  "sorties": [
    {
      "date": "AAAA-MM-JJ",
      "heure_rdv": "HH:MM" ou null,
      "heure_depart": "HH:MM" ou null,
      "titre": "...",
      "organisateur": "club ou organisateur" ou null,
      "lieu_depart": "commune" ou null,
      "code_postal": "31810" ou null (celui de la commune de départ),
      "adresse_depart": "adresse ou lieu de rendez-vous" ou null,
      "disciplines": ["route", "gravel", "vtt"]  (toutes celles proposées, la principale en premier),
      "circuits": [
        {"discipline": "route" | "gravel" | "vtt", "distance_km": 72, "denivele_m": 780 ou null, "lien_trace": "https://..." ou null}
      ]  (liste vide si aucun circuit connu),
      "tarif_inscription": "texte libre" ou null,
      "url": "https://...",
      "preuve_date": "citation exacte de la page donnant la date et l'année de l'édition",
      "type": "ouverte" | "sortie_club" | "permanente",
      "statut": "maintenue" | "annulee",
      "distance_toulouse_km": estimation à vol d'oiseau depuis Toulouse (nombre) ou null,
      "fiabilite": "confirmee" | "a_verifier"
    }
  ],
  "notes": "limites de la recherche : sources inaccessibles, doutes, etc."
}
Si tu ne trouves aucune sortie, renvoie une liste vide et explique pourquoi dans "notes"."""


def build_user_prompt(periode: Periode) -> str:
    sources = (HERE / "sources.md").read_text(encoding="utf-8")
    return (
        f"Période recherchée : du {periode.start.isoformat()} ({format_date(periode.start)}) "
        f"au {periode.end.isoformat()} ({format_date(periode.end)}), bornes comprises.\n"
        f"Date du jour : {date.today().isoformat()}.\n\n"
        f"Sources et pistes de recherche :\n\n{sources}"
    )


def find_claude() -> str:
    if os.environ.get("CLAUDE_BIN"):
        return os.environ["CLAUDE_BIN"]
    if found := shutil.which("claude"):
        return found
    # Extension VS Code : embarque un binaire natif
    pattern = str(
        Path.home() / ".vscode" / "extensions" / "anthropic.claude-code-*" / "resources" / "native-binary" / "claude*"
    )
    if candidates := sorted(glob.glob(pattern)):
        return candidates[-1]
    raise FileNotFoundError("Claude Code introuvable : installez-le ou définissez CLAUDE_BIN.")


def run_agent(periode: Periode) -> tuple[str, dict]:
    """Première passe : découverte des sorties de la période."""
    return run_claude(SYSTEM_PROMPT, build_user_prompt(periode))


def run_claude(
    system_prompt: str,
    user_prompt: str,
    tools: tuple[str, ...] = ("WebSearch", "WebFetch"),
    add_dirs: tuple[Path, ...] = (),
) -> tuple[str, dict]:
    """Lance Claude Code en headless et renvoie (texte de la réponse, métadonnées de l'exécution).
    Seuls les outils listés sont disponibles (jamais Bash ni écriture de fichiers)."""
    cmd = [
        find_claude(),
        "-p",
        "--output-format", "json",
        "--tools", ",".join(tools),
        "--allowedTools", *tools,
        "--system-prompt", system_prompt,
        "--no-session-persistence",
    ]
    for directory in add_dirs:
        cmd += ["--add-dir", str(directory)]
    if model := os.environ.get("AGENT_MODEL"):
        cmd += ["--model", model]

    proc = subprocess.run(
        cmd,
        input=user_prompt,
        capture_output=True,
        text=True,
        encoding="utf-8",
        timeout=TIMEOUT_SECONDS,
        cwd=HERE,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"claude a échoué (code {proc.returncode}) :\n{proc.stderr or proc.stdout}")

    envelope = json.loads(proc.stdout)
    if envelope.get("is_error"):
        raise RuntimeError(f"claude a renvoyé une erreur : {envelope.get('result')}")
    return envelope["result"], envelope


def parse_result(text: str) -> dict:
    match = re.search(r"```json\s*(\{.*?\})\s*```", text, re.DOTALL)
    raw = match.group(1) if match else text[text.find("{") : text.rfind("}") + 1]
    return json.loads(raw)


MAX_DISTANCE_KM = 65  # rayon autour de Toulouse (tolérance sur l'estimation)
KEPT_TYPES = {"ouverte"}  # seulement les événements ouverts à tous


def filter_sorties(sorties: list[dict], periode: Periode) -> tuple[list[dict], list[tuple[dict, str]]]:
    """Filtre déterministe : ne dépend pas du bon vouloir de l'agent. Renvoie (gardées, [(écartée, motif)])."""
    kept, rejected = [], []
    for s in sorties:
        try:
            in_period = periode.contains(date.fromisoformat(s.get("date") or ""))
        except ValueError:
            in_period = False
        if not in_period:
            rejected.append((s, f"date {s.get('date')} hors de la période"))
        elif s.get("type") not in KEPT_TYPES:
            rejected.append((s, f"type {s.get('type')!r}"))
        elif (d := s.get("distance_toulouse_km")) is not None and d > MAX_DISTANCE_KM:
            rejected.append((s, f"à {d} km de Toulouse"))
        else:
            kept.append(s)
    return kept, rejected


ENRICH_SYSTEM_PROMPT = """Tu vérifies et complètes la fiche d'UNE sortie cyclo pour le TOAC (section cyclotourisme). La fiche vient d'un
calendrier ou d'un agrégateur : ses informations (horaires, distances, dénivelés, tarifs) sont souvent approximatives.

Méthode :
- Trouve la page officielle de l'ORGANISATEUR consacrée à cet événement (site du club, du comité ou de la mairie : rubrique agenda,
  événements, actualités, page d'inscription). Cherche par nom de l'événement, organisateur et année, ouvre plusieurs pages si besoin.
  Une page d'agrégateur (calendrier régional, vttrando, velo-occitanie...) ne suffit pas : c'est le site de l'organisateur qui fait foi.
- Une entrée d'agenda n'est souvent qu'une ANNONCE : date et titre, sans circuits ni horaires. Si la page ne donne pas les circuits,
  les horaires et le lieu de RDV, cherche sur cette page les liens « en savoir plus », « plus d'infos », « détails », « programme »,
  « règlement », « inscription », « flyer » et OUVRE-LES (même site, jusqu'à 5 pages) : la fiche détaillée contient presque toujours les
  circuits, les liens de tracé et les documents (flyer, carte). Ne renvoie « aucun circuit » qu'après avoir suivi ces liens.
- ÉDITION : ces pages mélangent souvent plusieurs années (édition précédente encore en ligne, anciens tarifs, anciennes distances,
  ancien règlement). Ne retiens que l'édition à la date demandée. Une page qui affiche une autre année n'est pas la bonne : ignore-la.
  "date_page" = date de l'édition telle qu'affichée sur la page (AAAA-MM-JJ), "preuve_date" = citation exacte et courte qui la prouve,
  année comprise. Si aucune page de l'organisateur ne prouve cette édition, renvoie "edition_verifiee": false et rien d'autre.
- Cherche activement les liens de tracé des circuits (OpenRunner, Strava, Komoot, Visorando, GPX) : ils se cachent souvent dans des
  blocs intégrés, des boutons « voir le parcours » ou des liens sur les distances. Ne renseigne un lien que si tu l'as vu sur la page
  de l'organisateur ; ne le devine ni ne le construis jamais. Recopie l'URL propre (sans paramètres de suivi utm_*).
- Liste tous les circuits de l'édition avec leur discipline (route, gravel, vtt), distance et dénivelé positif. Ignore la marche.
- Horaires : recopie ce que la page dit. « À partir de 7h30 », « accueil dès 7h30 », « rassemblement à 7h30 » ou « inscriptions de 7h30
  à 9h » sont des heures de RDV (heure_rdv), pas de départ. N'affecte heure_depart que si la page annonce explicitement un départ.
  Ne déduis jamais un horaire « habituel » qui n'est pas écrit sur la page.
- Si plusieurs pages du même organisateur se contredisent (distances, dénivelés), retiens la page dédiée à l'événement
  (rubrique agenda/événement) plutôt qu'un article d'actualité.
- Fédération : indique quelle fédération organise ou labellise l'événement : "FFVélo" (anciennement FFCT, cyclotourisme), "FSGT",
  "UFOLEP", ou "autre" (tout le reste : FFC, club indépendant, association, triathlon...). Appuie-toi sur un indice EXPLICITE et recopie-le dans
  "federation_preuve" : logo ou mention « FFVélo / FFCT », « FSGT », « UFOLEP » sur les pages ou l'affiche, calendrier fédéral où
  l'événement figure (ex. calendrier FSGT 31, comité départemental FFVélo), club affilié annoncé. Le nom de l'organisateur compte quand il cite explicitement la fédération (ex. « CoDep 81 FFVélo », « Comité FSGT 31 »). Une simple mention « tarif
  licenciés FFVélo » indique quelles licences sont acceptées, pas la fédération organisatrice. Sans indice explicite : null,
  ne devine jamais d'après le nom du club.
- N'invente rien : champ introuvable = null.

Réponse finale : uniquement un bloc ```json
{
  "edition_verifiee": true | false,
  "date_page": "AAAA-MM-JJ",
  "preuve_date": "citation exacte",
  "statut": "maintenue" | "annulee",
  "url": "page officielle de l'organisateur pour cette édition",
  "heure_rdv": "HH:MM" ou null,
  "heure_depart": "HH:MM" ou null,
  "adresse_depart": "adresse ou lieu de rendez-vous" ou null,
  "code_postal": "31810" ou null,
  "disciplines": ["route", "vtt"],
  "circuits": [{"discipline": "route" | "gravel" | "vtt", "distance_km": 72, "denivele_m": 770 ou null, "lien_trace": "https://..." ou null}],
  "tarif_inscription": "texte court" ou null,
  "contact": "téléphone / e-mail de l'organisateur" ou null,
  "federation": "FFVélo" | "FSGT" | "UFOLEP" | "autre" ou null,
  "federation_preuve": "indice explicite : citation courte, logo ou calendrier fédéral où l'événement figure" ou null,
  "affiches": ["URL ABSOLUE (https://...) de chaque fichier image ou PDF d'affiche, flyer ou carte de cet événement (pas les logos ni les partenaires) ; reconstitue l'adresse complète si la page donne un chemin relatif comme /documents/flyer.pdf"]
}"""

POSTER_SYSTEM_PROMPT = """Tu retrouves les liens de tracé (OpenRunner, Strava, Komoot, Visorando, GPX) des circuits d'UNE sortie cyclo à partir
de ses affiches. Ces liens sont parfois seulement imprimés dans l'image : numéro de tracé (ex. « #21323009 »), adresse écrite,
ou QR code.

Tu reçois : l'événement et la date de l'édition, les circuits déjà connus (distance) qui n'ont pas de lien, les chemins locaux
des affiches (lis-les avec l'outil Read, qui sait lire les images) et les URLs déjà décodées des QR codes par un programme
(fiables : recopie-les telles quelles, ne tente jamais de lire un QR code toi-même).

Méthode :
- Lis chaque affiche : numéros ou URLs de tracé imprimés, et le millésime (année, numéro d'édition) s'il y en a un.
  Un numéro OpenRunner NNNN correspond à https://www.openrunner.com/route-details/NNNN
- Une affiche peut dater d'une édition précédente. Ne fais donc jamais confiance à un lien seul : ouvre chaque lien candidat avec
  WebFetch et relève le titre, la distance et le dénivelé du tracé. Associe-le à un circuit connu seulement si la distance est
  cohérente (écart de 3 km maximum) ; sinon ne le retiens pas.
- Recopie le titre exact de la page de chaque tracé et son dénivelé : ils servent à contrôler l'édition (un titre comme
  « Rouge-2025 » désigne l'édition précédente). Ne corrige et n'interprète pas le titre.
- Un chiffre mal lu dans une image donne un autre tracé ou une page vide : si la page ne s'ouvre pas ou ne correspond à rien, écarte le lien.
- N'invente jamais un lien. Recopie les URLs propres, sans paramètres de suivi (utm_*).

Réponse finale : uniquement un bloc ```json
{
  "affiches": [
    {"fichier": "affiche1_p1.png", "millesime": "date de l'édition telle qu'imprimée sur cette affiche (ex. « dimanche 20 septembre 2026 »), ou null si aucune année n'y figure"}
  ],
  "liens": [
    {"fichier": "affiche1_p1.png", "discipline": "route" | "gravel" | "vtt", "distance_km": 72,
     "url": "https://www.openrunner.com/route-details/21323009",
     "titre_trace": "titre EXACT recopié depuis la page du tracé", "denivele_m": 773, "source": "texte" | "qr"}
  ],
  "notes": "1 phrase"
}"""

POSTERS_DIR = OUTPUT_DIR / "affiches"
MAX_POSTERS = 3
MAX_POSTER_BYTES = 10 * 1024 * 1024
POSTER_TYPES = {"image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp", "application/pdf": ".pdf"}


def download_posters(urls: list[str], dest: Path) -> list[Path]:
    """Télécharge les affiches (images ou PDF, taille limitée) dans dest. Ignore ce qui échoue."""
    dest.mkdir(parents=True, exist_ok=True)
    paths: list[Path] = []
    for i, url in enumerate(urls[:MAX_POSTERS], 1):
        if not str(url).startswith(("http://", "https://")):
            continue
        try:
            # les URLs de fichiers contiennent parfois des accents (ex. « Randonnée.pdf ») : à encoder, sinon urllib échoue
            url = urllib.parse.quote(url, safe=":/?&=%#+@,;~")
            request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(request, timeout=30) as resp:
                extension = POSTER_TYPES.get(resp.headers.get_content_type())
                data = resp.read(MAX_POSTER_BYTES + 1)
        except OSError:
            continue
        if extension and len(data) <= MAX_POSTER_BYTES:
            path = dest / f"affiche{i}{extension}"
            path.write_bytes(data)
            # PDF -> images : le décodage des QR codes et la lecture visuelle en ont besoin
            paths.extend(pdf_to_images(path) or [path] if extension == ".pdf" else [path])
    return paths


def pdf_to_images(path: Path, max_pages: int = 2) -> list[Path]:
    """Convertit les premières pages d'un PDF en PNG. Liste vide si PyMuPDF n'est pas installé."""
    try:
        import pymupdf
    except ImportError:
        return []
    images = []
    with pymupdf.open(path) as doc:
        for number, page in enumerate(doc, 1):
            if number > max_pages:
                break
            out = path.with_name(f"{path.stem}_p{number}.png")
            page.get_pixmap(dpi=150).save(out)
            images.append(out)
    return images


def decode_qr(path: Path) -> list[str]:
    """URLs contenues dans les QR codes d'une image. Décodage par programme (OpenCV), pas par lecture visuelle."""
    if path.suffix == ".pdf":
        return []
    try:
        import cv2
        import numpy as np
    except ImportError:
        return []
    image = cv2.imdecode(np.frombuffer(path.read_bytes(), np.uint8), cv2.IMREAD_COLOR)
    if image is None:
        return []
    detector, found = cv2.QRCodeDetector(), set()
    for scale in (1, 2):  # un QR petit ou flou passe parfois seulement une fois agrandi
        frame = image if scale == 1 else cv2.resize(image, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
        ok, decoded, _, _ = detector.detectAndDecodeMulti(frame)
        if ok:
            found.update(text for text in decoded if text)
    return sorted(found)


def match_link(distance: float, circuits: list[dict]) -> dict | None:
    """Circuit sans lien dont la distance est la plus proche (3 km maximum d'écart)."""
    candidates = [c for c in circuits if not c.get("lien_trace") and c.get("distance_km")]
    best = min(candidates, key=lambda c: abs(c["distance_km"] - distance), default=None)
    return best if best and abs(best["distance_km"] - distance) <= 3 else None


ELEVATION_TOLERANCE = 0.10  # écart relatif maximal de dénivelé entre le tracé et la page de l'édition


def reject_link(link: dict, circuit: dict, year: str, poster_millesime: str = "") -> str | None:
    """Contrôle déterministe d'un lien de tracé trouvé sur une affiche (les affiches restent souvent d'une année précédente).
    Renvoie le motif de rejet, ou None si le lien est accepté."""
    poster_years = set(re.findall(r"(?<!\d)(20\d\d)(?!\d)", poster_millesime))
    if poster_years - {year}:
        return f"affiche de l'édition {', '.join(sorted(poster_years - {year}))}"
    if year in poster_years:
        # L'affiche de l'édition imprime elle-même ce lien : c'est le lien officiel, même si le tracé a un titre plus ancien
        # (les clubs réutilisent souvent leurs tracés d'une année sur l'autre).
        return None
    # Affiche sans année : contrôles stricts sur la page du tracé
    title = str(link.get("titre_trace") or "")
    if not title:
        return "titre du tracé non relevé, édition invérifiable"
    other_years = sorted({y for y in re.findall(r"(?<!\d)(20\d\d)(?!\d)", title) if y != year})
    if other_years:
        return f"titre {title!r} : édition {', '.join(other_years)}"
    expected, found = circuit.get("denivele_m"), link.get("denivele_m")
    if expected and found and abs(found - expected) / expected > ELEVATION_TOLERANCE:
        return f"dénivelé {found} m au lieu de {expected} m"
    return None


def read_posters(s: dict, poster_urls: list[str]) -> tuple[int, str, float]:
    """Troisième passe : cherche les liens de tracé dans les affiches. Renvoie (liens ajoutés, journal, coût)."""
    dest = POSTERS_DIR / (tracking.slug(s.get("lieu_depart") or s.get("titre")) or "sortie")
    posters = download_posters(poster_urls, dest)
    if not posters:
        return 0, "aucune affiche téléchargeable", 0.0
    qr = {p.name: decode_qr(p) for p in posters}
    known = [f"{c.get('discipline')} {c['distance_km']} km" for c in s["circuits"] if not c.get("lien_trace") and c.get("distance_km")]
    user_prompt = (
        f"Événement : {s.get('titre')} ({s.get('organisateur')}), édition du {s['date']}.\n"
        f"Circuits connus sans lien : {', '.join(known) or 'aucun : liste tous les tracés trouvés, avec distance, dénivelé et discipline'}\n"
        f"Affiches à lire (chemins locaux) : {json.dumps([str(p) for p in posters])}\n"
        f"QR codes décodés par programme, par affiche : {json.dumps(qr, ensure_ascii=False)}"
    )
    text, envelope = run_claude(POSTER_SYSTEM_PROMPT, user_prompt, tools=("Read", "WebFetch"), add_dirs=(dest,))
    parsed = parse_result(text)
    millesimes = {a.get("fichier"): str(a.get("millesime") or "") for a in parsed.get("affiches", [])}
    added, rejected = 0, []
    no_known_circuit = not s["circuits"]  # alors les tracés vérifiés deviennent les circuits de la sortie
    for link in parsed.get("liens", []):
        url = str(link.get("url") or "")
        if not url.startswith("http"):
            continue
        circuit = None if no_known_circuit else match_link(link.get("distance_km") or 0, s["circuits"])
        if not no_known_circuit and not circuit:
            continue
        if no_known_circuit and not link.get("distance_km"):
            continue
        if reason := reject_link(link, circuit or {}, s["date"][:4], millesimes.get(link.get("fichier"), "")):
            rejected.append(f"{url} ({reason})")
            continue
        if circuit:
            circuit["lien_trace"] = url
        else:
            s["circuits"].append({"discipline": link.get("discipline") or "route", "distance_km": link["distance_km"],
                                  "denivele_m": link.get("denivele_m"), "lien_trace": url})
        added += 1
    n_qr = sum(len(v) for v in qr.values())
    msg = f"{len(posters)} affiche(s), {n_qr} QR décodé(s), {added} lien(s) ajouté(s)"
    if rejected:
        msg += f", {len(rejected)} rejeté(s) : {'; '.join(rejected)}"
    return added, msg, envelope.get("total_cost_usd", 0)

ENRICH_FIELDS = ("url", "adresse_depart", "code_postal", "disciplines", "tarif_inscription", "contact", "federation", "federation_preuve", "statut")


def enrich_sortie(s: dict) -> tuple[dict, dict]:
    """Seconde passe sur une sortie : cherche la page de l'organisateur. Renvoie (fiche enrichie, métadonnées)."""
    known = {k: s.get(k) for k in ("titre", "organisateur", "lieu_depart", "date", "url")}
    user_prompt = (
        f"Édition à vérifier : le {s['date']} (année {s['date'][:4]}).\n"
        f"Fiche à compléter, issue d'un calendrier (à vérifier) :\n{json.dumps(known, ensure_ascii=False)}"
    )
    text, envelope = run_claude(ENRICH_SYSTEM_PROMPT, user_prompt)
    return parse_result(text), envelope


def keep_known_links(new: list[dict], previous: list[dict]) -> list[dict]:
    """Reporte sur les nouveaux circuits les liens de tracé déjà connus (même discipline, distance à 1 km près)."""
    for circuit in new:
        if circuit.get("lien_trace") or not circuit.get("distance_km"):
            continue
        for old in previous:
            if (old.get("lien_trace") and old.get("discipline") == circuit.get("discipline")
                    and old.get("distance_km") and abs(old["distance_km"] - circuit["distance_km"]) <= 1):
                circuit["lien_trace"] = old["lien_trace"]
                break
    return new


def merge_enrichment(s: dict, e: dict) -> tuple[dict, str]:
    """Fusionne la seconde passe dans la fiche, seulement si elle prouve l'édition de l'année. Sinon la fiche est
    conservée mais marquée « à vérifier »."""
    year = s["date"][:4]
    proven = e.get("edition_verifiee") is True and e.get("date_page") == s["date"] and year in (e.get("preuve_date") or "")
    if not proven:
        s["fiabilite"] = "a_verifier"
        for circuit in s.get("circuits") or []:
            circuit["lien_trace"] = None  # l'année du tracé ne peut pas être vérifiée : pas de lien plutôt qu'un lien périmé
        return s, f"édition {s['date']} non prouvée par le site de l'organisateur (date_page={e.get('date_page')!r}) : infos gardées « à vérifier »"
    for field in ENRICH_FIELDS:
        if e.get(field):
            s[field] = e[field]
    if set(re.findall(r"(?<!\d)(20\d\d)(?!\d)", s.get("contact") or "")) - {year}:
        s["contact"] = None  # coordonnées publiées pour une autre édition : périmées, on ne les garde pas
    if e.get("heure_rdv") or e.get("heure_depart"):
        # Horaires : la page de l'organisateur fait foi, y compris quand elle ne donne qu'un seul des deux. Une heure de départ
        # de l'agrégateur (souvent approximative) ne doit pas subsister à côté d'un simple « à partir de 7h30 ».
        s["heure_rdv"], s["heure_depart"] = e.get("heure_rdv"), e.get("heure_depart")
    if e.get("circuits"):
        # remplace les circuits de l'agrégateur, moins fiables ; mais un lien déjà vérifié lors d'une exécution précédente
        # n'est pas perdu parce que l'agent ne l'a pas retrouvé cette fois-ci
        previous = s.get("circuits") or [] if s.get("verifiee_organisateur") else []
        s["circuits"] = keep_known_links(e["circuits"], previous)
        s["fiabilite"] = "confirmee"
    else:
        s["fiabilite"] = "a_verifier"
    s["preuve_date"] = e["preuve_date"]
    s["verifiee_organisateur"] = True
    n_liens = sum(1 for c in s.get("circuits") or [] if c.get("lien_trace"))
    return s, f"édition vérifiée ({e['preuve_date']!r}), {len(s.get('circuits') or [])} circuits dont {n_liens} avec tracé"


def process_sortie(s: dict) -> tuple[list[str], float]:
    """Passes 2 et 3 sur une sortie. Toute erreur laisse la fiche de la première passe, marquée « à vérifier »."""
    name, cost, log = s.get("titre") or "?", 0.0, []
    try:
        e, envelope = enrich_sortie(s)
        cost += envelope.get("total_cost_usd", 0)
        _, msg = merge_enrichment(s, e)
        log.append(f"[vérif. organisateur] {name} : {msg}")
    except Exception as exc:  # noqa: BLE001
        s["fiabilite"] = "a_verifier"
        return [f"[vérif. organisateur] {name} : échec ({exc}) : infos gardées « à vérifier »"], cost

    # Affiches : seulement si l'édition est prouvée et qu'il manque des liens de tracé
    circuits = s.get("circuits") or []
    missing = not circuits or any(not c.get("lien_trace") for c in circuits)  # aucun circuit connu = tout reste à trouver
    if missing and s.get("preuve_date") and e.get("affiches"):
        try:
            _, msg, extra = read_posters(s, e["affiches"])
            cost += extra
            log.append(f"[affiches] {name} : {msg}")
        except Exception as exc:  # noqa: BLE001
            log.append(f"[affiches] {name} : échec ({exc})")
    read = traces.annotate_circuits(s)  # complète distance et dénivelé, note l'année du titre de chaque tracé
    if read:
        old = [c for c in s.get("circuits") or [] if c.get("trace_annee") and c["trace_annee"] != s["date"][:4]]
        log.append(f"[tracés] {name} : {read} lien(s) lu(s)" + (f", {len(old)} titré(s) d'une autre année ({old[0]['trace_annee']})" if old else ""))
    return log, cost


def enrich_all(sorties: list[dict]) -> tuple[list[dict], list[str], float]:
    """Passes 2 et 3 en parallèle. Une erreur sur une sortie ne bloque pas les autres."""
    log, cost = [], 0.0
    with ThreadPoolExecutor(max_workers=3) as pool:
        results = list(pool.map(process_sortie, sorties))
    for lines, extra in results:
        log += lines
        cost += extra
    return sorties, log, cost


def year_proven(s: dict) -> bool:
    return s["date"][:4] in (s.get("preuve_date") or "")


DISCIPLINES = {"route": "Route", "gravel": "Gravel", "vtt": "VTT"}
FEDERATIONS = ("FFVélo", "FSGT", "UFOLEP")
HORIZON_WEEKS = 26  # vision « 6 mois » publiée sur le site, en plus des 4 semaines détaillées


def format_horaires(s: dict) -> str:
    rdv, depart = s.get("heure_rdv"), s.get("heure_depart")
    if rdv and depart and rdv != depart:
        return f"À partir de {depart} (RDV {rdv})"
    if rdv or depart:
        return f"À partir de {rdv or depart}"
    return "Horaire à confirmer"


def is_past_sortie(s: dict, now: datetime | None = None) -> bool:
    """Renvoie True si la sortie est déjà passée (date antérieure, ou sortie du jour dont le créneau de départ est dépassé)."""
    now = now or datetime.now()
    today_iso = now.date().isoformat()
    s_date = s.get("date") or ""
    if s_date < today_iso:
        return True
    if s_date > today_iso:
        return False
    time_str = s.get("heure_depart") or s.get("heure_rdv")
    if time_str and re.match(r"^\d{1,2}:\d{2}$", time_str):
        hh, mm = map(int, time_str.split(":"))
        return (now.hour * 60 + now.minute) >= (hh * 60 + mm + 120)
    return now.hour >= 12


def clean_address(address: str | None) -> str | None:
    """Retire les précisions entre parenthèses (coordonnées GPS, consignes de parking...) qui polluent l'adresse."""
    return re.sub(r"\s*\([^)]*\)", "", address or "").strip(" ,") or None


def maps_link(s: dict) -> str:
    """Lien Google Maps construit par le code (jamais inventé par l'agent) à partir du lieu annoncé.
    Requête sans accents ni ponctuation pour un lien court ; le code postal lève l'ambiguïté entre communes homonymes."""
    query = ""
    for part in (clean_address(s.get("adresse_depart")), s.get("lieu_depart"), s.get("code_postal")):
        if part and part.lower() not in query.lower():  # ne pas répéter la commune ou le code postal déjà dans l'adresse
            query = f"{query} {part}".strip()
    ascii_query = unicodedata.normalize("NFKD", query).encode("ascii", "ignore").decode()
    return "https://maps.google.com/?q=" + "+".join(re.findall(r"[A-Za-z0-9]+", ascii_query))


def km(value: float) -> str:
    return f"{value:g}".replace(".", ",")


def render_sortie(s: dict) -> str:
    """Un message WhatsApp (*gras*) autonome pour une sortie, prêt à être transféré au groupe."""
    jour = date.fromisoformat(s["date"])
    lines = [f"🚴 *{s.get('titre') or 'Sortie'}*"]
    if disciplines := [DISCIPLINES.get(d, d) for d in s.get("disciplines") or []]:
        lines.append(f"🏷️ {' · '.join(disciplines)}")
    lines.append(f"📅 {format_date(jour).capitalize()}")
    lines.append(f"⏰ {format_horaires(s)}")
    commune, adresse = s.get("lieu_depart"), clean_address(s.get("adresse_depart"))
    if commune and adresse and commune.lower() in adresse.lower():
        commune = None  # l'adresse contient déjà la commune : ne pas la répéter
    lieu = " – ".join(p for p in (commune, adresse) if p)
    if lieu:
        lines.append(f"📍 {lieu}")
        lines.append(f"🗺️ {maps_link(s)}")
    all_circuits = s.get("circuits") or []
    # un circuit sans distance ni lien n'apporte rien : on les compte au lieu de les lister un par un
    circuits = [c for c in all_circuits if c.get("distance_km") or c.get("lien_trace")]
    unnamed = len(all_circuits) - len(circuits)
    if all_circuits:
        order = {d: i for i, d in enumerate(s.get("disciplines") or [])}
        circuits = sorted(circuits, key=lambda c: (order.get(c.get("discipline"), 99), c.get("distance_km") or 0))
        multi = len({c.get("discipline") for c in circuits}) > 1  # titre de groupe seulement s'il y a plusieurs disciplines
        lines += ["", "🛣️ *Circuits*"]
        current = None
        for c in circuits:
            if multi and c.get("discipline") != current:
                current = c.get("discipline")
                lines.append(f"_{DISCIPLINES.get(current, current or 'Autre')}_")
            detail = f"• {km(c['distance_km'])} km" if c.get("distance_km") else "• circuit"
            if c.get("denivele_m"):
                detail += f" · D+ {c['denivele_m']:g} m"
            lines.append(detail)
            if str(c.get("lien_trace") or "").startswith("http"):
                stale = c.get("trace_annee") and c["trace_annee"] != s["date"][:4]
                lines.append(f"  🔗 {c['lien_trace']}" + (f" ⚠️ tracé titré {c['trace_annee']}" if stale else ""))
        if unnamed:
            lines.append(f"• {unnamed} circuit(s) annoncé(s), distances non publiées")
        lines.append("")
    if s.get("organisateur"):
        lines.append(f"👥 {s['organisateur']}")
    if s.get("federation") in FEDERATIONS:  # « autre » et l'absence d'indice ne s'affichent pas
        lines.append(f"🏛️ Fédération : {s['federation']}")
    if s.get("tarif_inscription"):
        lines.append(f"💶 {s['tarif_inscription']}")
    if s.get("fiabilite") == "a_verifier":
        lines.append("⚠️ infos à vérifier auprès de l'organisateur")
    if s.get("url"):
        lines.append(f"🔗 Infos : {s['url']}")
    return "\n".join(lines)  # result["notes"] reste dans le JSON, trop long pour le groupe


def render_cancel(s: dict) -> str:
    jour = format_date(date.fromisoformat(s["date"])).capitalize()
    lines = [f"❌ *ANNULÉE* – {s.get('titre') or 'Sortie'}", f"📅 {jour}"]
    if s.get("lieu_depart"):
        lines.append(f"📍 {s['lieu_depart']}")
    if s.get("url"):
        lines.append(f"🔗 {s['url']}")
    return "\n".join(lines)


def render_change(s: dict, changes: list[str]) -> str:
    return "\n".join(["🔄 *MODIFICATION*", *(f"• {c}" for c in changes), "", render_sortie(s)])


def render_notification(kind: str, s: dict, changes: list[str]) -> str:
    """Un message détaillé pour une sortie : fiche complète, précédée d'un en-tête si c'est une modification ou une annulation."""
    if kind == "annulation":
        return render_cancel(s)
    if kind == "modification":
        return render_change(s, changes)
    return render_sortie(s)


DIGEST_MAX_CHARS = 1400  # un message WhatsApp reste lisible en dessous


def render_digest(notifications: list[tuple[str, dict, list[str]]]) -> list[str]:
    """Synthèse compacte pour beaucoup de sorties : un message par semaine, trois lignes au plus par sortie."""
    by_week: dict[tuple[int, int], list[tuple[str, dict, list[str]]]] = {}
    for n in sorted(notifications, key=lambda n: (n[1]["date"], n[1].get("heure_depart") or n[1].get("heure_rdv") or "99:99")):
        by_week.setdefault(date.fromisoformat(n[1]["date"]).isocalendar()[:2], []).append(n)

    messages = []
    for week in by_week.values():
        first, last = date.fromisoformat(week[0][1]["date"]), date.fromisoformat(week[-1][1]["date"])
        head = f"🚴 *Sorties {'du ' + format_date(first) + ' au ' + format_date(last) if first != last else 'du ' + format_date(first)}*"
        blocks, current_day = [head], None
        for kind, s, _ in week:
            day = date.fromisoformat(s["date"])
            if s["date"] != current_day:
                if first != last:  # sur une seule journée, la date est déjà dans le titre
                    blocks.append(f"*{format_date(day).capitalize()}*")
                current_day = s["date"]
            hour = s.get("heure_depart") or s.get("heure_rdv") or "?"
            prefix = "❌ ANNULÉE · " if kind == "annulation" else ""
            lines = [f"• {hour} – {prefix}{s.get('titre') or 'Sortie'} – {s.get('lieu_depart') or '?'}"]
            details = [DISCIPLINES.get(d, d) for d in s.get("disciplines") or []]
            distances = sorted({c["distance_km"] for c in s.get("circuits") or [] if c.get("distance_km") and c.get("discipline") in (None, "route")})
            if distances:
                details.append(" / ".join(km(d) for d in distances) + " km")
            if s.get("fiabilite") == "a_verifier":
                details.append("⚠️ à vérifier")
            if details:
                lines.append("  " + " · ".join(details))
            if s.get("url"):
                lines.append(f"  🔗 {s['url']}")
            blocks.append("\n".join(lines))
        messages += _pack(blocks)
    return messages


def _pack(blocks: list[str]) -> list[str]:
    """Regroupe des blocs en messages de DIGEST_MAX_CHARS caractères au plus, sans couper un bloc."""
    messages, current = [], ""
    for block in blocks:
        candidate = f"{current}\n{block}" if current else block
        if current and len(candidate) > DIGEST_MAX_CHARS:
            messages.append(current)
            current = block
        else:
            current = candidate
    return messages + ([current] if current else [])


# --- Recherche ------------------------------------------------------------------------------------------------------

DISCOVERY_WORKERS = 3
MAX_VERIFIED_DEFAULT = 24  # couvre l'intégralité des sorties d'une fenêtre glissante de 4 semaines


def _discover(chunk: Periode) -> tuple[str, dict]:
    return run_agent(chunk)


def search(periode: Periode, max_verified: int = MAX_VERIFIED_DEFAULT) -> list[dict]:
    """Passes 1 à 3 sur la période, puis enregistrement dans la base. Renvoie les sorties retenues."""
    chunks = periode.chunks()
    print(f"Recherche {periode.describe()} ({len(chunks)} semaine(s), {periode.label})...", file=sys.stderr)
    OUTPUT_DIR.mkdir(exist_ok=True)

    with ThreadPoolExecutor(max_workers=DISCOVERY_WORKERS) as pool:
        discovered = list(pool.map(_discover, chunks))

    found, cost = [], 0.0
    for chunk, (text, envelope) in zip(chunks, discovered):
        cost += envelope.get("total_cost_usd", 0)
        (OUTPUT_DIR / f"{date.today().isoformat()}.raw-{chunk.start.isoformat()}.txt").write_text(text, encoding="utf-8")
        try:
            found += parse_result(text).get("sorties", [])
        except (ValueError, json.JSONDecodeError):
            print(f"[semaine du {chunk.start}] réponse illisible, semaine ignorée (voir le fichier .raw)", file=sys.stderr)

    # une même sortie peut apparaître deux fois (deux semaines voisines, deux sources) : on garde la première
    seen, unique = set(), []
    for s in found:
        key = (s.get("date"), tracking.slug(s.get("lieu_depart")) or tracking.slug(s.get("titre")))
        if key not in seen:
            seen.add(key)
            unique.append(s)

    kept, rejected = filter_sorties(unique, periode)
    for s, reason in rejected:
        print(f"[écartée] {s.get('titre')} : {reason}", file=sys.stderr)
    for s in kept:
        if not year_proven(s):  # la 1re passe n'a pas cité l'année de l'édition
            s["fiabilite"] = "a_verifier"
            print(f"[année non prouvée] {s.get('titre')}", file=sys.stderr)

    # Les sorties déjà en base pour cette période sont revérifiées même si la découverte ne les retrouve pas : elle n'est pas
    # stable d'un passage à l'autre, et c'est ainsi qu'on détecte une annulation ou un changement.
    existing_by_id = {row["id"]: row for row in db.sorties_between(periode)}
    keyed_kept = tracking.assign_keys(kept)
    for key, s in keyed_kept.items():
        if old := existing_by_id.get(key):
            # Conserve les anciens circuits vérifiés pour `keep_known_links` si besoin, tout en forçant la revérification
            if old.get("verifiee_organisateur") and not s.get("circuits"):
                s["circuits"] = old.get("circuits") or []
                s["verifiee_organisateur"] = True
    for row_id, row in existing_by_id.items():
        if row_id not in keyed_kept and row["statut"] != "annulee":
            kept.append({**tracking.ref(row), "fiabilite": "a_verifier", "circuits": row.get("circuits") or [],
                         "verifiee_organisateur": row.get("verifiee_organisateur", False), "disciplines": row.get("disciplines") or []})
            print(f"[déjà en base, revérifiée] {row['titre']}", file=sys.stderr)

    kept.sort(key=lambda s: (s["date"], s.get("heure_depart") or s.get("heure_rdv") or "99:99"))
    to_verify = kept[:max_verified]
    if len(kept) > max_verified:
        print(f"[limite] {len(kept)} sorties : seules les {max_verified} premières sont vérifiées chez l'organisateur "
              f"(--max-verif pour changer). Les autres sont enregistrées « à vérifier ».", file=sys.stderr)
        for s in kept[max_verified:]:
            s["fiabilite"] = "a_verifier"
    print(f"Vérification chez les organisateurs ({len(to_verify)} sorties)...", file=sys.stderr)
    _, enrich_log, enrich_cost = enrich_all(to_verify)
    for line in enrich_log:
        print(line, file=sys.stderr)

    db.save_search(periode, kept, rejected, cost + enrich_cost)
    print(f"\n[coût équivalent API : ${cost + enrich_cost:.2f}]", file=sys.stderr)
    return kept


# --- Canaux de sortie -----------------------------------------------------------------------------------------------

CANAUX = ("whatsapp", "fichier")
MAX_MESSAGES_DEFAULT = 8  # au-delà, mieux vaut une synthèse : chaque message WhatsApp attend 2 minutes


def deliver(canal: str, messages: list[str]) -> None:
    if canal == "whatsapp":
        from whatsapp import send_messages

        send_messages(messages)
    elif canal == "fichier":
        OUTPUT_DIR.mkdir(exist_ok=True)
        path = OUTPUT_DIR / f"envoi-{date.today().isoformat()}.txt"
        path.write_text("\n\n---\n\n".join(messages), encoding="utf-8")
        print(f"Messages écrits dans {path}", file=sys.stderr)
    else:
        raise SystemExit(f"Canal inconnu : {canal!r} (canaux : {', '.join(CANAUX)})")


# --- Commandes ------------------------------------------------------------------------------------------------------

def publier_site(depuis: str | None = None, jusqu_a: str | None = None) -> tuple[int, list[Path]]:
    """Exporte les sorties de la fenêtre glissante de 4 semaines (par défaut) de la base SQLite vers le site web Next.js
    (data/sorties-weekend.json pour le build SSG et public/data/sorties-weekend.json pour la lecture directe sur OVH)."""
    now = datetime.now()
    window = rolling_weeks(now.date(), 4)
    min_date = depuis if depuis is not None else window.start.isoformat()
    max_date = jusqu_a if jusqu_a is not None else window.end.isoformat()
    sorties = db.all_retenues(depuis=min_date, jusqu_a=max_date)
    if depuis is None:
        sorties = [s for s in sorties if not is_past_sortie(s, now)]
    last_search = db.last_search_info()
    items = []
    for s in sorties:
        day = date.fromisoformat(s["date"])
        all_circuits = s.get("circuits") or []
        order = {d: i for i, d in enumerate(s.get("disciplines") or [])}
        valid_circuits = sorted(
            (c for c in all_circuits if c.get("distance_km") or c.get("lien_trace")),
            key=lambda c: (order.get(c.get("discipline"), 99), c.get("distance_km") or 0),
        )
        unnamed_count = len(all_circuits) - len(valid_circuits)
        items.append({
            "id": s["id"],
            "date": s["date"],
            "date_label": format_date(day).capitalize(),
            "horaires_label": format_horaires(s),
            "heure_rdv": s.get("heure_rdv"),
            "heure_depart": s.get("heure_depart"),
            "titre": s.get("titre") or "Sortie cyclo",
            "organisateur": s.get("organisateur"),
            "federation": s.get("federation") if s.get("federation") in FEDERATIONS else None,
            "lieu_depart": s.get("lieu_depart"),
            "code_postal": s.get("code_postal"),
            "adresse_depart": clean_address(s.get("adresse_depart")),
            "maps_url": maps_link(s) if (s.get("lieu_depart") or s.get("adresse_depart")) else None,
            "disciplines": s.get("disciplines") or [],
            "circuits": [
                {
                    "discipline": c.get("discipline") or "route",
                    "distance_km": c.get("distance_km"),
                    "denivele_m": c.get("denivele_m"),
                    "lien_trace": c.get("lien_trace") if str(c.get("lien_trace") or "").startswith("http") else None,
                    "trace_titre": c.get("trace_titre"),
                    "trace_annee": c.get("trace_annee"),
                }
                for c in valid_circuits
            ],
            "circuits_non_precises": unnamed_count,
            "tarif_inscription": s.get("tarif_inscription"),
            "contact": s.get("contact"),
            "url": s.get("url") if str(s.get("url") or "").startswith("http") else None,
            "statut": s.get("statut") or "maintenue",
            "fiabilite": s.get("fiabilite") or "a_verifier",
            "preuve_date": s.get("preuve_date"),
            "distance_toulouse_km": s.get("distance_toulouse_km"),
            "derniere_vue": s.get("derniere_vue"),
        })

    # Vision à ~3 mois : au-delà de la fenêtre détaillée, seulement les infos utiles pour bloquer une date.
    horizon_start = (date.fromisoformat(max_date) + timedelta(days=1)).isoformat()
    horizon_end = (now.date() + timedelta(weeks=HORIZON_WEEKS)).isoformat()
    apercu = [
        {
            "id": s["id"],
            "date": s["date"],
            "titre": s.get("titre") or "Sortie cyclo",
            "organisateur": s.get("organisateur"),
            "federation": s.get("federation") if s.get("federation") in FEDERATIONS else None,
            "lieu_depart": s.get("lieu_depart"),
            "disciplines": s.get("disciplines") or [],
            "url": s.get("url") if str(s.get("url") or "").startswith("http") else None,
            "fiabilite": s.get("fiabilite") or "a_verifier",
        }
        for s in db.all_retenues(depuis=horizon_start, jusqu_a=horizon_end)
        if s.get("statut") != "annulee"
    ]

    payload = {
        "updatedAt": db._now(),
        "horizonEnd": horizon_end,
        "apercu": apercu,
        "windowStart": min_date,
        "windowEnd": max_date,
        "lastPeriodLabel": (last_search or {}).get("libelle") or window.label,
        "sorties": items,
    }
    raw_json = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
    targets = [
        HERE.parent / "data" / "sorties-weekend.json",
        HERE.parent / "public" / "data" / "sorties-weekend.json",
    ]
    for target in targets:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(raw_json, encoding="utf-8")
    return len(items), targets


def horizon_periodes(today: date, window_end: date) -> list[Periode]:
    """Périodes de la vision longue (jusqu'à HORIZON_WEEKS semaines), découpées pour rester sous la limite de 2 mois par recherche."""
    end = today + timedelta(weeks=HORIZON_WEEKS)
    periodes, start = [], window_end + timedelta(days=1)
    while start <= end:
        stop = min(start + timedelta(days=55), end)
        periodes.append(Periode(start, stop, "vision longue"))
        start = stop + timedelta(days=1)
    return periodes


def cmd_rechercher(args: argparse.Namespace) -> int:
    periode = parse_periode(args.periode)
    kept = search(periode, args.max_verif)
    # Fenêtre glissante par défaut : en plus du détail des 4 semaines, repérage allégé (sans vérification chez
    # les organisateurs) des dates annoncées jusqu'à HORIZON_WEEKS semaines.
    if periode.label == "4 prochaines semaines" and not args.sans_horizon:
        for longue in horizon_periodes(date.today(), periode.end):
            print(f"\n--- Vision longue : {longue.describe()} (repérage allégé) ---")
            kept += search(longue, 0)
    count, _ = publier_site()
    print(f"\n{len(kept)} sortie(s) enregistrée(s) dans {db.DB_PATH.name} ({count} dans la fenêtre des 4 prochaines semaines sur le site web).")
    print(f"Voir la base :        python agent.py lister --periode \"{args.periode}\"")
    print(f"Aperçu des messages : python agent.py envoyer --periode \"{args.periode}\"")
    return 0


def cmd_preparer(args: argparse.Namespace) -> int:
    """Prépare le plan d'exécution et les prompts pour un agent externe (ex. Antigravity / Gemini 4 Argon)."""
    periode = parse_periode(args.periode)
    chunks = periode.chunks()
    existing = db.sorties_between(periode)
    plan = {
        "periode": {
            "start": periode.start.isoformat(),
            "end": periode.end.isoformat(),
            "label": periode.label,
            "describe": periode.describe(),
        },
        "chunks": [
            {
                "start": c.start.isoformat(),
                "end": c.end.isoformat(),
                "describe": c.describe(),
                "user_prompt": build_user_prompt(c),
            }
            for c in chunks
        ],
        "existing_in_db": [
            {
                "id": r["id"],
                "date": r["date"],
                "titre": r.get("titre"),
                "organisateur": r.get("organisateur"),
                "lieu_depart": r.get("lieu_depart"),
                "url": r.get("url"),
                "fiabilite": r.get("fiabilite"),
            }
            for r in existing
        ],
        "system_prompt": SYSTEM_PROMPT,
        "enrich_system_prompt": ENRICH_SYSTEM_PROMPT,
        "poster_system_prompt": POSTER_SYSTEM_PROMPT,
    }
    print(json.dumps(plan, ensure_ascii=False, indent=2))
    return 0


def cmd_affiches(args: argparse.Namespace) -> int:
    """Télécharge les affiches (PDF/images), convertit les PDF en PNG et décode les QR codes pour lecture par Antigravity."""
    dest = POSTERS_DIR / (tracking.slug(args.lieu) or "sortie")
    posters = download_posters(args.urls, dest)
    qr = {p.name: decode_qr(p) for p in posters}
    print(json.dumps({
        "dest": str(dest),
        "posters": [str(p) for p in posters],
        "qr_codes": qr,
    }, ensure_ascii=False, indent=2))
    return 0


def cmd_ingerer(args: argparse.Namespace) -> int:
    """Ingère les résultats produits par Antigravity (Gemini 4 Argon), applique tous les contrôles déterministes
    (filtrage, fusion des vérifications organisateurs, contrôle des tracés OpenRunner), met à jour SQLite et publie sur le site."""
    periode = parse_periode(args.periode)
    raw_data = json.loads(Path(args.fichier).read_text(encoding="utf-8"))
    found = raw_data.get("sorties") or []
    enrichments = {
        (e.get("date") or e.get("date_page"), tracking.slug(e.get("lieu_depart") or e.get("titre") or "")): e
        for e in (raw_data.get("enrichments") or [])
    }

    seen, unique = set(), []
    for s in found:
        key = (s.get("date"), tracking.slug(s.get("lieu_depart")) or tracking.slug(s.get("titre")))
        if key not in seen:
            seen.add(key)
            unique.append(s)

    kept, rejected = filter_sorties(unique, periode)
    for s, reason in rejected:
        print(f"[écartée] {s.get('titre')} : {reason}", file=sys.stderr)

    existing_by_id = {row["id"]: row for row in db.sorties_between(periode)}
    keyed_kept = tracking.assign_keys(kept)
    for key, s in keyed_kept.items():
        if old := existing_by_id.get(key):
            if old.get("verifiee_organisateur") and not s.get("circuits"):
                s["circuits"] = old.get("circuits") or []
                s["verifiee_organisateur"] = True

    for s in kept:
        e_key = (s.get("date"), tracking.slug(s.get("lieu_depart")) or tracking.slug(s.get("titre")))
        if e := enrichments.get(e_key):
            _, msg = merge_enrichment(s, e)
            print(f"[vérif. organisateur] {s.get('titre')} : {msg}", file=sys.stderr)
        elif not year_proven(s):
            s["fiabilite"] = "a_verifier"
            print(f"[année non prouvée] {s.get('titre')}", file=sys.stderr)
        elif s.get("circuits"):
            s["fiabilite"] = s.get("fiabilite") or "confirmee"
            s["verifiee_organisateur"] = True

        read = traces.annotate_circuits(s)
        if read:
            old = [c for c in s.get("circuits") or [] if c.get("trace_annee") and c["trace_annee"] != s["date"][:4]]
            print(f"[tracés] {s.get('titre')} : {read} lien(s) lu(s)"
                  + (f", {len(old)} titré(s) d'une autre année ({old[0]['trace_annee']})" if old else ""), file=sys.stderr)

    kept.sort(key=lambda s: (s["date"], s.get("heure_depart") or s.get("heure_rdv") or "99:99"))
    db.save_search(periode, kept, rejected, 0.0)
    count, targets = publier_site()
    print(f"{len(kept)} sortie(s) enregistrée(s) en base pour {periode.describe()} ; {count} publiée(s) sur le site (fenêtre 4 semaines).")
    return 0


def cmd_envoyer(args: argparse.Namespace) -> int:
    periode = parse_periode(args.periode)
    sorties = db.sorties_between(periode)
    if not sorties:
        raise SystemExit(f"Aucune sortie en base pour {periode.describe()} : lancez d'abord `python agent.py rechercher`.")
    notifications, new_state, log = tracking.decide(sorties, db.load_state(args.canal))
    for line in log:
        print(line, file=sys.stderr)

    synthese = args.format == "synthese" or (args.format == "auto" and len(notifications) > 6)
    messages = render_digest(notifications) if synthese else [render_notification(*n) for n in notifications]
    if not messages:
        print("Rien de nouveau : aucun message à envoyer.", file=sys.stderr)
        return 0
    for i, message in enumerate(messages, 1):
        print(f"--- message {i}/{len(messages)} ({'synthèse' if synthese else 'détail'}) ---\n{message}\n")

    if not args.oui:
        print(f"[aperçu : rien envoyé, état inchangé. Pour envoyer sur « {args.canal} » : ajouter --oui]", file=sys.stderr)
        return 0
    if args.canal == "whatsapp" and len(messages) > args.max_messages:
        raise SystemExit(f"{len(messages)} messages à envoyer (limite {args.max_messages}, 2 min de pause entre chacun) : "
                         "utilisez --format synthese, ou relevez --max-messages.")
    deliver(args.canal, messages)
    db.save_state(args.canal, new_state)  # seulement après un envoi réussi
    print(f"{len(messages)} message(s) envoyé(s) sur « {args.canal} ».", file=sys.stderr)
    return 0


def cmd_verifier(args: argparse.Namespace) -> int:
    """Relance seulement la vérification chez l'organisateur (et la lecture des affiches) sur des sorties déjà en base."""
    periode = parse_periode(args.periode)
    sorties = db.sorties_between(periode)
    if args.filtre:
        needle = tracking.slug(args.filtre)
        sorties = [s for s in sorties if needle in tracking.slug(f"{s.get('titre')} {s.get('lieu_depart')}")]
    if not sorties:
        raise SystemExit(f"Aucune sortie en base pour {periode.describe()}" + (f" correspondant à « {args.filtre} »" if args.filtre else "") + ".")
    print(f"Revérification chez l'organisateur de {len(sorties)} sortie(s)...", file=sys.stderr)
    _, log, cost = enrich_all(sorties)
    for line in log:
        print(line, file=sys.stderr)
    db.update_sorties(sorties)
    publier_site()
    print(f"{len(sorties)} sortie(s) mise(s) à jour en base et sur le site [coût équivalent API : ${cost:.2f}].")
    return 0


def cmd_traces(args: argparse.Namespace) -> int:
    """Contrôle les liens OpenRunner des sorties en base (titre, distance, année). Rapide et sans appel à l'agent."""
    periode = parse_periode(args.periode)
    sorties = db.sorties_between(periode)
    total = 0
    for s in sorties:
        read = traces.annotate_circuits(s)
        total += read
        old = sorted({c["trace_annee"] for c in s["circuits"] if c.get("trace_annee") and c["trace_annee"] != s["date"][:4]})
        if read:
            print(f"{s['titre']} : {read} lien(s) lu(s)" + (f" ⚠️ tracé(s) titré(s) {', '.join(old)}" if old else ""))
    db.update_sorties(sorties)
    publier_site()
    print(f"{total} lien(s) contrôlé(s) sur {len(sorties)} sortie(s).")
    return 0


def cmd_lister(args: argparse.Namespace) -> int:
    db.lister(parse_periode(args.periode))
    return 0


def cmd_publier(args: argparse.Namespace) -> int:
    count, targets = publier_site(depuis=args.depuis, jusqu_a=args.jusqu_a)
    print(f"{count} sortie(s) publiée(s) pour le site web dans :")
    for t in targets:
        print(f"  - {t}")
    return 0


def cmd_exporter(args: argparse.Namespace) -> int:
    periode = parse_periode(args.periode)
    sorties = db.sorties_between(periode)
    if not sorties:
        raise SystemExit(f"Aucune sortie en base pour {periode.describe()} : lancez d'abord `python agent.py rechercher`.")
    name = f"sorties-cyclo-{periode.start.isoformat()}_{periode.end.isoformat()}.{args.format}"
    target = Path(args.sortie) if args.sortie else OUTPUT_DIR / name
    if args.format == "xlsx":
        from export_xlsx import ecrire_xlsx

        path = ecrire_xlsx(target, sorties, maps_link)
    else:
        from export_sheet import ecrire_csv

        path = ecrire_csv(target, sorties, maps_link)
    print(f"{len(sorties)} sortie(s) exportée(s) dans {path}")
    print("À importer dans Google Sheets : Drive > Nouveau > Importer un fichier (le XLSX garde la mise en forme), "
          "ou demander à Claude de le créer dans votre Drive.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    commands = parser.add_subparsers(dest="commande", required=True)

    def add_periode(p: argparse.ArgumentParser) -> None:
        p.add_argument("--periode", default="4 prochaines semaines",
                       help='défaut : "4 prochaines semaines" (fenêtre glissante). Ex: "prochain week-end", "octobre", "du 3 au 18 octobre"')

    p = commands.add_parser("rechercher", help="chercher les sorties (via Claude Code headless) et les enregistrer en base")
    add_periode(p)
    p.add_argument("--max-verif", type=int, default=MAX_VERIFIED_DEFAULT, help="nombre maximal de sorties vérifiées chez l'organisateur")
    p.add_argument("--sans-horizon", action="store_true", help="ne pas faire le repérage allégé des mois suivants (fenêtre glissante par défaut)")
    p.set_defaults(run=cmd_rechercher)

    p = commands.add_parser("preparer", help="préparer les prompts et le découpage pour exécution depuis Antigravity (Gemini)")
    add_periode(p)
    p.set_defaults(run=cmd_preparer)

    p = commands.add_parser("affiches", help="télécharger les affiches PDF/images et décoder les QR codes")
    p.add_argument("--lieu", required=True, help="commune ou nom de la sortie")
    p.add_argument("--urls", nargs="+", required=True, help="URLs des affiches")
    p.set_defaults(run=cmd_affiches)

    p = commands.add_parser("ingerer", help="valider, contrôler les tracés, enregistrer en base et publier les résultats d'Antigravity")
    add_periode(p)
    p.add_argument("--fichier", required=True, help="chemin du fichier JSON produit par l'agent")
    p.set_defaults(run=cmd_ingerer)

    p = commands.add_parser("envoyer", help="envoyer les sorties de la base (aperçu sans --oui)")
    add_periode(p)
    p.add_argument("--canal", choices=CANAUX, default="whatsapp")
    p.add_argument("--format", choices=("auto", "detail", "synthese"), default="auto",
                   help="detail : un message par sortie ; synthese : un message par semaine ; auto : synthèse au-delà de 6 sorties")
    p.add_argument("--max-messages", type=int, default=MAX_MESSAGES_DEFAULT)
    p.add_argument("--oui", action="store_true", help="envoyer réellement (sinon aperçu)")
    p.set_defaults(run=cmd_envoyer)

    p = commands.add_parser("verifier", help="revérifier chez l'organisateur des sorties déjà en base")
    add_periode(p)
    p.add_argument("--filtre", help="ne revérifier que les sorties dont le titre ou la commune contient ce texte (ex. seyssoise)")
    p.set_defaults(run=cmd_verifier)

    p = commands.add_parser("traces", help="contrôler les liens OpenRunner de la base (sans appel à l'agent)")
    add_periode(p)
    p.set_defaults(run=cmd_traces)

    p = commands.add_parser("lister", help="afficher le contenu de la base pour la période")
    add_periode(p)
    p.set_defaults(run=cmd_lister)

    p = commands.add_parser("publier", help="exporter les sorties de la base (fenêtre glissante 4 semaines) vers data/sorties-weekend.json")
    p.add_argument("--depuis", default=None, help="date minimale AAAA-MM-JJ (défaut : aujourd'hui)")
    p.add_argument("--jusqu-a", default=None, help="date maximale AAAA-MM-JJ (défaut : +4 semaines)")
    p.set_defaults(run=cmd_publier)

    p = commands.add_parser("exporter", help="exporter les sorties de la base en XLSX mis en forme ou en CSV (import Google Sheets)")
    add_periode(p)
    p.add_argument("--format", choices=("xlsx", "csv"), default="xlsx", help="xlsx : mis en forme, 3 onglets (défaut) ; csv : brut")
    p.add_argument("--sortie", help="chemin du fichier CSV (défaut : output/sorties-cyclo-<dates>.csv)")
    p.set_defaults(run=cmd_exporter)

    args = parser.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")  # emojis sur la console Windows
    try:
        return args.run(args)
    except ValueError as e:  # période non comprise, etc.
        raise SystemExit(str(e))


if __name__ == "__main__":
    sys.exit(main())


