# 📖 Loire Ride Zen — Le Codex Ligérien

> Explorer, observer, raconter la Loire.

[![Codex en ligne](https://img.shields.io/website?url=https%3A%2F%2Fcodex.loireridezen.bike&up_message=en%20ligne&down_message=indisponible&style=for-the-badge&label=Codex&logo=vercel)](https://codex.loireridezen.bike/)
[![Contrat API](https://img.shields.io/github/actions/workflow/status/iamjulienjulien/loireridezen-codex/api-contract.yml?branch=main&style=for-the-badge&label=Contrat%20API&logo=openapiinitiative)](https://github.com/iamjulienjulien/loireridezen-codex/actions/workflows/api-contract.yml)
[![SDK npm](https://img.shields.io/npm/v/%40loireridezen%2Fcodex-sdk?style=for-the-badge&label=SDK&logo=npm)](https://www.npmjs.com/package/@loireridezen/codex-sdk)

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![pnpm 10](https://img.shields.io/badge/pnpm-10.33-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Vercel](https://img.shields.io/badge/Déployé_sur-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

Le **Codex Ligérien** est l’atlas éditorial de
[Loire Ride Zen](https://loireridezen.bike/). Il relie les paysages, les
patrimoines, les espèces, les savoir-faire et les récits qui accompagnent le
fleuve, du Nivernais à l’estuaire. Ici, la Loire n’est pas un simple décor :
elle est le fil qui donne une place, un contexte et une direction à chaque
donnée.

Ce dépôt contient :

- l’application web publique construite avec Next.js ;
- les catalogues éditoriaux et leurs registres ;
- l’API publique `/api/v1` et son contrat OpenAPI ;
- le SDK TypeScript officiel `@loireridezen/codex-sdk` ;
- l’Atelier du design system LRZ ;
- les contrôles de qualité, tests de contrat et scénarios Bruno.

[Ouvrir le Codex](https://codex.loireridezen.bike/) ·
[Lire la documentation](https://codex.loireridezen.bike/docs) ·
[Explorer l’API](https://codex.loireridezen.bike/api/v1) ·
[Découvrir le projet](https://codex.loireridezen.bike/a-propos)

## 🌊 La V1

La V1 marque le premier grand passage : une version cohérente, publique et
réellement explorable du Codex. Les index suivent un même courant sans perdre
leur paysage propre : présentation éditoriale, filtres issus des
métacollections, cartes métier, symboles LRZ et fiches partageables.

Le site public rassemble **7 index et 464 entrées** :

| Univers           | Index          | Entrées | Web | API V1 |
| ----------------- | -------------- | ------: | :-: | :----: |
| Le fleuve habité  | 🏰 Châteaux    |      52 | ✅  |   ✅   |
| Le fleuve habité  | 🍷 Guinguettes |     160 | ✅  |   ✅   |
| Le fleuve vivant  | 🪶 Faune       |      49 | ✅  |   ✅   |
| Le fleuve vivant  | 🌿 Flore       |      51 | ✅  |   ✅   |
| Le fleuve vivant  | 🍇 Vignobles   |      70 | ✅  |   ✅   |
| Le fleuve raconté | 🗺️ Territoires |       8 | ✅  |   ✅   |
| Le fleuve raconté | ♜ Personnages  |      74 | ✅  |   ✅   |

Trois catalogues supplémentaires préparent la suite :

| Index                 | Entrées | État actuel                             |
| --------------------- | ------: | --------------------------------------- |
| 🏘️ Villes et Villages |      39 | Catalogue en brouillon, index désactivé |
| ⚓ Vocabulaire        |      37 | Catalogue en brouillon, index désactivé |
| 🏛️ Petit patrimoine   |      23 | Catalogue en brouillon, index désactivé |

L’état web et la publication API suivent désormais la même écluse : un index
`publie` est visible dans les environnements publics et exposé par l’API ; un
index `desactive` reste hors navigation, hors routes publiques et hors API,
avec un catalogue conservé en `brouillon`.

### Parcours disponibles

- recherche, filtres et vues propres à chaque index ;
- navigation par territoires pour les Châteaux et les Guinguettes ;
- deeplinks vers les fiches avec navigation précédente/suivante :
  `/chateau/[slug]`, `/guinguette/[slug]`, `/faune/[slug]`, `/flore/[slug]`,
  `/personnage/[slug]`, `/territoire/[slug]` et `/vignoble/[slug]` ;
- partage, URL canonique, métadonnées et images Open Graph personnalisées ;
- carte commune des Châteaux et Guinguettes sous `/carte` ;
- sitemap adapté aux index et aux fonctionnalités réellement publiés.

## 🚲 Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/) **20.9 ou supérieur** ;
- [pnpm](https://pnpm.io/) **10.33.0** ;
- Git.

Le dépôt utilise exclusivement pnpm : une seule embarcation évite bien des
écarts entre les rives.

```bash
pnpm install
pnpm env:development
pnpm dev
```

Le site est alors disponible sur
[https://loireridezen-codex.test/](https://loireridezen-codex.test/), ou sur
[http://localhost:3000](http://localhost:3000) sans domaine local configuré.

`pnpm env:development` copie `.env.development` vers `.env.local`. Pour une
configuration manuelle, pars de `.env.example` :

```dotenv
CURRENT_ENV=development
SITE_URL=http://localhost:3000
```

`SITE_URL` doit être une origine HTTP ou HTTPS absolue. Elle sert notamment à
construire les URL publiques de l’API. Ne commite jamais `.env.local`.

## 🌦️ Trois environnements, trois rives

Le nouveau cycle du Codex s’organise autour de trois environnements. Chacun a
un rôle clair : construire, éprouver, puis publier.

| Environnement | URL                                                                         | Rôle                                                                        | Code et configuration                                      |
| ------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `development` | [loireridezen-codex.test](https://loireridezen-codex.test/)                 | Le chantier local : données de travail, Atelier et fonctionnalités en cours | Code d’une branche de travail, configuration `development` |
| `staging`     | [preview-codex.loireridezen.bike](https://preview-codex.loireridezen.bike/) | La répétition générale : version déployée et partageable du prochain lot    | Code de `dev`, configuration `staging`                     |
| `production`  | [codex.loireridezen.bike](https://codex.loireridezen.bike/)                 | Le Codex public : version stable, indexable et surveillée                   | Code de `main`, configuration `production`                 |

Le passage en `staging` n’est pas une simple compilation intermédiaire. C’est
l’endroit où le lot est relu dans son ensemble : contenu, navigation,
responsive, métadonnées, données publiques et contrat API.

> [!NOTE]
> `staging` est la valeur applicative utilisée par la preview. Elle exécute le
> code de `dev` dans un environnement de recette distinct de `production`, afin
> d’éprouver le prochain lot sans activer ses fonctionnalités sur le site public.

Les commandes actuellement disponibles restent :

```bash
pnpm env:development
pnpm env:production
```

Les sources de vérité sont :

- [`src/registry/indexes.ts`](src/registry/indexes.ts) pour l’identité, le
  format, l’état éditorial, le fichier de données et les environnements de
  chaque index ;
- [`src/registry/feature-flags.ts`](src/registry/feature-flags.ts) pour les
  fonctionnalités transversales et expérimentales.

Les helpers refusent une valeur de `CURRENT_ENV` absente ou inconnue. Lorsqu’un
flag est utilisé dans un composant client, `NEXT_PUBLIC_CURRENT_ENV` doit rester
aligné sur l’environnement serveur. La preview utilise `staging`, tandis que le
site public conserve `production`.

```bash
pnpm features:list
pnpm features
```

La commande `features` ouvre le gestionnaire interactif. Elle modifie le
registre : vérifie toujours le diff avant de le conserver.

## 🗺️ Architecture du dépôt

```text
.
├── bruno/codex-public-api/    # Collection de tests HTTP
├── data/                      # Catalogues éditoriaux JSON
├── docs/api/                  # Documentation source de l’API
├── packages/codex-sdk/        # SDK TypeScript publié sur npm
├── public/
│   ├── api/v1/openapi.json    # Contrat public OpenAPI
│   └── symbols/               # Illustrations et symboles LRZ
├── scripts/                   # Environnements, contrat et qualité
├── src/
│   ├── api/                   # Schémas, adaptateurs et publication API
│   ├── app/                   # Routes App Router, sitemap et robots
│   ├── components/            # Primitives et composants métier
│   ├── data-quality/          # Contrôles éditoriaux transverses
│   ├── registry/              # Index, métacollections et feature flags
│   └── types/                 # Modèles TypeScript des catalogues
├── AGENTS.md                  # Règles Next.js et convention de commits
├── CONTENT_LICENSE.md         # Licences des contenus et médias
└── package.json
```

### Flux de données

```text
data/*.json
    ↓
schémas TypeScript et Zod + contrôles de qualité
    ↓
registres éditoriaux et métacollections
    ├──→ pages, filtres, cartes et deeplinks
    └──→ adaptateurs API → OpenAPI → SDK TypeScript
```

Les catalogues restent indépendants de leurs représentations. Une même donnée
peut ainsi descendre le fil vers le site, la carte, l’API, le Passeport et une
future expérience hors ligne sans perdre sa source éditoriale.

## ✍️ Travailler sur les contenus

### Modifier une entrée

1. Identifie le catalogue dans `data/`.
2. Consulte le modèle correspondant dans `src/types/` et, s’il existe, son
   schéma dans `src/api/schemas/`.
3. Réutilise les slugs déclarés par les registres et métacollections ; ne crée
   pas une valeur libre lorsqu’un vocabulaire commun existe.
4. Ajoute les médias dans l’arborescence publique prévue sans modifier leur
   casse.
5. Vérifie le catalogue avant toute livraison.

```bash
SITE_URL=https://example.test pnpm api:data:check
```

Le contrôle transverse vérifie notamment :

- l’unicité et le format des slugs et identifiants publics ;
- les dates, coordonnées et limites du corridor ligérien ;
- l’existence, la casse et l’extension des médias ;
- la cohérence entre catalogues, registres, publication API et états
  éditoriaux.

Une `error` bloque la livraison. Une `warning` représente une dette éditoriale
encore autorisée.

### Ajouter un index

Un nouvel index demande généralement :

1. un type métier dans `src/types/` ;
2. un catalogue `data/catalogue-<index>.json` — les données secondaires restent
   décrites par des registres ou métacollections ;
3. une entrée complète dans `src/registry/indexes.ts` ;
4. une route plurielle d’index et ses composants métier ;
5. si nécessaire, une route singulière `/item/[slug]` utilisant
   `LRZCardDialog` ;
6. des symboles, métadonnées et exemples dans l’Atelier ;
7. une décision explicite de visibilité web et de publication API ;
8. les tests, le sitemap et les redirections associés.

Une route ouverte ne suffit pas à faire un index. Les sources, la cohérence des
relations et la qualité de chaque fiche font partie du voyage avant
publication.

## 🎨 Design system et Atelier

L’Atelier, accessible localement sous
[`/atelier`](http://localhost:3000/atelier), documente les fondations visuelles,
les primitives LRZ et les cartes métier.

Il sert à :

- comparer les variantes et leurs états interactifs ;
- vérifier les symboles et métacollections ;
- tester les composants avec des contrôles réels ;
- harmoniser les cartes sans effacer l’identité de chaque index ;
- valider le responsive avant intégration.

Les composants partagés fournissent une grammaire commune, jamais un moule.
Les cartes Châteaux, Guinguettes, Vignobles, Territoires, Faune, Flore et
Personnages conservent leur rythme, leur organisation et leur voix propres.

## 📡 API publique V1

L’API est publique, anonyme, gratuite et en lecture seule. Elle ne demande ni
clé ni compte.

```bash
curl --fail-with-body \
  https://codex.loireridezen.bike/api/v1/indexes
```

Elle expose actuellement **Châteaux, Faune, Flore et Vignobles**, soit
**222 entrées**.

| Route                                        | Rôle                                       |
| -------------------------------------------- | ------------------------------------------ |
| `GET /api/v1`                                | Découvrir l’API, ses licences et ses liens |
| `GET /api/v1/indexes`                        | Lister les index publiés                   |
| `GET /api/v1/indexes/{index}`                | Lire les métadonnées d’un index            |
| `GET /api/v1/indexes/{index}/entries`        | Lister ses entrées                         |
| `GET /api/v1/indexes/{index}/entries/{slug}` | Lire une entrée                            |
| `GET /api/v1/openapi.json`                   | Consulter le contrat OpenAPI 3.1.2         |

`HEAD` et `OPTIONS` sont également pris en charge. Les erreurs utilisent
`application/problem+json`.

Pour intégrer l’API, utilise la
[documentation publique](https://codex.loireridezen.bike/docs/api). Pour la
maintenir, consulte sa [source versionnée](docs/api/README.md) et la
[collection Bruno](bruno/codex-public-api/README.md).

### Contrat et non-régression

```bash
pnpm api:lint
pnpm api:test:contract
pnpm api:contract:diff
```

Le contrat est protégé par :

- la validation des réponses avec Ajv ;
- des snapshots ciblés sur les formes publiques ;
- une comparaison de compatibilité avec `oasdiff 1.17.0` ;
- le contrôle de qualité des catalogues ;
- les scénarios HTTP Bruno.

Après une évolution additive volontaire et relue, les snapshots peuvent être
mis à jour avec `pnpm api:contract:update-snapshots`. Cette commande ne rend
jamais compatible une rupture détectée par OpenAPI.

## 📦 SDK TypeScript

Le client officiel est publié sur npm sous le nom
[`@loireridezen/codex-sdk`](https://www.npmjs.com/package/@loireridezen/codex-sdk).

```bash
pnpm add @loireridezen/codex-sdk
```

```typescript
import { createCodexClient } from "@loireridezen/codex-sdk";

const codex = createCodexClient();
const response = await codex.entries.list("faune");
```

Le cœur du SDK est indépendant de React et Next.js. Il est compatible avec les
environnements Expo/React Native qui fournissent les standards web nécessaires.
Les types sont générés depuis OpenAPI.

```bash
pnpm sdk:generate
pnpm sdk:check
pnpm sdk:build
pnpm sdk:test
```

La documentation complète se trouve dans
[`packages/codex-sdk/README.md`](packages/codex-sdk/README.md) et sur
[le site public](https://codex.loireridezen.bike/docs/sdk).

## 🧰 Commandes utiles

| Commande                   | Effet                                            |
| -------------------------- | ------------------------------------------------ |
| `pnpm dev`                 | Lance le serveur Next.js en développement        |
| `pnpm build`               | Produit la version optimisée                     |
| `pnpm start`               | Lance une version déjà compilée                  |
| `pnpm env:development`     | Active la configuration locale de développement  |
| `pnpm env:production`      | Active la configuration locale de production     |
| `pnpm features:list`       | Affiche les feature flags                        |
| `pnpm test`                | Exécute la suite Vitest                          |
| `pnpm lint`                | Analyse le code avec ESLint                      |
| `pnpm format`              | Formate le dépôt avec Prettier                   |
| `pnpm format:check`        | Vérifie le formatage                             |
| `pnpm exec tsc --noEmit`   | Vérifie les types TypeScript                     |
| `pnpm check`               | Exécute la quality gate complète                 |
| `pnpm api:data:check`      | Contrôle la qualité éditoriale                   |
| `pnpm api:docs:check`      | Vérifie la documentation développeur             |
| `pnpm api:lint`            | Valide le contrat OpenAPI                        |
| `pnpm api:test:contract`   | Vérifie les réponses et snapshots publics        |
| `pnpm api:contract:diff`   | Détecte les ruptures du contrat                  |
| `pnpm api:test:local`      | Teste l’API locale avec Bruno                    |
| `pnpm api:test:production` | Teste l’API complète en production               |
| `pnpm api:test:smoke`      | Exécute le parcours critique de production       |
| `pnpm sdk:check`           | Vérifie génération, types, tests et build du SDK |

## 🚦 Le nouveau rythme des livraisons

La V1 s’est construite au fil de l’eau, directement et parfois au plus près de
la production. Ce rythme avait une vertu : il fallait d’abord découvrir la
forme du Codex en le faisant vivre. Le cap est désormais assez net pour adopter
des livraisons plus calmes, regroupées et versionnées.

```text
branche de travail
        ↓
development
        ↓
dev → preview Vercel
        ↓
validation visuelle, éditoriale et technique
        ↓
main → production
        ↓
smoke test de production
```

### Rôle des branches

- `main` représente la production stable ;
- `dev` rassemble le prochain lot cohérent et alimente la preview de référence ;
- les branches de travail partent de `dev` et y reviennent par pull request ;
- les previews de branche permettent d’observer un changement isolé avant de
  le réunir au lot ;
- un hotfix de production part de `main`, puis est resynchronisé vers `dev`.

### Préparer un lot

1. Définir l’intention et le périmètre de la livraison.
2. Développer sur une branche issue de `dev`.
3. Ouvrir une pull request vers `dev` et vérifier sa preview.
4. Exécuter les contrôles proportionnés au changement.
5. Regrouper les changements validés et attribuer une version au lot.
6. Fusionner `dev` vers `main` pour la promotion en production.
7. Vérifier le domaine canonique et le smoke test de l’API.
8. Consigner les jalons importants dans la Chronicle du Codex.

Une livraison doit raconter quelque chose de compréhensible. Mieux vaut une
étape courte et cohérente qu’une pluie de modifications sans halte ni repère.

## ✅ Vérifications avant livraison

Pour tout changement :

```bash
pnpm format:check
pnpm lint
pnpm test
pnpm exec tsc --noEmit
```

Ajoute selon le périmètre :

```bash
# Données et contenus publiés
SITE_URL=https://example.test pnpm api:data:check

# API publique ou adaptateurs
pnpm api:lint
pnpm api:test:contract
pnpm api:contract:diff

# SDK
pnpm sdk:check

# Validation finale du lot
pnpm build
```

Après la mise à l’eau, `API production monitor` contrôle automatiquement le
domaine canonique et relance jusqu’à trois fois le smoke test avant de signaler
un incident.

## 🪨 Conventions techniques

- Next.js **16.2.10**, App Router et React **19.2** ;
- TypeScript strict ;
- composants serveur par défaut, composants client pour l’interactivité ;
- CSS Modules pour les composants et Tailwind CSS pour les utilitaires globaux ;
- Prettier comme source de vérité du formatage ;
- indentation de quatre espaces, guillemets doubles et points-virgules ;
- alias `@/*` vers `src/*` et `@data/*` vers `data/*` ;
- données éditoriales séparées du rendu et du contrat public.

Cette version de Next.js comporte des changements importants. Avant de modifier
une API ou une convention du framework, consulte la documentation embarquée
dans `node_modules/next/dist/docs/`, conformément à [`AGENTS.md`](AGENTS.md).

Les commits suivent la convention LRZ :

```text
[LRZ-CODEX] <emoji> <scope> > <imperative summary in English> > 🤠 Julien
```

## 🤝 Contribuer

Une contribution peut être technique, graphique ou éditoriale :

- corriger ou sourcer une information ;
- enrichir les relations entre les fiches ;
- dessiner un symbole ou une illustration LRZ ;
- améliorer l’accessibilité et le responsive ;
- renforcer l’API, le SDK ou les contrôles de qualité ;
- proposer un index, une collection ou un dossier éditorial.

Garde les changements ciblés, préserve les travaux déjà sur la rive et
documente les décisions qui affectent durablement les catalogues ou le contrat
public. Le Codex avance par liens patients, pas par accumulation pressée.

## 📜 Licences

Le dépôt distingue trois périmètres :

- le **code source** et la documentation technique sont distribués sous
  [licence MIT](LICENSE) ;
- les **textes et données** sont proposés sous
  [CC BY-NC-SA 4.0](CONTENT_LICENSE.md#textes-et-données) ;
- les **illustrations, symboles LRZ et éléments de marque** restent protégés —
  tous droits réservés.

Consulte [`CONTENT_LICENSE.md`](CONTENT_LICENSE.md) avant toute réutilisation de
contenu ou de média.

**Loire Ride Zen** — prendre le temps de suivre le fleuve. 🌊

---

## 👋 À propos du développeur

**Julien Julien**<br />
_Développeur web & créateur de projets narratifs._

Je conçois des applications et des outils numériques durables, où le code, la
structure et le récit avancent ensemble.<br />
J'aime les projets clairs, évolutifs, pensés pour le temps long plutôt que pour
l'instantané.

📍 Angers, France 🇫🇷<br />
🌍 <https://julienjulien.fr>
