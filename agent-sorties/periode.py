"""Périodes de recherche : « prochain week-end », « dernier week-end de septembre », « octobre », « du 3 au 18 octobre »...

L'interprétation est déterministe (aucun appel à l'agent) : la même phrase donne toujours les mêmes dates.
"""

import calendar
import re
import unicodedata
from dataclasses import dataclass
from datetime import date, timedelta

MOIS = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
]
JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
RANGS = {"premier": 1, "1er": 1, "deuxieme": 2, "2eme": 2, "2e": 2, "troisieme": 3, "3eme": 3, "3e": 3,
         "quatrieme": 4, "4eme": 4, "4e": 4, "dernier": -1}

EXEMPLES = (
    "4 prochaines semaines | prochain week-end | dernier week-end de septembre | 2e week-end d'octobre | "
    "week-end du 10 octobre | octobre | du 3 au 18 octobre | 2026-10-03/2026-10-18"
)


def _plain(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode().lower()
    text = re.sub(r"week[\s-]*end", "weekend", text)
    return re.sub(r"\s+", " ", text.replace("'", " ")).strip()


MOIS_PLAIN = {_plain(m): i for i, m in enumerate(MOIS, 1)}
_MOIS_RE = "|".join(MOIS_PLAIN)


def format_date(d: date) -> str:
    return f"{JOURS[d.weekday()]} {d.day} {MOIS[d.month - 1]}"


@dataclass(frozen=True)
class Periode:
    start: date
    end: date
    label: str

    def contains(self, d: date) -> bool:
        return self.start <= d <= self.end

    @property
    def is_weekend(self) -> bool:
        return self.start.weekday() == 5 and self.end == self.start + timedelta(days=1)

    def chunks(self) -> list["Periode"]:
        """Découpe par semaine (lundi-dimanche) : un appel de recherche par semaine reste maîtrisable et plus exhaustif."""
        chunks, current = [], self.start
        while current <= self.end:
            week_end = min(current + timedelta(days=6 - current.weekday()), self.end)
            chunks.append(Periode(current, week_end, self.label))
            current = week_end + timedelta(days=1)
        return chunks

    def describe(self) -> str:
        if self.start == self.end:
            return format_date(self.start)
        return f"du {format_date(self.start)} au {format_date(self.end)}"


def next_weekend(today: date) -> Periode:
    """Prochain week-end (le week-end en cours si on est samedi ou dimanche)."""
    saturday = today - timedelta(days=1) if today.weekday() == 6 else today + timedelta(days=5 - today.weekday())
    return weekend_of(saturday, "prochain week-end")


def rolling_weeks(today: date, weeks: int = 4) -> Periode:
    """Fenêtre glissante des N prochaines semaines (d'aujourd'hui jusqu'au dimanche de la N-ième semaine)."""
    end = today + timedelta(days=weeks * 7)
    if end.weekday() != 6:
        end += timedelta(days=6 - end.weekday())
    return Periode(today, end, f"{weeks} prochaines semaines")


def weekend_of(day: date, label: str) -> Periode:
    saturday = day - timedelta(days=(day.weekday() - 5) % 7) if day.weekday() != 6 else day - timedelta(days=1)
    return Periode(saturday, saturday + timedelta(days=1), label)


def _year(month: int, explicit: str | None, today: date, end_of_month: bool = True) -> int:
    """Année donnée, sinon l'année en cours, ou la suivante si ce mois est déjà entièrement passé."""
    if explicit:
        return int(explicit)
    last_day = date(today.year, month, calendar.monthrange(today.year, month)[1])
    return today.year if last_day >= today or not end_of_month else today.year + 1


def _nth_weekend(year: int, month: int, rank: int) -> date:
    saturdays = [date(year, month, d) for d in range(1, calendar.monthrange(year, month)[1] + 1)
                 if date(year, month, d).weekday() == 5]
    if rank == -1:
        return saturdays[-1]
    if rank > len(saturdays):
        raise ValueError(f"Il n'y a pas de {rank}e week-end en {MOIS[month - 1]} {year}.")
    return saturdays[rank - 1]


def parse_periode(text: str | None, today: date | None = None) -> Periode:
    today = today or date.today()
    raw = (text or "").strip()
    plain = _plain(raw)
    if plain in ("", "4 semaines", "4 prochaines semaines", "les 4 prochaines semaines", "4 semaines a venir", "les 4 semaines a venir", "rolling"):
        return rolling_weeks(today, 4)

    if plain in ("prochain weekend", "ce weekend", "le prochain weekend", "prochain"):
        return next_weekend(today)

    if m := re.fullmatch(r"(?:les )?(\d{1,2}) (?:prochaines? )?semaines?(?: a venir)?", plain):
        return _checked(rolling_weeks(today, int(m[1])), today, raw)

    if m := re.fullmatch(r"(\d{4}-\d{2}-\d{2})\s*(?:/|\.\.|à|a)\s*(\d{4}-\d{2}-\d{2})", plain):
        start, end = date.fromisoformat(m[1]), date.fromisoformat(m[2])
        return _checked(Periode(start, end, f"{start} au {end}"), today, raw)

    # « dernier week-end de septembre », « 2e week-end d'octobre 2027 »
    if m := re.fullmatch(rf"(?:le )?({'|'.join(RANGS)}) weekend (?:de |d )?({_MOIS_RE})(?: (\d{{4}}))?", plain):
        month = MOIS_PLAIN[m[2]]
        saturday = _nth_weekend(_year(month, m[3], today), month, RANGS[m[1]])
        return _checked(weekend_of(saturday, f"{m[1]} week-end de {MOIS[month - 1]}"), today, raw)

    # « week-end du 10 octobre »
    if m := re.fullmatch(rf"weekend (?:du |de |d )?(\d{{1,2}}|1er) ({_MOIS_RE})(?: (\d{{4}}))?", plain):
        month, day = MOIS_PLAIN[m[2]], 1 if m[1] == "1er" else int(m[1])
        return _checked(weekend_of(date(_year(month, m[3], today), month, day), f"week-end du {day} {MOIS[month - 1]}"), today, raw)

    # « du 3 au 18 octobre »
    if m := re.fullmatch(rf"(?:du )?(\d{{1,2}}|1er) au (\d{{1,2}}) ({_MOIS_RE})(?: (\d{{4}}))?", plain):
        month, year = MOIS_PLAIN[m[3]], _year(MOIS_PLAIN[m[3]], m[4], today)
        start, end = date(year, month, 1 if m[1] == "1er" else int(m[1])), date(year, month, int(m[2]))
        return _checked(Periode(start, end, f"du {start.day} au {end.day} {MOIS[month - 1]}"), today, raw)

    # « octobre », « octobre 2027 » : le mois entier (à partir d'aujourd'hui si c'est le mois en cours)
    if m := re.fullmatch(rf"(?:tout |toutes les sorties d |le mois d |mois d )?(?:le )?(?:en )?({_MOIS_RE})(?: (\d{{4}}))?", plain):
        month = MOIS_PLAIN[m[1]]
        year = _year(month, m[2], today)
        start, end = date(year, month, 1), date(year, month, calendar.monthrange(year, month)[1])
        return _checked(Periode(max(start, today) if start < today <= end else start, end, f"{MOIS[month - 1]} {year}"), today, raw)

    raise ValueError(f"Période non comprise : {raw!r}. Exemples : {EXEMPLES}")


def _checked(periode: Periode, today: date, raw: str) -> Periode:
    if periode.end < today:
        raise ValueError(f"La période {raw!r} ({periode.describe()}) est déjà passée.")
    if periode.end < periode.start:
        raise ValueError(f"La période {raw!r} se termine avant son début.")
    if (periode.end - periode.start).days > 62:
        raise ValueError("Période trop longue (2 mois maximum) : découpez la recherche.")
    return Periode(max(periode.start, today), periode.end, periode.label)
