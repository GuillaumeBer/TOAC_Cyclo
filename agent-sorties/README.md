# Agent « sorties cyclo »

Recherche les sorties cyclo ouvertes à tous autour de Toulouse, les vérifie chez les organisateurs, les enregistre dans
une base SQLite, puis les diffuse (WhatsApp, fichier, Google Sheets).

## Principe

```
rechercher ──▶ base SQLite (source de vérité) ──▶ publier (site web : data/sorties-weekend.json)
   agent                db/sorties.sqlite      ├─▶ envoyer (WhatsApp, fichier)
                                               └─▶ exporter (XLSX / CSV → Google Sheets)
```

La recherche et la diffusion sont séparées : on peut relire la base avant d'envoyer, et envoyer plusieurs fois vers
plusieurs canaux sans refaire de recherche (donc sans coût). À chaque recherche ou vérification, le fichier JSON du site web (`data/sorties-weekend.json` et `public/data/sorties-weekend.json`) est automatiquement mis à jour.

## Commandes

```bash
python agent.py rechercher --periode "dernier week-end de septembre"
python agent.py lister     --periode "dernier week-end de septembre"
python agent.py publier                                                       # met à jour le JSON du site web (/calendrier/sorties-weekend)
python agent.py envoyer    --periode "dernier week-end de septembre"          # aperçu, rien n'est envoyé
python agent.py envoyer    --periode "dernier week-end de septembre" --oui    # envoi réel
python agent.py exporter   --periode octobre                                  # XLSX / CSV pour Google Sheets
```

Périodes comprises : `prochain week-end` (défaut), `2e week-end d'octobre`, `week-end du 10 octobre`, `octobre`,
`octobre 2027`, `du 3 au 18 octobre`, `2026-10-03/2026-10-18` (2 mois maximum).

- **Recherche** : découpée par semaine, puis vérification chez chaque organisateur (édition de l'année prouvée par une citation,
  liens de tracé lus sur les pages, les affiches et les QR codes). Au-delà de 12 sorties, les suivantes ne sont pas vérifiées
  (`--max-verif`).
- **Envoi** : un message par sortie ; au-delà de 6 sorties, une synthèse d'un message par semaine. Chaque message attend 2 minutes
  (CallMeBot regroupe les messages envoyés plus vite). Une sortie déjà envoyée n'est renvoyée que si elle change ou est annulée.

## Installation

- Python 3.10+ et Claude Code connecté (aucune clé API : l'agent lance `claude -p`).
- `pip install -r requirements.txt` (optionnel : lecture des QR codes et des affiches PDF).
- `.env` (voir `.env.example`) : numéro et clé CallMeBot pour WhatsApp.

## Fichiers

| Fichier | Rôle |
|---|---|
| `agent.py` | recherche, vérification, messages, commandes |
| `periode.py` | lecture des périodes en français |
| `db.py` | base SQLite : sorties, circuits, envois par canal, historique des recherches |
| `tracking.py` | décide quoi envoyer : nouvelle sortie, vrai changement, annulation |
| `whatsapp.py` | envoi via CallMeBot |
| `export_sheet.py` | export CSV pour Google Sheets |
| `sources.md` | calendriers à consulter à chaque recherche |
