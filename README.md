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
| 🌿 Flore       | Arbres, herbacées, plantes aquatiques…      |      51 |            —             |
| 🏰 Châteaux    | Forteresses et demeures du Val de Loire     |      28 |            —             |
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
```

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
| `production`  | Affiche uniquement la Faune et masque l’Atelier |

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

## 🧰 Commandes utiles

| Commande                 | Effet                                           |
| ------------------------ | ----------------------------------------------- |
| `pnpm dev`               | Lance le serveur de développement               |
| `pnpm build`             | Produit la version optimisée                    |
| `pnpm start`             | Lance une version déjà compilée                 |
| `pnpm lint`              | Analyse le code avec ESLint                     |
| `pnpm format`            | Formate le dépôt avec Prettier                  |
| `pnpm format:check`      | Vérifie le formatage sans modifier les fichiers |
| `pnpm exec tsc --noEmit` | Vérifie les types TypeScript                    |

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
Développeur Full Stack & créateur de projets narratifs.
Je conçois des applications et des outils numériques durables, où le code, la structure et le récit avancent ensemble.
J'aime les projets clairs, évolutifs, pensés pour le temps long plutôt que pour l'instantané.

📍 Angers, France 🇫🇷  
🌍 https://julienjulien.fr
