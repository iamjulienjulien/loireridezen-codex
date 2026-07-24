# Collection Bruno — API publique du Codex

Cette collection teste l’API publique V1 du Codex comme un consommateur HTTP
anonyme. Elle complète le contrat
[`public/api/v1/openapi.json`](../../public/api/v1/openapi.json) avec des
scénarios exécutables, maintenus manuellement et strictement en lecture seule.

## Prérequis

- Node.js 20.9 ou supérieur ;
- pnpm et les dépendances du dépôt installées ;
- Bruno Desktop 3.0.0 ou supérieur pour l’interface graphique ;
- le serveur Next.js sur `http://localhost:3000` pour les tests locaux.

## Installation

Depuis la racine du dépôt :

```bash
pnpm install
```

## Exécution locale

Dans un premier terminal :

```bash
pnpm dev
```

Dans un second terminal :

```bash
pnpm api:test:local
```

## Exécution en production

La collection ne contient aucune mutation et peut être exécutée intégralement :

```bash
pnpm api:test:production
```

Pour une vérification rapide :

```bash
pnpm api:test:smoke
```

## Surveillance de production

Le tag `smoke` sélectionne sept parcours représentatifs :

1. la racine de l’API ;
2. le contrat OpenAPI ;
3. la liste des index ;
4. le détail de l’index Faune ;
5. la liste des entrées Faune ;
6. le détail du Héron cendré ;
7. la réponse `404` d’un index non publié.

Le workflow
[`API production monitor`](../../.github/workflows/api-production-monitor.yml)
exécute `pnpm api:test:smoke` après une promotion Vercel, toutes les 30 minutes
et à la demande. Cette commande cible toujours le domaine canonique
`https://codex.loireridezen.bike`, jamais une URL Preview.

Après trois échecs, le run GitHub devient rouge et publie pendant sept jours un
rapport JSON Bruno minimal. Ce rapport conserve les scénarios, statuts et
assertions nécessaires au diagnostic, mais omet tous les en-têtes et tous les
corps HTTP. Il ne doit jamais être enrichi avec un token, un cookie, un secret
ou une variable d’environnement.

Le lancement manuel propose `simulate_failure`. Sa valeur par défaut est
`false`. La valeur `true` exécute les vrais smoke tests, puis produit
volontairement trois échecs afin de valider les retries, l’artefact et les
notifications GitHub. Le workflow sera volontairement rouge et peut déclencher
un e-mail GitHub.

### Mini-runbook d’incident

1. Ouvrir le run GitHub en échec et lire son résumé pour identifier le
   déclencheur.
2. Télécharger l’artefact JSON du run.
3. Identifier la première requête ou assertion en échec.
4. Vérifier le déploiement Vercel associé.
5. Relancer manuellement le workflow, avec `simulate_failure` désactivé.
6. Si l’échec persiste, vérifier directement
   `https://codex.loireridezen.bike/api/v1` et
   `https://codex.loireridezen.bike/api/v1/openapi.json`.
7. Corriger la cause ou revenir au dernier déploiement sain.

## Utilisation avec Bruno Desktop

1. Ouvrir le dossier `bruno/codex-public-api`.
2. Sélectionner l’environnement `local` ou `production`.
3. Lancer une requête ou le Collection Runner.
4. Consulter le corps, les en-têtes et les assertions dans leurs panneaux.

La collection est organisée en quatre familles : découverte de l’API, index,
entrées et erreurs publiques.

## Contribution

- ajouter une requête pour chaque nouvelle route publique ;
- revoir la collection après toute évolution du contrat ;
- ne jamais écraser la collection finale par une nouvelle génération OpenAPI ;
- ne jamais committer de secret ;
- réserver `production-safe` aux requêtes sans mutation ;
- vérifier les structures et relations sans figer les volumes éditoriaux.

## Dépannage

- **Connexion locale refusée :** vérifier que `pnpm dev` écoute bien sur le
  port 3000.
- **URL incorrecte :** sélectionner l’environnement Bruno attendu.
- **Collection non reconnue :** utiliser Bruno Desktop 3.0.0 ou supérieur et
  Bruno CLI 3.5.2.
- **Cache différent :** Vercel peut consommer des directives destinées au CDN ;
  les tests ne dépendent que de `public` et `max-age=300`. Le contrat OpenAPI
  statique utilise une politique distincte.
- **Assertion en échec :** relancer avec `pnpm exec bru run --verbose` depuis
  ce dossier pour inspecter le scénario et sa réponse.
