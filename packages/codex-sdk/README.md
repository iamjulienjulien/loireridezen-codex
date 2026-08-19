# SDK TypeScript du Codex ligérien

`@loireridezen/codex-sdk` est le client TypeScript officiel de l’API
publique v1 du Codex ligérien. Il donne accès aux index et à leurs entrées avec
des types générés depuis OpenAPI, sans dépendre de React, Next.js, Expo ou
d’une solution de stockage.

> **État de diffusion.** La version stable `1.0.0` est distribuée publiquement via
> npm sous le nom `@loireridezen/codex-sdk`.

## Statut et installation

Installez le SDK avec le gestionnaire de paquets du projet consommateur :

```bash
pnpm add @loireridezen/codex-sdk
```

Le package est ESM et s’appuie à l’exécution sur une implémentation standard de
`fetch`. Ses scripts de développement et de construction nécessitent Node.js
`20.9` ou plus.

## Démarrage rapide

Le client utilise par défaut `https://codex.loireridezen.bike` et ne demande ni
clé API ni header d’autorisation.

```typescript
import { createCodexClient } from "@loireridezen/codex-sdk";

const codex = createCodexClient();
const response = await codex.entries.list("faune");

for (const entry of response.data) {
    console.log(entry.name, entry.media.emoji);
}

console.log(response.meta.license.content.attribution);
```

Une URL de développement, des headers communs ou une implémentation de
`fetch` peuvent être injectés à la création :

```typescript
const codex = createCodexClient({
    baseUrl: "http://localhost:3000",
    fetch: globalThis.fetch,
    headers: { "x-client": "loireridezen-passeport" },
    timeoutMs: 10_000,
});
```

Le SDK ajoute automatiquement `Accept: application/json`. Il n’envoie aucune
donnée d’authentification par défaut.

## Surface du client

- `client.api.get()` — découvrir la version de l’API, ses licences et ses
  liens ;
- `client.indexes.list()` — lister les index publiés ;
- `client.indexes.get(index)` — lire la présentation d’un index ;
- `client.entries.list(index)` — lister toutes les entrées d’un index ;
- `client.entries.get(index, slug)` — lire une entrée complète.

Les paramètres `index` sont typés avec `PublishedIndexSlug`. Les slugs
d’entrées restent des chaînes, car leur liste évolue avec le contenu éditorial.
La v1 retourne les collections complètes et ne propose pas de pagination.

## Réponses et types

Chaque méthode retourne directement l’enveloppe JSON documentée par l’API :

```typescript
const envelope = await codex.indexes.list();

envelope.apiVersion;
envelope.data;
envelope.meta.license;
envelope.links;
```

Les principaux types publics sont exportés depuis le point d’entrée du
package :

- enveloppes : `ApiRootResponse`, `IndexCollectionResponse`,
  `IndexDetailResponse`, `EntryCollectionResponse` et `EntryDetailResponse` ;
- contenu : `PublicIndex`, `PublicEntry`, `FauneEntry`, `FloreEntry` et
  `ChateauEntry`, ainsi que les entrées Guinguette, Territoire, Personnage et
  Vignoble ;
- attributs : les sept variantes d’attributs et `ChateauIllustrations` ;
- contrat commun : `PublicMedia`, `PublicLicenses`, `Problem` et
  `PublishedIndexSlug`.

Ces types sont dérivés du
[contrat OpenAPI](https://codex.loireridezen.bike/api/v1/openapi.json). Une
évolution du contrat devient donc visible lors de la vérification du SDK.

## Contrat Château V1

Chaque `ChateauEntry` possède quatre illustrations obligatoires. L’API les
publie sous forme d’URL HTTPS absolues, directement utilisables par un client
web, Node.js ou React Native :

```typescript
import type { ChateauEntry } from "@loireridezen/codex-sdk";

const renderChateau = (chateau: ChateauEntry) => {
    const { aube, jour, soir, nuit } = chateau.attributes.illustrations;

    console.log({ aube, jour, soir, nuit });
    console.assert(chateau.media.imageUrl === jour);
};
```

`media.imageUrl` est toujours strictement identique à
`attributes.illustrations.jour`. Le SDK transporte ces cinq valeurs sans les
réécrire, les valider à l’exécution, les télécharger ou les mettre en cache.

## Migration depuis 0.1.0

La version 1.0.0 remplace le contrat expérimental publié en 0.1.0 :

- `illustrationVariant` disparaît sans alias historique ;
- `attributes.illustrations` et ses quatre clés deviennent obligatoires ;
- `PublishedIndexSlug` couvre désormais les sept index de production ;
- les types Guinguette, Territoire, Personnage et Vignoble rejoignent la
  surface publique.

Remplacez une lecture de `attributes.illustrationVariant?.jour` par
`attributes.illustrations.jour`. Les modèles dérivés et les fixtures Château
doivent conserver les quatre valeurs, même si une interface n’affiche encore
que l’ambiance Jour.

## Compatibilité 1.x

- Une version corrective `1.x.y` ne change pas le comportement observable ni
  le contrat public.
- Une version mineure `1.x.0` peut ajouter un export, une opération, un champ
  optionnel ou un nouvel index.
- Une suppression, un renommage, un changement de sens ou un champ rendu
  obligatoire exige une nouvelle version majeure.

Les index éditoriaux sont une union évolutive. Un consommateur qui transforme
les entrées doit donc prévoir un repli explicite et ne jamais convertir un slug
inconnu en Château :

```typescript
const labelForIndex = (index: string) => {
    switch (index) {
        case "chateaux":
            return "Châteaux";
        case "faune":
            return "Faune";
        default:
            return "Nouvel index du Codex";
    }
};
```

## Expo et React Native

Le cœur du SDK est compatible avec une application React Native/Expo qui
dispose de `fetch`, `URL`, `Headers` et `AbortController`. Il ne charge aucun
module Node.js à l’exécution et ne dépend d’aucun composant React.

```typescript
import { createCodexClient } from "@loireridezen/codex-sdk";

export const codex = createCodexClient({
    fetch: globalThis.fetch,
    timeoutMs: 8_000,
});
```

Le cache hors ligne, la persistance dans AsyncStorage, la fraîcheur des
données et les stratégies de reprise réseau appartiennent à l’application. Un
adaptateur Expo pourra envelopper ce client sans modifier son cœur.

Sur un appareil physique, `localhost` désigne l’appareil lui-même. Pour joindre
une API locale, utilisez une adresse du réseau local ou un tunnel accessible
depuis le téléphone.

## Erreurs et interruption

Trois erreurs spécialisées permettent de distinguer les échecs :

- `CodexApiError` pour un statut HTTP non réussi, avec `status`, `url`, `body`
  et, si disponible, le Problem Details dans `problem` ;
- `CodexTimeoutError` lorsque le délai configuré est dépassé ;
- `CodexResponseError` lorsque l’API retourne un corps JSON invalide.

```typescript
import { CodexApiError, createCodexClient } from "@loireridezen/codex-sdk";

const codex = createCodexClient();

try {
    await codex.entries.get("faune", "entree-inconnue");
} catch (error) {
    if (error instanceof CodexApiError) {
        console.error(error.status, error.problem?.detail);
    }
}
```

Chaque appel accepte un `AbortSignal` et peut remplacer le délai du client :

```typescript
const controller = new AbortController();

const request = codex.entries.list("faune", {
    signal: controller.signal,
    timeoutMs: 3_000,
});

controller.abort();
await request;
```

Une interruption demandée par l’application conserve l’erreur d’annulation de
son implémentation de `fetch`. Seul un délai déclenché par le SDK produit une
`CodexTimeoutError`.

## Licences et médias

Les licences sont présentes dans `response.meta.license` sur chaque enveloppe
de succès. Les textes et données sont proposés sous **CC BY-NC-SA 4.0** avec
attribution. Les illustrations personnalisées, logos et éléments de marque
restent **tous droits réservés** et nécessitent une autorisation écrite pour
toute réutilisation.

Le SDK expose les URLs de médias telles que l’API les publie, sans télécharger,
mettre en cache ni accorder de droit supplémentaire sur les fichiers. Une
`media.imageUrl` peut être `null`.

## OpenAPI et développement

Les types sont générés depuis `public/api/v1/openapi.json` :

```bash
pnpm sdk:generate
pnpm sdk:check
```

`sdk:check` vérifie la dérive OpenAPI, les types, les tests et la construction
du package. Il échoue lorsque le fichier généré ne correspond plus au contrat.
La référence des routes, réponses et règles CORS reste disponible dans la
[documentation de l’API](https://codex.loireridezen.bike/docs/api).

Le code du SDK est distribué sous licence MIT. Les licences du package ne
remplacent jamais celles des données et médias retournés par l’API.

## Limites de la v1

Le SDK ne fournit actuellement ni cache persistant, ni adaptateur Expo, ni
pagination, ni synchronisation différentielle, ni téléchargement de médias.
Il n’effectue pas non plus de validation d’exécution des réponses réussies : le
contrat TypeScript repose sur OpenAPI et les tests de conformité de l’API.
