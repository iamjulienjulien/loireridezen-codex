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
