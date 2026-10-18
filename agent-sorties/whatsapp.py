"""Envoi d'un message WhatsApp via CallMeBot (https://www.callmebot.com/).

CallMeBot envoie uniquement vers le numéro qui l'a activé (pas vers un groupe).
Configuration dans agent-sorties/.env (ou variables d'environnement) :
    WHATSAPP_PHONE=+33612345678
    CALLMEBOT_APIKEY=123456

Test rapide :
    python whatsapp.py "Message de test"
"""

import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

API_URL = "https://api.callmebot.com/whatsapp.php"
MAX_CHUNK = 1500  # caractères par message, on découpe au-delà


def load_env() -> None:
    """Charge .env (KEY=VALUE) sans écraser les variables déjà définies."""
    env_file = Path(__file__).parent / ".env"
    if not env_file.exists():
        return
    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())


def split_message(text: str, limit: int = MAX_CHUNK) -> list[str]:
    """Découpe sur les lignes vides pour ne pas couper une sortie en deux."""
    chunks, current = [], ""
    for block in text.split("\n\n"):
        candidate = f"{current}\n\n{block}" if current else block
        if current and len(candidate) > limit:
            chunks.append(current)
            current = block
        else:
            current = candidate
    if current:
        chunks.append(current)
    return chunks


def send_whatsapp(text: str) -> None:
    load_env()
    phone, apikey = os.environ.get("WHATSAPP_PHONE"), os.environ.get("CALLMEBOT_APIKEY")
    if not phone or not apikey:
        raise RuntimeError("WHATSAPP_PHONE et CALLMEBOT_APIKEY doivent être définis (voir .env.example).")

    for i, chunk in enumerate(split_message(text)):
        if i:
            time.sleep(3)  # CallMeBot limite la cadence
        query = urllib.parse.urlencode({"phone": phone, "text": chunk, "apikey": apikey})
        try:
            with urllib.request.urlopen(f"{API_URL}?{query}", timeout=60) as resp:
                body = resp.read().decode("utf-8", errors="replace")
        except urllib.error.HTTPError as e:
            raise RuntimeError(f"CallMeBot HTTP {e.code} : {e.read().decode('utf-8', errors='replace')[:300]}") from e
        print(f"Envoyé ({i + 1}) : {body[:120].strip()}", file=sys.stderr)


PAUSE_SECONDS = 120  # à 5, 20 et 60 s CallMeBot a regroupé les messages en une seule bulle ; à 120 s ils arrivent séparés


def send_messages(messages: list[str], pause: float = PAUSE_SECONDS) -> None:
    """Envoie chaque message séparément, avec une pause pour que CallMeBot ne les regroupe pas."""
    for i, message in enumerate(messages):
        if i:
            time.sleep(pause)
        send_whatsapp(message)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    send_whatsapp(" ".join(sys.argv[1:]) or "Test agent-sorties TOAC 🚴")
