# 🌊 Loire Ride Zen — Le Codex ligérien

> Un carnet vivant du fil, de la source à l’Atlantique.

Le **Codex ligérien** rassemble les êtres, les lieux, les savoir-faire et les
mots qui vivent autour de la Loire. On y croise une loutre à l’aube, une
fritillaire dans une prairie humide, un château posé sur le Cher, un chenin sur
tuffeau… et quelques termes de marinier sauvés des eaux.

Ce dépôt contient l’application web du Codex : une collection d’index
éditoriaux consultables, filtrables et illustrés, construite avec Next.js.

## 🧭 Ce que contient le Codex

| Index          | Contenu                                     | Entrées | Disponible en production |
| -------------- | ------------------------------------------- | ------: | :----------------------: |
| 🪶 Faune       | Oiseaux, mammifères, poissons, reptiles…    |      49 |            ✅            |
| 🌿 Flore       | Arbres, herbacées, plantes aquatiques…      |      51 |            ✅            |
| 🏰 Châteaux    | Forteresses et demeures du Val de Loire     |      28 |            ✅            |
| 🍷 Vignobles   | Appellations et crus du bassin ligérien     |      70 |            —             |
| ⚓️ Vocabulaire | Mots du fleuve et de la marine de Loire     |      37 |            —             |
| 🏛 Patrimoine   | Ponts, ports, moulins et ouvrages du fleuve |      23 |            —             |

Soit **258 entrées** à explorer — et le fleuve n’a pas dit son dernier mot.

Chaque index propose notamment :

- une recherche textuelle ;
- des filtres propres à son sujet ;
- des cartes repliables et dépliables ;
- quatre ambiances visuelles : aube, jour, soir et nuit ;
- une navigation commune générée depuis un registre central.

## 🚲 Embarquement rapide

### Prérequis

- [Node.js](https://nodejs.org/) **20.9 ou supérieur** ;
- [pnpm](https://pnpm.io/) ;
- une curiosité raisonnable pour les hérons et les châteaux.

Ce projet utilise **pnpm exclusivement**. Pas de `npm`, pas de `yarn` : chacun
sa rive.

### Installation

```bash
pnpm install
```

Crée ensuite un fichier `.env.local` à la racine :

```dotenv
CURRENT_ENV=development
SITE_URL=https://codex.example.com
```

`SITE_URL` doit être une URL HTTP ou HTTPS absolue. Elle sert à construire les
URL publiques des illustrations dans l’API.

Puis lance le serveur de développement :

```bash
pnpm dev
```

Le Codex est alors accessible sur
[http://localhost:3000](http://localhost:3000).

## 🌦 Environnements

`CURRENT_ENV` détermine les index visibles sur l’accueil et dans la navigation.
La liste autorisée pour chaque index se trouve dans
[`src/registry/indexes.ts`](src/registry/indexes.ts).

| Valeur        | Comportement actuel                             |
| ------------- | ----------------------------------------------- |
| `development` | Affiche les six index et le lien vers l’Atelier |
| `production`  | Affiche la Faune, la Flore et les Châteaux      |

Si aucun index ou un seul index est disponible, la navigation du header est
automatiquement masquée.

La configuration est volontairement stricte : une valeur absente ou différente
de `development` et `production` provoque une erreur explicite au démarrage.

> [!NOTE]
> Masquer un index dans la navigation ne bloque pas encore l’accès direct à son
> URL. Le filtrage actuel porte sur l’interface, pas sur l’autorisation des
> routes.

## 🗺 Carte du territoire

```text
.
├── data/                       # Les six catalogues éditoriaux en JSON
├── public/
│   └── emoji/                  # Illustrations LRZ par collection
├── src/
│   ├── app/
│   │   ├── atelier/            # Laboratoire de composants (développement)
│   │   ├── chateaux/           # Page, index, carte et styles
│   │   ├── faune/
│   │   ├── flore/
│   │   ├── patrimoine/
│   │   ├── vignobles/
│   │   └── vocabulaire/
│   ├── components/             # Header, contrôles, présentation et footer
│   ├── registry/               # Registres des index et des couleurs
│   └── types/                  # Modèles TypeScript des catalogues
├── AGENTS.md                   # Consignes spécifiques à Next.js 16
└── package.json
```

### Le flux d’une page

```text
data/*.json
    ↓
app/<index>/page.tsx            composant serveur, lecture de CURRENT_ENV
    ↓
<Index>                         recherche, filtres et état interactif
    ↓
IndexHeader + Cards + Footer    présentation partagée
```

Le fichier [`src/registry/indexes.ts`](src/registry/indexes.ts) est la source de
vérité pour :

- les routes et libellés des index ;
- leur couleur et leur symbole ;
- leurs textes de présentation ;
- leur fichier de données ;
- leur disponibilité par environnement.

## ✍️ Ajouter ou modifier une entrée

1. Repère le catalogue concerné dans `data/`.
2. Consulte son modèle dans `src/types/`.
3. Ajoute ou modifie l’objet JSON en respectant les valeurs attendues.
4. Si l’entrée possède une illustration LRZ, dépose-la dans
   `public/emoji/<index>/` et renseigne `customEmoji`.
5. Lance les contrôles de qualité avant de proposer la modification.

Exemple très simplifié :

```json
{
    "emoji": "🦦",
    "customEmoji": "/emoji/faune/loutre-d-europe.png",
    "type": "mammifère",
    "nomCommun": "Loutre d’Europe",
    "nomScientifique": "Lutra lutra",
    "rarete": "trésor",
    "sousTitre": "la discrète du petit matin"
}
```

Les vrais modèles contiennent davantage de champs : cet exemple montre le
principe, pas un objet complet à copier tel quel.

### Ajouter un nouvel index

Un nouvel affluent du Codex demande généralement :

1. un fichier de données dans `data/` ;
2. un type dans `src/types/` ;
3. une route dans `src/app/<index>/` avec sa page, son composant interactif, ses
   cartes et ses styles ;
4. une entrée dans `src/registry/indexes.ts` ;
5. éventuellement un dossier d’illustrations dans `public/emoji/` ;
6. des spécimens dans l’Atelier pour comparer les variantes visuelles.

## 🎨 L’Atelier

[`/atelier`](http://localhost:3000/atelier) est le laboratoire du Codex. Il
rassemble les variantes des six familles de cartes avec des données de
démonstration.

Il sert à :

- comparer rapidement plusieurs versions d’un composant ;
- vérifier les états ouverts et fermés ;
- éprouver la cohérence visuelle entre les collections ;
- bricoler sans déranger les hérons en production.

Le lien vers l’Atelier n’est affiché sur l’accueil qu’en environnement
`development`.

## API publique

La V1 de l’API publique est disponible en lecture seule sous `/api/v1`.
Elle expose les index dont la propriété `etat` vaut `publie`, indépendamment de
leur visibilité web définie par `env`.

```text
GET /api/v1
GET /api/v1/indexes
GET /api/v1/indexes/{index}
GET /api/v1/indexes/{index}/entries
GET /api/v1/indexes/{index}/entries/{slug}
```

Exemple :

```bash
curl https://codex.loireridezen.bike/api/v1/indexes/faune/entries/heron-cendre
```

Le contrat externe est publié au format **OpenAPI 3.1.2** :

```text
https://codex.loireridezen.bike/api/v1/openapi.json
http://localhost:3000/api/v1/openapi.json
```

Ce document JSON peut être importé dans Bruno ou dans tout autre client
compatible OpenAPI. L’URL de production est déclarée comme serveur canonique ;
un client local peut la remplacer par `http://localhost:3000`.

Les schémas Zod de `src/api/schemas/` valident les catalogues éditoriaux
internes. Le document OpenAPI décrit séparément les DTO réellement exposés aux
consommateurs. Toute modification du format public doit mettre à jour le
contrat et ses tests.

Pour valider le contrat :

```bash
pnpm api:lint
pnpm api:test:contract
pnpm api:contract:diff
```

La non-régression repose sur trois garde-fous complémentaires : Ajv vérifie les
réponses des Route Handlers contre l’OpenAPI courant, des snapshots ciblés
rendent les changements de structure visibles, puis `oasdiff` compare le
contrat à sa base Git. Ces contrôles sont locaux et n’appellent jamais la
production.

`pnpm api:contract:diff` exige exactement
[`oasdiff 1.17.0`](https://github.com/oasdiff/oasdiff/releases/tag/v1.17.0)
dans le `PATH`. Un échec Ajv indique la route, le statut, le schéma et le chemin
JSON concernés ; un échec de snapshot signale une forme publique modifiée ;
un échec `oasdiff` indique une rupture avérée ou potentielle de compatibilité.

Après revue explicite d’un ajout public volontaire, les snapshots peuvent être
mis à jour localement avec :

```bash
pnpm api:contract:update-snapshots
```

Cette commande n’est jamais exécutée en CI. Mettre à jour un snapshot ne rend
pas une rupture OpenAPI compatible : le diff `oasdiff` reste bloquant pour les
niveaux `WARN` et `ERR`.
Le fichier `oasdiff-levels.txt` renforce sa politique par défaut pour traiter
notamment la suppression d’une réponse d’erreur, la réduction d’une enum et le
passage d’un champ facultatif à obligatoire comme des ruptures de la V1.
Le wrapper compense également une limite vérifiée d’`oasdiff 1.17.0` : il
compare les contraintes JSON Schema et bloque les bornes numériques ou de
taille durcies, ainsi que l’ajout ou le changement de `pattern`, `multipleOf`
et `uniqueItems`.

### Qualité des données éditoriales

Les schémas Zod valident la structure propre à chaque catalogue. Le contrôle
qualité transverse vérifie en complément la cohérence entre registres,
catalogues, API et fichiers médias :

- unicité et format des slugs, hrefs, fichiers et identifiants publics ;
- dates réelles, non futures, au format `YYYY-MM-DD` ;
- coordonnées dans le corridor ligérien (`44.5–48.5` de latitude,
  `-2.5–5.0` de longitude), avec avertissement à moins de `0.25°` d’une limite ;
- chemins médias sûrs, casse exacte, existence et extensions `.png`, `.webp`
  ou `.svg` ;
- cohérence de l’état de publication, des sources techniques et des entrées
  réellement exposées.

```bash
SITE_URL=https://example.test pnpm api:data:check
```

La commande inspecte uniquement le dépôt local et ne fait aucun appel réseau.
Une `error` bloque la CI ; une `warning` signale une dette éditoriale autorisée.
Ainsi, une illustration manque encore légitimement sur une entrée WIP, tandis
qu’elle est obligatoire dès publication. Les codes stables affichés dans le
rapport sont définis dans
[`src/data-quality/types.ts`](src/data-quality/types.ts) et permettent de
retrouver précisément la règle concernée.

Après le premier run vert du workflow `API contract`, ajoutez son check stable
aux contrôles requis de la branche `main` dans les règles ou la protection de
branche. Vérifiez ensuite qu’une pull request rouge ne peut pas être fusionnée.
Cette configuration GitHub reste manuelle.

Une collection Bruno versionnée couvre les routes publiques, CORS, le cache,
les licences et les erreurs. Consultez son
[guide de prise en main](bruno/codex-public-api/README.md).

```bash
pnpm api:test:local
pnpm api:test:production
pnpm api:test:smoke
```

### Surveillance de production

Le workflow
[`API production monitor`](.github/workflows/api-production-monitor.yml)
réutilise `pnpm api:test:smoke` après chaque promotion Vercel en production,
toutes les 30 minutes et à la demande. Il contrôle exclusivement le domaine
canonique, sans secret ni service de monitoring supplémentaire.

Après trois échecs, GitHub Actions conserve pendant sept jours un rapport
minimal et signale le job en erreur. Les notifications GitHub et e-mail
configurées sur le dépôt assurent l’alerte. Le
[README Bruno](bruno/codex-public-api/README.md#surveillance-de-production)
détaille les parcours surveillés et la procédure d’incident.

Les données textuelles et les illustrations n’ont pas la même politique de
réutilisation. Consultez [`CONTENT_LICENSE.md`](CONTENT_LICENSE.md) pour le
détail des licences et de l’attribution.

## 🧰 Commandes utiles

| Commande                   | Effet                                           |
| -------------------------- | ----------------------------------------------- |
| `pnpm dev`                 | Lance le serveur de développement               |
| `pnpm build`               | Produit la version optimisée                    |
| `pnpm start`               | Lance une version déjà compilée                 |
| `pnpm test`                | Exécute les tests automatisés                   |
| `pnpm api:lint`            | Valide le contrat OpenAPI public                |
| `pnpm api:test:contract`   | Vérifie réponses et snapshots du contrat        |
| `pnpm api:contract:diff`   | Compare l’OpenAPI à sa base Git avec oasdiff    |
| `pnpm api:data:check`      | Contrôle la qualité des données éditoriales     |
| `pnpm api:test:local`      | Teste l’API locale avec Bruno                   |
| `pnpm api:test:production` | Teste toute l’API publique en production        |
| `pnpm api:test:smoke`      | Lance le smoke test de production               |
| `pnpm lint`                | Analyse le code avec ESLint                     |
| `pnpm format`              | Formate le dépôt avec Prettier                  |
| `pnpm format:check`        | Vérifie le formatage sans modifier les fichiers |
| `pnpm exec tsc --noEmit`   | Vérifie les types TypeScript                    |

Avant de quitter le quai :

```bash
pnpm format:check
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## 🪨 Conventions du projet

- **Next.js 16.2**, App Router et React 19 ;
- TypeScript en mode strict ;
- Tailwind CSS pour les utilitaires globaux et CSS Modules pour les composants ;
- Prettier comme source de vérité du formatage ;
- indentation de quatre espaces ;
- guillemets doubles et points-virgules ;
- alias `@/*` vers `src/*` et `@data/*` vers `data/*` ;
- données éditoriales séparées du rendu ;
- composants serveur pour la configuration et composants client pour
  l’interactivité.

Cette version de Next.js comporte des changements importants. Avant de modifier
une API ou une convention du framework, consulte la documentation embarquée
dans `node_modules/next/dist/docs/`, conformément à `AGENTS.md`.

## 🚀 Préparer une production

Définis la variable suivante dans l’environnement de déploiement :

```dotenv
CURRENT_ENV=production
```

Puis vérifie la compilation :

```bash
pnpm build
pnpm start
```

`CURRENT_ENV` n’est pas préfixée par `NEXT_PUBLIC_` : elle est lue côté serveur,
puis seule la liste d’index autorisés est transmise aux composants interactifs.

## 🤝 Contribuer

Une contribution peut être technique, graphique ou éditoriale :

- corriger ou sourcer une information ;
- enrichir une fiche ;
- dessiner une illustration LRZ ;
- améliorer l’accessibilité ou le responsive ;
- proposer un nouvel index ;
- repêcher un mot ligérien presque oublié.

Dans tous les cas : garde les changements ciblés, respecte les modèles existants
et lance les vérifications avant partage.

## 📜 Licence

Le Codex utilise plusieurs licences afin de distinguer son moteur technique de
son univers éditorial et graphique :

- le **code source** et la documentation technique sont distribués sous
  [licence MIT](LICENSE) ;
- les **textes et données** sont proposés sous licence
  [CC BY-NC-SA 4.0](CONTENT_LICENSE.md#textes-et-données) ;
- les **illustrations, emojis LRZ et éléments de marque** restent protégés —
  tous droits réservés.

Le détail des périmètres et des conditions de réutilisation est disponible dans
[`CONTENT_LICENSE.md`](CONTENT_LICENSE.md).

**Loire Ride Zen** — suivre le fil, documenter ce qui vit autour. 🌊

---

## 👋 À propos du développeur

**Julien Julien**  
_Développeur web & créateur de projets narratifs._

Je conçois des applications et des outils numériques durables, où le code, la structure et le récit avancent ensemble.  
J'aime les projets clairs, évolutifs, pensés pour le temps long plutôt que pour l'instantané.

📍 Angers, France 🇫🇷  
🌍 https://julienjulien.fr
