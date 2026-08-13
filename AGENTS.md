# Guide du dépôt

## Gestionnaire de paquets

Ce projet utilise **pnpm** exclusivement. Ne jamais utiliser `npm` ou `yarn`.

- Installer les dépendances : `pnpm install`
- Ajouter un paquet : `pnpm add <pkg>` / `pnpm add -D <pkg>` (dev)
- Lancer un script : `pnpm <script>` (ex. `pnpm dev`, `pnpm build`, `pnpm lint`)
- Exécuter un binaire : `pnpm exec <bin>` (ex. `pnpm exec prettier ...`)

## Architecture des composants

Les composants réutilisables résident dans `src/components`. Utiliser les dossiers spécialisés suivants :

- `_ui` pour les composants génériques du design system `LRZ*` ;
- `_cards` pour les cartes métier des index ;
- `_layout` pour les éléments structurels de page ;
- `_shells` pour les coquilles de pages ;
- `_maps` pour les composants et outils cartographiques ;
- `_atelier` pour les composants propres à l’Atelier ;
- `_docs` pour les composants propres à la documentation.

Chaque composant doit être rangé dans un dossier portant son nom en PascalCase. Ce dossier doit contenir un barrel `index.ts`. Importer préférentiellement le composant depuis ce barrel plutôt que depuis son fichier d’implémentation.

## Responsabilité de `src/app`

Réserver `src/app` aux routes, layouts Next.js, métadonnées et assemblages de pages. Tout composant réutilisable doit être placé dans `src/components`, dans le domaine approprié.

## Données et catalogues

- Les catalogues résident dans `data/`.
- Leur nom suit la convention `catalogue-<nom-pluriel>.json`, sauf pour les noms invariables comme `faune`, `flore` et `patrimoine`.
- Les valeurs contrôlées de métadonnées proviennent des registres et métacollections existants.
- Ne pas dupliquer ni écrire en dur dans les composants une valeur déjà décrite par un registre.

## Fichiers générés

Ne pas modifier isolément les fichiers générés de l’API, du schéma OpenAPI ou du SDK. Modifier leur source de vérité, puis utiliser la commande de génération correspondante documentée par le projet.

## Formatage et validation

Prettier est la source de vérité du style. L’indentation est de **4 espaces** (voir `.prettierrc.json`).

- Formater tout : `pnpm format`
- Vérifier le formatage : `pnpm format:check`
- Vérifier le lint : `pnpm lint`
- Vérifier TypeScript : `pnpm exec tsc --noEmit`

Après une modification structurelle, exécuter au minimum les trois vérifications de formatage, lint et typage. Lancer les tests ciblés lorsqu’un composant ou un domaine en possède. Ne lancer le build complet que lorsqu’il est pertinent pour la livraison ou explicitement demandé.

## Messages de commit

Respecter exactement la convention de commit LRZ du dépôt :

```text
[LRZ-CODEX] <emoji> <scope> > <imperative summary in English> > 🤠 Julien
```

- Conserver le message sur une seule ligne.
- Utiliser un scope court en minuscules, en kebab-case si nécessaire.
- Rédiger le résumé en anglais, en commençant par un verbe impératif en minuscule et sans point final.
- Choisir l’émoji qui correspond le mieux au changement : `✨` fonctionnalité, `🐛` correction, `🎨` design ou interface, `♻️` refactorisation ou migration, `🧪` tests ou Atelier, `📝` documentation, `📚` données, `🔍` SEO, `🔒` sécurité ou visibilité, `🚀` activation en production, `🔗` liens, `🧱` architecture, `🧹` nettoyage.
- Consulter les derniers messages avec `git log` en cas de doute sur le scope ou l’émoji à employer.

Exemple :

```text
[LRZ-CODEX] 🎨 guinguettes > align index filters with chateaux > 🤠 Julien
```

## Messages de tags de version

Créer les versions avec un tag annoté dont le message respecte exactement ce format :

```text
Le Codex Ligérien · V<version> — <nom de la version>
```

- Écrire la version complète au format SemVer, préfixée par `V` dans le message.
- Conserver les séparateurs `·` et `—`, ainsi que les espaces qui les entourent.
- Rédiger le nom de la version en français, avec une majuscule initiale et sans point final.

Exemple :

```text
Le Codex Ligérien · V1.1.0 — Comprendre l’usage du Codex
```

## Contenu des releases de version

Rédiger chaque release en français, dans le ton éditorial du Codex et de Loire Ride Zen. Utiliser cette structure comme modèle :

Nommer la GitHub Release selon ce format exact, sans sous-titre :

```text
Le Codex Ligérien · V<version>
```

Exemple : [Le Codex Ligérien · V1.0.0](https://github.com/iamjulienjulien/loireridezen-codex/releases/tag/v1.0.0).

```markdown
# Le Codex Ligérien · V<version>

<Phrase courte annonçant la mise en ligne et la portée de la version.>

<Présentation synthétique de la version et de sa place dans le voyage du Codex.>

## Cette V<version majeure ou mineure> embarque

- <Fonctionnalité ou contenu marquant>
- <Fonctionnalité ou contenu marquant>
- <Fonctionnalité ou contenu marquant>

## Sous la ligne de flottaison

<Résumé des travaux techniques, structurels, éditoriaux ou de stabilisation moins visibles.>

<Évolution du projet, du workflow ou prochaine direction ouverte par cette version.>

**Prendre le temps de suivre le fleuve.**

[[Explorer le Codex](https://codex.loireridezen.bike/)] · [[Découvrir Loire Ride Zen](https://loireridezen.bike/)]
```

- Commencer par un titre limité au nom du projet et au numéro complet de version.
- Présenter d’abord la valeur visible et éditoriale de la livraison.
- Regrouper les apports principaux sous `Cette V… embarque` avec une liste concise.
- Réserver `Sous la ligne de flottaison` aux travaux techniques, structurels et de stabilisation.
- Terminer systématiquement par la signature du projet et les liens vers le Codex et Loire Ride Zen.
- Adapter le libellé `Cette V… embarque` au niveau raconté par la release, par exemple `Cette V1 embarque` pour une version fondatrice ou `Cette V1.1 embarque` pour une livraison mineure.

Exemple de référence :

```markdown
# Le Codex Ligérien · V1.0.0

La première version stable du Codex Ligérien est en ligne.

Le Codex est un atlas éditorial vivant imaginé par Loire Ride Zen pour explorer les paysages, les patrimoines, le vivant et les récits qui accompagnent la Loire.

## Cette V1 embarque

- Sept index publiés : Châteaux, Guinguettes, Faune, Flore, Vignobles, Territoires et Personnages
- Des fiches accessibles par leurs propres URLs
- Une navigation transversale entre les univers du Codex
- Une carte interactive des châteaux et des guinguettes
- Des métacollections, symboles et composants visuels propres à Loire Ride Zen
- Des images Open Graph personnalisées
- Une API publique documentée et son SDK TypeScript
- Un sitemap complet et une architecture éditoriale prête pour la suite

## Sous la ligne de flottaison

Cette version clôt également un important travail de stabilisation : sécurité, publication, contrat API, tests, contrôle éditorial, architecture du dépôt, erreurs, analytics et documentation.

Le Codex quitte désormais son cycle de construction directe sur `main`. Les prochaines évolutions passeront par une branche de développement, une preview de validation et des livraisons versionnées.

**Prendre le temps de suivre le fleuve.**

[[Explorer le Codex](https://codex.loireridezen.bike/)] · [[Découvrir Loire Ride Zen](https://loireridezen.bike/)]
```
