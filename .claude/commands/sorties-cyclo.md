Recherche et met à jour les sorties cyclo, gravel et VTT des 4 prochaines semaines (fenêtre glissante) autour de Toulouse, met à jour la base SQLite (`agent-sorties/db/sorties.sqlite`) et publie les résultats sur le site web (`data/sorties-weekend.json` et `public/data/sorties-weekend.json`).

Exécute la commande suivante (ou passe `--periode "$ARGUMENTS"` si un argument est fourni) :

```bash
python agent-sorties/agent.py rechercher --periode "${ARGUMENTS:-4 prochaines semaines}"
```

Puis affiche le récapitulatif avec :

```bash
python agent-sorties/agent.py lister --periode "${ARGUMENTS:-4 prochaines semaines}"
```
