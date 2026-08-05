# API publique du Codex ligérien

L’API expose les index éditoriaux publiés du Codex ligérien. Elle est
**publique, anonyme, gratuite et en lecture seule** : aucune clé ni aucun
header d’autorisation n’est nécessaire. Les réponses utilisent JSON sur HTTPS,
la version actuelle se trouve sous `/api/v1` et ne propose pas de pagination.

## Démarrage rapide

URL de base de production :

```text
https://codex.loireridezen.bike
```

Premier appel, sans autre dépendance que `curl` :

```bash
curl --fail-with-body \
  https://codex.loireridezen.bike/api/v1/indexes
```

Résultat attendu :

- statut `200` ;
- `Content-Type: application/json; charset=utf-8` ;
- collection des index dans `body.data` ;
- aucun token ou compte nécessaire.

Continuez ensuite avec la collection Faune :

```bash
curl --fail-with-body \
  https://codex.loireridezen.bike/api/v1/indexes/faune/entries
```

Pour tester la même route sur le projet local :

```bash
curl --fail-with-body \
  http://localhost:3000/api/v1/indexes
```

:::quote{variant=fieldNote}
**Licences en bref.** Les textes et données sont réutilisables sous
**CC BY-NC-SA 4.0** avec attribution. Les illustrations personnalisées,
logos et éléments de marque restent **tous droits réservés**. La présence
d’une `media.imageUrl` ne constitue pas une autorisation de reproduction.
:::

## Parcours conseillé

Le [contrat OpenAPI](https://codex.loireridezen.bike/api/v1/openapi.json)
décrit exhaustivement les paramètres, schémas, contraintes et headers.

Pour une intégration TypeScript ou React Native/Expo, utilisez le
[guide du SDK officiel](https://codex.loireridezen.bike/docs/sdk). La présente
page reste la référence du contrat HTTP ; le guide SDK documente le client
typé qui l’encapsule.

### 1. Découvrir l’API

`GET /api/v1` — identité de l’API, licences et liens de découverte.

- paramètres : aucun ;
- succès : `200` ;
- OpenAPI : opération `getApiRoot`.

```bash
curl --fail-with-body \
  https://codex.loireridezen.bike/api/v1
```

### 2. Lister les index publiés

`GET /api/v1/indexes` — collection complète des index actuellement publiés.

- paramètres : aucun ;
- succès : `200` ;
- OpenAPI : opération `listIndexes`.

```bash
curl --fail-with-body \
  https://codex.loireridezen.bike/api/v1/indexes
```

### 3. Lire un index

`GET /api/v1/indexes/{index}` — présentation et métadonnées d’un index.

- paramètre `index` : slug de l’index, par exemple `faune` ;
- succès : `200` ;
- OpenAPI : opération `getIndex`.

```bash
curl --fail-with-body \
  https://codex.loireridezen.bike/api/v1/indexes/faune
```

### 4. Lister les entrées d’un index

`GET /api/v1/indexes/{index}/entries` — collection complète des entrées de
l’index, sans pagination dans la V1.

- paramètre `index` : slug d’un index publié ;
- succès : `200` ;
- OpenAPI : opération `listIndexEntries`.

```bash
curl --fail-with-body \
  https://codex.loireridezen.bike/api/v1/indexes/faune/entries
```

### 5. Lire une entrée

`GET /api/v1/indexes/{index}/entries/{slug}` — détail d’une entrée publique.

- paramètre `index` : slug de l’index ;
- paramètre `slug` : slug de l’entrée dans cet index ;
- succès : `200` ;
- OpenAPI : opération `getIndexEntry`.

```bash
curl --fail-with-body \
  https://codex.loireridezen.bike/api/v1/indexes/faune/entries/heron-cendre
```

### HEAD et OPTIONS

Chaque route publique accepte également :

- `HEAD`, qui retourne le même statut et les mêmes headers pertinents que
  `GET`, mais sans corps ;
- `OPTIONS`, qui retourne `204`, les méthodes autorisées et les headers CORS.

Les méthodes publiques sont `GET`, `HEAD` et `OPTIONS`.

## Exemples curl

Les cinq appels du parcours précédent sont directement copiables.

Pour afficher aussi le statut et les headers :

```bash
curl -i \
  https://codex.loireridezen.bike/api/v1/indexes/faune
```

Pour observer volontairement une réponse `404` :

```bash
curl -i \
  https://codex.loireridezen.bike/api/v1/indexes/faune/entries/inconnu
```

Cette dernière réponse utilise
`application/problem+json; charset=utf-8`. Testez toujours le statut avant de
traiter le corps comme une enveloppe de succès.

## JavaScript

L’exemple suivant utilise uniquement `fetch`. Il vérifie `response.ok`,
transforme un problème HTTP en erreur et ne télécharge aucune illustration.
Le fichier exécutable est disponible dans
[`examples/quickstart.js`](./examples/quickstart.js).

```javascript
const baseUrl = "https://codex.loireridezen.bike";

async function main() {
    const response = await fetch(`${baseUrl}/api/v1/indexes/faune/entries`);
    const body = await response.json();

    if (!response.ok) {
        throw new Error(`${body.status} ${body.title}: ${body.detail}`);
    }

    for (const entry of body.data) {
        const mediaStatus =
            entry.media.imageUrl === null
                ? "sans illustration"
                : "illustration disponible — droits réservés";
        console.log(`${entry.name} (${entry.slug}) — ${mediaStatus}`);
    }
}

main().catch((error) => {
    console.error(error);
    if (typeof process !== "undefined") process.exitCode = 1;
});
```

Compatible avec les navigateurs modernes et les versions récentes de Node.js :

```bash
node docs/api/examples/quickstart.js
```

## TypeScript

Les types ci-dessous sont volontairement minimaux. Les types exhaustifs, les
enums et les contraintes restent définis dans OpenAPI. Le fichier complet est
disponible dans
[`examples/quickstart.ts`](./examples/quickstart.ts).

```typescript
type PublicLicenses = {
    content: {
        id: string;
        name: string;
        url: string;
        attribution: string;
    };
    media: {
        name: string;
        copyright: string;
        reuseAllowed: false;
    };
};

type ApiEnvelope<T> = {
    apiVersion: "1";
    data: T;
    meta: { license: PublicLicenses };
    links: Record<string, string>;
};

type PublicEntry = {
    id: string;
    index: "faune" | "flore" | "chateaux";
    slug: string;
    name: string;
    subtitle: string;
    summary: string | null;
    media: {
        emoji: string;
        imageUrl: string | null;
    };
    attributes: Record<string, unknown>;
};

type Problem = {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
};

const baseUrl = "https://codex.loireridezen.bike";

async function main() {
    const response = await fetch(`${baseUrl}/api/v1/indexes/faune/entries`);
    const body = (await response.json()) as
        ApiEnvelope<PublicEntry[]> | Problem;

    if (!response.ok) {
        const problem = body as Problem;
        throw new Error(
            `${problem.status} ${problem.title}: ${problem.detail}`,
        );
    }

    const envelope = body as ApiEnvelope<PublicEntry[]>;
    for (const entry of envelope.data) {
        const mediaStatus =
            entry.media.imageUrl === null
                ? "sans illustration"
                : "illustration disponible — droits réservés";

        if (entry.index === "faune") {
            const scientificName = entry.attributes.nomScientifique;
            console.log(
                entry.name,
                typeof scientificName === "string"
                    ? scientificName
                    : "(nom scientifique non renseigné)",
                mediaStatus,
            );
        } else {
            console.log(entry.name, mediaStatus);
        }
    }

    const collectionUrl = new URL(envelope.links.self, baseUrl);
    console.log(`Collection : ${collectionUrl}`);
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});

export {};
```

`index` sert de discriminateur avant d’interpréter les attributs spécialisés.
`attributes` varie selon l’index ; `summary` et `media.imageUrl` peuvent être
`null`. TypeScript aide le consommateur, mais ne valide pas une donnée qui
traverse le réseau : une validation runtime reste utile. Aucun client n’est
généré dans cette version.

## Modèle de données

### Enveloppe de succès

Toutes les réponses de succès partagent quatre propriétés :

| Champ          | Rôle                                                |
| -------------- | --------------------------------------------------- |
| `apiVersion`   | Version majeure de l’API, actuellement `"1"`        |
| `data`         | Ressource ou collection demandée                    |
| `meta.license` | Licences applicables aux données et aux médias      |
| `links`        | Liens relatifs permettant de poursuivre le parcours |

Les liens sont des chemins relatifs à résoudre avec l’URL de base :

```javascript
const resourceUrl = new URL(body.links.self, baseUrl);
```

### Index public

Un index expose :

- `slug`, `label`, `title` et `description` pour l’identifier ;
- `mark` et `accent` pour sa présentation ;
- `presentation` et `presentationMarkdown` pour son introduction ;
- `state`, `entryCount` et `updatedAt` pour son état public ;
- `source`, `corridor` et `editorialWarning` pour son contexte éditorial ;
- `links.self` et `links.entries` pour la navigation.

`editorialWarning` peut être `null`. Seuls les index publiés sont exposés. Un
index en relecture répond comme un index inconnu.

### Entrée publique

Le socle commun d’une entrée contient :

- `id`, identifiant stable composé comme `<index>:<slug>` ;
- `index`, discriminateur de la variante ;
- `slug`, identifiant de route à l’intérieur de l’index ;
- `name`, `subtitle` et `summary`, cette dernière pouvant être `null` ;
- `media.emoji` et `media.imageUrl`, cette dernière pouvant être `null` ;
- `attributes`, objet dont la structure dépend de `index`.

Les variantes actuellement publiées sont :

- `faune` : taxonomie, identification, conservation, rareté et milieu ;
- `flore` : catégorie, taxonomie, statut, floraison, rareté et milieu ;
- `chateaux` : localisation, coordonnées, époque, protection, renommée et
  visite.

Consultez le
[schéma `PublicEntry` dans OpenAPI](https://codex.loireridezen.bike/api/v1/openapi.json)
pour les propriétés et contraintes exhaustives.

### Médias

`emoji` est une représentation textuelle. `imageUrl` peut être `null`.

> **Attention — illustrations protégées.** Une URL présente n’accorde aucun
> droit de reproduction. Vérifiez `meta.license.media` et demandez une
> autorisation écrite avant d’intégrer une illustration personnalisée de Loire
> Ride Zen.

## Erreurs

Les erreurs utilisent :

```text
application/problem+json; charset=utf-8
```

Leur structure suit Problem Details :

:::table

| Champ      | Rôle                                             |
| ---------- | ------------------------------------------------ |
| `type`     | URI identifiant la famille du problème           |
| `title`    | Titre stable                                     |
| `status`   | Statut HTTP                                      |
| `detail`   | Explication destinée au développeur              |
| `instance` | Chemin de la requête ayant rencontré le problème |
| :::        |

Exemple complet :

```json
{
    "type": "https://codex.loireridezen.bike/problems/not-found",
    "title": "Resource not found",
    "status": 404,
    "detail": "No published entry matches the requested identifier.",
    "instance": "/api/v1/indexes/faune/entries/inconnu"
}
```

Une `404` désigne une ressource inconnue ou non publiée. Les erreurs ne
contiennent pas de stack technique et utilisent `Cache-Control: no-store`. Une
erreur `500` reste volontairement générique.

## CORS et cache

- les lectures cross-origin utilisent `Access-Control-Allow-Origin: *` ;
- les credentials ne sont ni nécessaires, ni annoncés par le contrat ;
- les méthodes publiques sont `GET`, `HEAD` et `OPTIONS` ;
- les réponses de succès peuvent être mises en cache ;
- le consommateur doit respecter le `Cache-Control` reçu ;
- les erreurs ne doivent pas être mises en cache.

OpenAPI et Bruno documentent et vérifient les valeurs exactes des headers.

## Attribution et licences

### Textes et données

Les textes et données sont sous
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr).
Toute réutilisation doit créditer l’auteur, indiquer les modifications, rester
non commerciale et partager les adaptations sous la même licence.

Attribution prête à copier :

```text
Données : Julien Julien — Loire Ride Zen, sous licence CC BY-NC-SA 4.0.
Source : https://codex.loireridezen.bike/api/v1
```

Si les données sont adaptées :

```text
Données adaptées de Julien Julien — Loire Ride Zen, sous licence CC BY-NC-SA 4.0. Modifications : [description].
```

### Illustrations et identité visuelle

```text
© 2026 Julien Julien — Loire Ride Zen. Tous droits réservés.
```

L’exposition d’une illustration par `media.imageUrl` ne constitue pas une
autorisation de reproduction, modification, redistribution ou utilisation
commerciale. Demandez une autorisation écrite préalable avant toute
intégration.

### Code et documentation

Le code source et la documentation technique sont distribués sous
[licence MIT](../../LICENSE), sous réserve des exclusions détaillées dans la
[licence des contenus](../../CONTENT_LICENSE.md).

## OpenAPI et Bruno

Ces trois outils sont complémentaires :

- ce **guide développeur** fournit le démarrage et les concepts essentiels ;
- [OpenAPI](https://codex.loireridezen.bike/api/v1/openapi.json) décrit le
  contrat exhaustif et peut être importé dans un client compatible ;
- [Bruno](https://github.com/iamjulienjulien/loireridezen-codex/tree/main/bruno/codex-public-api)
  fournit des requêtes prêtes à exécuter en local ou en production.

Après import d’OpenAPI, remplacez le serveur de production par
`http://localhost:3000` pour explorer une instance locale.

## Développement local et source

Lancez le projet :

```bash
pnpm install
pnpm dev
```

Puis ouvrez :

```text
http://localhost:3000/docs/api
```

La source canonique de cette page et les exemples exécutables se trouvent dans
le
[dossier `docs/api`](https://github.com/iamjulienjulien/loireridezen-codex/tree/main/docs/api).

Pour vérifier la documentation avant contribution :

```bash
pnpm api:docs:check
```
