---
name: sorties-cyclo
description: >-
  Rechercher, vérifier et mettre à jour les sorties cyclo, gravel et VTT des 4 prochaines semaines
  (fenêtre glissante) autour de Toulouse pour le TOAC Cyclo. Utiliser cette skill dès que l'utilisateur
  demande de lancer l'agent sorties, de chercher les sorties des week-ends à venir, ou d'actualiser
  la sous-page /calendrier/sorties-weekend depuis Antigravity (avec Gemini 4 Argon) ou Claude Code.
---

# Agent Sorties Cyclo (Antigravity / Gemini 4 Argon & Claude Code)

Cet agent maintient à jour les sorties cyclo, gravel et VTT ouvertes à tous autour de Toulouse (~60 km) sur une **fenêtre glissante de 4 semaines** (`4 prochaines semaines` par défaut), stockées dans `agent-sorties/db/sorties.sqlite` et publiées automatiquement sur la page `/calendrier/sorties-weekend` (`data/sorties-weekend.json` et `public/data/sorties-weekend.json`).

## Exécution depuis l'interface Antigravity (avec Gemini 4 Argon)

Lorsque l'utilisateur te demande de chercher ou mettre à jour les sorties depuis l'interface Antigravity, **n'appelle pas `claude -p`**. Exécute les 4 étapes suivantes directement avec tes outils Antigravity (et tes sous-agents `research` en `Model: 'inherit'` pour utiliser **Gemini 4 Argon**) :

### Étape 1 : Préparer la fenêtre glissante et récupérer les sorties déjà en base
Lance la commande :
```powershell
python agent-sorties/agent.py preparer --periode "4 prochaines semaines"
```
*(Si l'utilisateur a précisé une autre période, passe `--periode "<période>"`).*
Cette commande renvoie un JSON contenant :
- `periode` (`start`, `end`, `describe`)
- `chunks` : le découpage semaine par semaine avec le `user_prompt` exact (incluant `agent-sorties/sources.md`)
- `existing_in_db` : les sorties déjà en base sur cette période (à revérifier systématiquement pour mettre à jour horaires, circuits, tracés ou annulations)
- `system_prompt`, `enrich_system_prompt`, `poster_system_prompt`

### Étape 2 : Passe 1 & Passe 2 en parallèle avec Gemini 4 Argon (`invoke_subagent`)
Invoque des sous-agents `research` en parallèle (`TypeName: 'research'`, `Model: 'inherit'`) pour :
1. **Découvrir toutes les sorties** sur chaque semaine (`chunks`) en consultant toutes les sources de `agent-sorties/sources.md` (`cyclotourisme-31.com`, `velo-occitanie.fr`, `haute-garonne.ffvelo.fr`, `gravelpassion.fr`, `vttrando.fr`, comités 31/32/81/82/09) avec `search_web` et `read_url_content`.
2. **Revérifier systématiquement toutes les sorties trouvées ET celles déjà présentes dans `existing_in_db`** directement sur le site de chaque club organisateur (selon les règles strictes de `enrich_system_prompt` : citation exacte `preuve_date` prouvant l'année de l'édition, horaires RDV/départ, adresse précise, tarifs, fédération, circuits et liens de tracés OpenRunner/Strava/Komoot, URLs d'affiches PDF/images).

### Étape 3 : Passe 3 — Lecture des affiches PDF / images et QR codes (si des circuits n'ont pas de lien de tracé)
Si une sortie vérifiée possède des URLs d'affiches (`affiches`) et qu'il manque des liens de tracé :
1. Télécharge les affiches, convertis les PDF en PNG et décode les QR codes via :
   ```powershell
   python agent-sorties/agent.py affiches --lieu "<commune>" --urls "<url1>" "<url2>"
   ```
2. Lis les images PNG générées avec `view_file` selon `poster_system_prompt` pour relever les numéros de parcours OpenRunner imprimés et vérifier leurs pages.

### Étape 4 : Ingestion déterministe, contrôle OpenRunner, mise à jour SQLite et publication sur le site
1. Écris le résultat JSON consolidé dans `agent-sorties/output/antigravity-result.json` au format :
   ```json
   {
     "sorties": [ ... ],
     "enrichments": [ ... ]
   }
   ```
2. Lance la commande d'ingestion déterministe :
   ```powershell
   python agent-sorties/agent.py ingerer --periode "4 prochaines semaines" --fichier "agent-sorties/output/antigravity-result.json"
   ```
   Cette commande :
   - Applique le filtre déterministe (`filter_sorties` : rayon <= 65 km, `type == "ouverte"`, dans la période) ;
   - Fusionne et écrase les anciennes informations avec les nouvelles informations vérifiées chez les organisateurs (`merge_enrichment`) ;
   - Interroge automatiquement OpenRunner (`traces.py`) pour vérifier la distance, le dénivelé et l'année du titre de chaque tracé ;
   - Met à jour `agent-sorties/db/sorties.sqlite` ;
   - Régénère `data/sorties-weekend.json` et `public/data/sorties-weekend.json` sur la **fenêtre glissante des 4 prochaines semaines**.

---

## Vision à 6 mois

Avec la période par défaut (`4 prochaines semaines`), `python agent-sorties/agent.py rechercher` fait en plus un repérage **allégé** (sans vérification chez les organisateurs, `--max-verif 0`) des dates annoncées jusqu'à 26 semaines, par tranches de 8 semaines. Ces sorties apparaissent dans le calendrier « Et dans les 6 prochains mois » de la page, marquées « à confirmer ». `--sans-horizon` désactive cette étape.

---

## Autres commandes utiles (communes à Antigravity et Claude Code)

- **Lister les sorties des 4 prochaines semaines en base** :
  ```powershell
  python agent-sorties/agent.py lister
  ```
- **Re-publier la fenêtre glissante de 4 semaines vers le site web** :
  ```powershell
  python agent-sorties/agent.py publier
  ```
- **Aperçu / envoi des notifications WhatsApp** :
  ```powershell
  python agent-sorties/agent.py envoyer
  ```
- **Export Excel (.xlsx) mis en forme (4 onglets)** :
  ```powershell
  python agent-sorties/agent.py exporter
  ```
