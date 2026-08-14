/**
 * Generated from public/api/v1/openapi.json by openapi-typescript.
 * Do not edit by hand. Run `pnpm sdk:generate` from the repository root.
 */
export interface paths {
    "/api/v1": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Découvrir l’API
         * @description Retourne l’identité de l’API, ses licences et ses liens de découverte.
         */
        get: operations["getApiRoot"];
        put?: never;
        post?: never;
        delete?: never;
        /**
         * Découvrir les méthodes de la racine
         * @description Retourne les méthodes et en-têtes CORS autorisés.
         */
        options: operations["optionsApiRoot"];
        /**
         * Inspecter la racine de l’API
         * @description Retourne le statut et les en-têtes du GET équivalent, sans corps.
         */
        head: operations["headApiRoot"];
        patch?: never;
        trace?: never;
    };
    "/api/v1/indexes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Lister les index publiés
         * @description Retourne tous les index dont l’état éditorial est publié.
         */
        get: operations["listIndexes"];
        put?: never;
        post?: never;
        delete?: never;
        /**
         * Découvrir les méthodes de la liste des index
         * @description Retourne les méthodes et en-têtes CORS autorisés.
         */
        options: operations["optionsIndexes"];
        /**
         * Inspecter la liste des index
         * @description Retourne le statut et les en-têtes du GET équivalent, sans corps.
         */
        head: operations["headIndexes"];
        patch?: never;
        trace?: never;
    };
    "/api/v1/indexes/{index}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
            };
            cookie?: never;
        };
        /**
         * Consulter un index publié
         * @description Retourne les métadonnées publiques d’un index. Un index inconnu ou non publié répond 404.
         */
        get: operations["getIndex"];
        put?: never;
        post?: never;
        delete?: never;
        /**
         * Découvrir les méthodes d’un index
         * @description Retourne les méthodes et en-têtes CORS autorisés.
         */
        options: operations["optionsIndex"];
        /**
         * Inspecter un index publié
         * @description Retourne le statut et les en-têtes du GET équivalent, sans corps.
         */
        head: operations["headIndex"];
        patch?: never;
        trace?: never;
    };
    "/api/v1/indexes/{index}/entries": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
            };
            cookie?: never;
        };
        /**
         * Lister les entrées d’un index
         * @description Retourne la collection complète des entrées d’un index publié, dans l’ordre éditorial.
         */
        get: operations["listIndexEntries"];
        put?: never;
        post?: never;
        delete?: never;
        /**
         * Découvrir les méthodes de la collection
         * @description Retourne les méthodes et en-têtes CORS autorisés.
         */
        options: operations["optionsIndexEntries"];
        /**
         * Inspecter les entrées d’un index
         * @description Retourne le statut et les en-têtes du GET équivalent, sans corps.
         */
        head: operations["headIndexEntries"];
        patch?: never;
        trace?: never;
    };
    "/api/v1/indexes/{index}/entries/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
                /** @description Slug immuable de l’entrée. */
                slug: components["parameters"]["EntrySlugPath"];
            };
            cookie?: never;
        };
        /**
         * Consulter une entrée
         * @description Retourne une entrée publique identifiée par son index et son slug.
         */
        get: operations["getIndexEntry"];
        put?: never;
        post?: never;
        delete?: never;
        /**
         * Découvrir les méthodes d’une entrée
         * @description Retourne les méthodes et en-têtes CORS autorisés.
         */
        options: operations["optionsIndexEntry"];
        /**
         * Inspecter une entrée
         * @description Retourne le statut et les en-têtes du GET équivalent, sans corps.
         */
        head: operations["headIndexEntry"];
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * @description Version majeure du contrat de réponse.
         * @constant
         */
        ApiVersion: "1";
        /**
         * @description Identifiant d’un index actuellement publié.
         * @enum {string}
         */
        PublishedIndexSlug: "faune" | "flore" | "chateaux" | "guinguettes" | "territoires" | "personnages" | "vignobles";
        /**
         * @description Identifiant kebab-case immuable de l’entrée.
         * @example heron-cendre
         */
        EntrySlug: string;
        PublicMedia: {
            emoji: string;
            /**
             * Format: uri
             * @description URL absolue HTTP(S) de l’illustration, ou null.
             */
            imageUrl: string | null;
        };
        ContentLicense: {
            /** @constant */
            id: "CC-BY-NC-SA-4.0";
            /** @constant */
            name: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International";
            /**
             * Format: uri
             * @constant
             */
            url: "https://creativecommons.org/licenses/by-nc-sa/4.0/";
            /** @constant */
            attribution: "Julien Julien — Loire Ride Zen";
        };
        MediaLicense: {
            /** @constant */
            name: "All rights reserved";
            /** @constant */
            copyright: "© 2026 Julien Julien — Loire Ride Zen";
            /** @constant */
            reuseAllowed: false;
        };
        PublicLicenses: {
            content: components["schemas"]["ContentLicense"];
            media: components["schemas"]["MediaLicense"];
        };
        PublicIndex: {
            slug: components["schemas"]["PublishedIndexSlug"];
            label: string;
            title: string;
            description: string;
            mark: string;
            accent: string;
            presentation?: string;
            presentationMarkdown: string;
            /** @constant */
            state: "publie";
            entryCount: number;
            /** Format: date */
            updatedAt: string;
            source: string;
            corridor: string;
            editorialWarning: string | null;
            links: {
                self: string;
                entries: string;
            };
        };
        FauneIdentification: {
            longueur?: string;
            hauteur?: string;
            envergure?: string;
            poids?: string;
            silhouette: string;
            couleurs: ("argent" | "beige" | "blanc" | "blanc gris" | "bleu" | "bleu gris" | "bleu métallique" | "bleu turquoise" | "brun" | "brun foncé" | "brun roux" | "crème" | "fauve" | "gris" | "gris ardoise" | "gris brun" | "jaune" | "noir" | "ocre" | "orange" | "orange cuivré" | "rouge" | "roux" | "vert" | "vert métallique" | "vert olive" | "vert vif")[];
            dimorphisme: string;
        };
        FauneConservation: {
            /** @enum {string} */
            monde: "LC" | "NT" | "VU" | "EN" | "CR" | "NA";
            /** @enum {string} */
            france: "LC" | "NT" | "VU" | "EN" | "CR" | "NA";
            note?: string;
        };
        FauneAttributes: {
            autresNoms: string[];
            /** @enum {string} */
            type: "oiseau" | "mammifère" | "poisson" | "reptile" | "amphibien" | "insecte";
            nomScientifique: string;
            regne: string;
            classe: string;
            famille: string;
            rangTaxinomique: string;
            identification: components["schemas"]["FauneIdentification"];
            conservation: components["schemas"]["FauneConservation"];
            /** @enum {string} */
            rarete: "commun" | "régulier" | "rare" | "trésor";
            milieu: string;
            periode: string;
            taille?: string;
            poids?: string;
            longevite?: string;
            regime?: string;
            anecdote?: string;
            rectEmoji?: boolean;
        };
        FloreStatut: {
            /** @enum {string} */
            indigenat: "indigène" | "exotique" | "envahissante";
            /** @enum {string} */
            protection: "nationale" | "régionale" | "aucune";
            note?: string;
        };
        FloreAttributes: {
            autresNoms: string[];
            /** @enum {string} */
            categorie: "arbre" | "arbuste" | "herbacée" | "graminée" | "aquatique" | "fougère" | "grimpante";
            nomScientifique: string;
            regne: string;
            famille: string;
            rangTaxinomique: string;
            statut: components["schemas"]["FloreStatut"];
            /** @enum {string} */
            rarete: "commun" | "régulier" | "rare" | "trésor";
            milieu: string;
            floraison: string;
            taille: string;
            usages?: string;
            anecdote?: string;
        };
        Coordinates: {
            lat: number;
            lng: number;
        };
        ChateauProtection: {
            /** @enum {string} */
            monumentHistorique: "classé" | "inscrit" | "aucune";
            unesco: boolean;
            note?: string;
        };
        ChateauIllustrations: {
            aube: string;
            jour: string;
            soir: string;
            nuit: string;
        };
        ChateauMeta: {
            architecture: ("gallo-romaine" | "pre-romane" | "medievale" | "romane" | "gothique" | "gothique-flamboyant" | "renaissance" | "classique" | "baroque" | "rocaille" | "neoclassique" | "neogothique" | "historiciste" | "industrielle" | "art-nouveau" | "art-deco" | "moderniste" | "brutaliste" | "contemporaine" | "vernaculaire" | "troglodytique")[];
            epoque: ("prehistoire" | "protohistoire" | "antiquite" | "moyen-age" | "renaissance" | "ancien-regime" | "revolution-empire" | "xixe-siecle" | "xxe-siecle" | "xxie-siecle")[];
            experience: ("visite-libre" | "visite-guidee" | "exposition" | "reconstitution" | "demonstration" | "atelier" | "jeu-piste" | "promenade" | "randonnee" | "velo" | "equitation" | "bateau" | "canoe-kayak" | "baignade" | "peche" | "observation-nature" | "photographie" | "contemplation" | "detente" | "pique-nique" | "repas" | "degustation" | "marche-local" | "concert" | "spectacle" | "danse" | "fete-populaire" | "montgolfiere")[];
        };
        ChateauAttributes: {
            autresNoms: string[];
            illustrations: components["schemas"]["ChateauIllustrations"];
            meta: components["schemas"]["ChateauMeta"];
            commune: string;
            departement: string;
            coordonnees: components["schemas"]["Coordinates"];
            riviere: string;
            /** @enum {string} */
            epoque: "Médiéval" | "Renaissance" | "Classique" | "Éclectique";
            style: string;
            construction: string;
            commanditaire?: string;
            protection: components["schemas"]["ChateauProtection"];
            /** @enum {string} */
            renommee: "phare" | "majeur" | "notable" | "confidentiel";
            /** @enum {string} */
            visite: "ouvert au public" | "extérieurs & parc" | "privé, non visitable" | "inconnu";
        };
        VignobleAppellation: {
            /** @enum {string} */
            niveau: "AOC communale" | "AOC régionale" | "IGP";
            depuis?: string;
            note?: string;
        };
        VignobleMeta: {
            terroirs: ("tuffeau" | "calcaire" | "marne-calcaire" | "argilo-calcaire" | "argile-a-silex" | "schiste" | "micaschiste" | "gneiss" | "granite" | "gabbro" | "sable" | "graviers" | "alluvions" | "faluns")[];
            cepages: ("chenin" | "sauvignon-blanc" | "melon-de-bourgogne" | "chardonnay" | "chasselas" | "folle-blanche" | "romorantin" | "menu-pineau" | "tressallier" | "cabernet-franc" | "cabernet-sauvignon" | "pinot-noir" | "pinot-gris" | "pinot-meunier" | "gamay" | "grolleau-noir" | "grolleau-gris" | "pineau-daunis" | "cot")[];
            territoires?: ("nivernais" | "orleanais" | "blaisois" | "touraine" | "chinonais" | "saumurois" | "anjou" | "bretagne-ligerienne")[];
            /** @enum {string} */
            territoirePrincipal?: "nivernais" | "orleanais" | "blaisois" | "touraine" | "chinonais" | "saumurois" | "anjou" | "bretagne-ligerienne";
        };
        VignobleAttributes: {
            autresNoms: string[];
            /** @enum {string} */
            couleur: "blanc sec" | "blanc moelleux" | "rouge" | "rosé" | "effervescent";
            /** @enum {string} */
            rive: "Auvergne & Forez" | "Centre-Loire" | "Touraine" | "Anjou-Saumur" | "Pays nantais";
            departement: string;
            coordonnees: components["schemas"]["Coordinates"];
            cepages: string[];
            style: string;
            accord?: string;
            appellation: components["schemas"]["VignobleAppellation"];
            /** @enum {string} */
            notoriete: "phare" | "majeur" | "notable" | "confidentiel";
            meta: components["schemas"]["VignobleMeta"];
        };
        GuinguettePosition: {
            latitude: number | null;
            longitude: number | null;
        };
        GuinguetteLinks: {
            siteWeb: string | null;
            instagram: string | null;
            facebook: string | null;
            googleMaps: string | null;
        };
        GuinguetteAttributes: {
            autresNoms: string[];
            commune: string;
            communeDeleguee: string | null;
            departement: string;
            /** @enum {string} */
            territoire: "nivernais" | "orleanais" | "blaisois" | "touraine" | "chinonais" | "saumurois" | "anjou" | "bretagne-ligerienne";
            coursDEau: string | null;
            /** @enum {string} */
            type: "guinguette" | "restaurant-guinguette" | "bar-guinguette" | "guinguette-itinerante";
            ambiance: string[];
            terrasse: boolean | null;
            musiqueLive: boolean | null;
            accessibleVelo: boolean | null;
            loireAVelo: boolean | null;
            vue: string;
            periode: string;
            position: components["schemas"]["GuinguettePosition"];
            liens: components["schemas"]["GuinguetteLinks"];
            services: string[];
            tags: string[];
            /** @enum {string} */
            statut: "actif" | "a_verifier" | "historique";
            verification: string;
        };
        TerritoireLimites: {
            amont: string;
            aval: string;
            note?: string;
        };
        TerritoireIdentite: {
            accent: string;
            color: string;
            blasonAlt?: string;
            symboles: string[];
        };
        TerritoireAttributes: {
            ordre: number;
            presentationMd: string;
            /** @enum {string} */
            nature: "duché" | "comté" | "province" | "pays historique" | "territoire éditorial";
            /** @enum {string} */
            paysage: "val amont" | "val royal" | "val occidental" | "estuaire";
            reperes: string[];
            coursEau: string[];
            limites: components["schemas"]["TerritoireLimites"];
            identite: components["schemas"]["TerritoireIdentite"];
        };
        PersonnageAttributes: {
            autresNoms: string[];
            roles: string[];
            categoriePrincipale: components["schemas"]["EntrySlug"];
            tags: string[];
        };
        /**
         * @example {
         *       "id": "faune:heron-cendre",
         *       "index": "faune",
         *       "slug": "heron-cendre",
         *       "name": "Héron cendré",
         *       "subtitle": "sur la levée",
         *       "summary": null,
         *       "media": {
         *         "emoji": "🐦",
         *         "imageUrl": "https://codex.loireridezen.bike/illustrations/faune/heron-cendree.png"
         *       },
         *       "attributes": {
         *         "autresNoms": [
         *           "Héron",
         *           "Aigron"
         *         ],
         *         "type": "oiseau",
         *         "nomScientifique": "Ardea cinerea",
         *         "regne": "Animalia",
         *         "classe": "Aves",
         *         "famille": "Ardeidae",
         *         "rangTaxinomique": "Animalia › Chordata › Aves › Pelecaniformes › Ardeidae › Ardea › cinerea",
         *         "identification": {
         *           "longueur": "90 à 98 cm",
         *           "envergure": "175 à 195 cm",
         *           "poids": "1,0 à 2,1 kg",
         *           "silhouette": "Grand échassier au long cou replié en S.",
         *           "couleurs": [
         *             "gris",
         *             "blanc",
         *             "noir"
         *           ],
         *           "dimorphisme": "Très faible."
         *         },
         *         "conservation": {
         *           "monde": "LC",
         *           "france": "LC"
         *         },
         *         "rarete": "commun",
         *         "milieu": "Eau libre & grève",
         *         "periode": "Jour"
         *       }
         *     }
         */
        FauneEntry: {
            id: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            index: "faune";
            slug: components["schemas"]["EntrySlug"];
            name: string;
            subtitle: string;
            summary: null;
            media: components["schemas"]["PublicMedia"];
            attributes: components["schemas"]["FauneAttributes"];
        };
        /**
         * @example {
         *       "id": "flore:peuplier-noir",
         *       "index": "flore",
         *       "slug": "peuplier-noir",
         *       "name": "Peuplier noir",
         *       "subtitle": "les racines dans la grève",
         *       "summary": null,
         *       "media": {
         *         "emoji": "🌳",
         *         "imageUrl": "https://codex.loireridezen.bike/illustrations/flore/peuplier-noir.png"
         *       },
         *       "attributes": {
         *         "autresNoms": [
         *           "Liard",
         *           "Peuplier commun"
         *         ],
         *         "categorie": "arbre",
         *         "nomScientifique": "Populus nigra",
         *         "regne": "Plantae",
         *         "famille": "Salicaceae",
         *         "rangTaxinomique": "Plantae › Tracheophyta › Magnoliopsida › Malpighiales › Salicaceae › Populus › nigra",
         *         "statut": {
         *           "indigenat": "indigène",
         *           "protection": "aucune",
         *           "note": "Arbre emblématique de la ripisylve ligérienne."
         *         },
         *         "rarete": "commun",
         *         "milieu": "Ripisylve & grève",
         *         "floraison": "Mars–avril (chatons)",
         *         "taille": "Arbre, 20–30 m"
         *       }
         *     }
         */
        FloreEntry: {
            id: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            index: "flore";
            slug: components["schemas"]["EntrySlug"];
            name: string;
            subtitle: string;
            summary: null;
            media: components["schemas"]["PublicMedia"];
            attributes: components["schemas"]["FloreAttributes"];
        };
        /**
         * @example {
         *       "id": "chateaux:chateau-de-gien",
         *       "index": "chateaux",
         *       "slug": "chateau-de-gien",
         *       "name": "Château de Gien",
         *       "subtitle": "la brique rose au-dessus du fleuve",
         *       "summary": "Château de brique et de pierre de la fin du XVᵉ siècle.",
         *       "media": {
         *         "emoji": "🏰",
         *         "imageUrl": "https://codex.loireridezen.bike/illustrations/chateaux/chateau-de-gien/jourx.png"
         *       },
         *       "attributes": {
         *         "autresNoms": [
         *           "Château Anne de Beaujeu"
         *         ],
         *         "commune": "Gien",
         *         "departement": "Loiret (45)",
         *         "coordonnees": {
         *           "lat": 47.6847,
         *           "lng": 2.63
         *         },
         *         "riviere": "Loire",
         *         "illustrations": {
         *           "aube": "/illustrations/chateaux/chateau-de-gien/aube@2x.png",
         *           "jour": "/illustrations/chateaux/chateau-de-gien/jour@2x.png",
         *           "soir": "/illustrations/chateaux/chateau-de-gien/soir@2x.png",
         *           "nuit": "/illustrations/chateaux/chateau-de-gien/nuit@2x.png"
         *         },
         *         "meta": {
         *           "architecture": [
         *             "gothique-flamboyant",
         *             "renaissance"
         *           ],
         *           "epoque": [
         *             "renaissance"
         *           ],
         *           "experience": [
         *             "visite-libre",
         *             "visite-guidee"
         *           ]
         *         },
         *         "epoque": "Renaissance",
         *         "style": "Gothique-Renaissance de brique",
         *         "construction": "1484–1500",
         *         "commanditaire": "Anne de Beaujeu",
         *         "protection": {
         *           "monumentHistorique": "classé",
         *           "unesco": false,
         *           "note": "En amont de Sully-sur-Loire, hors du périmètre UNESCO."
         *         },
         *         "renommee": "notable",
         *         "visite": "ouvert au public"
         *       }
         *     }
         */
        ChateauEntry: {
            id: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            index: "chateaux";
            slug: components["schemas"]["EntrySlug"];
            name: string;
            subtitle: string;
            summary: string | null;
            media: components["schemas"]["PublicMedia"];
            attributes: components["schemas"]["ChateauAttributes"];
        };
        GuinguetteEntry: {
            id: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            index: "guinguettes";
            slug: components["schemas"]["EntrySlug"];
            name: string;
            subtitle: string;
            summary: string;
            media: components["schemas"]["PublicMedia"];
            attributes: components["schemas"]["GuinguetteAttributes"];
        };
        TerritoireEntry: {
            id: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            index: "territoires";
            slug: components["schemas"]["EntrySlug"];
            name: string;
            subtitle: string;
            summary: string;
            media: components["schemas"]["PublicMedia"];
            attributes: components["schemas"]["TerritoireAttributes"];
        };
        PersonnageEntry: {
            id: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            index: "personnages";
            slug: components["schemas"]["EntrySlug"];
            name: string;
            subtitle: string;
            summary: null;
            media: components["schemas"]["PublicMedia"];
            attributes: components["schemas"]["PersonnageAttributes"];
        };
        /**
         * @example {
         *       "id": "vignobles:cotes-du-forez",
         *       "index": "vignobles",
         *       "slug": "cotes-du-forez",
         *       "name": "Côtes du Forez",
         *       "subtitle": "le gamay des monts du Forez",
         *       "summary": null,
         *       "media": {
         *         "emoji": "🍇",
         *         "imageUrl": null
         *       },
         *       "attributes": {
         *         "autresNoms": [],
         *         "couleur": "rouge",
         *         "rive": "Auvergne & Forez",
         *         "departement": "Loire (42)",
         *         "coordonnees": {
         *           "lat": 45.75,
         *           "lng": 4
         *         },
         *         "cepages": [
         *           "Gamay"
         *         ],
         *         "style": "Rouge léger et fruité ; quelques rosés",
         *         "accord": "Charcuterie, volaille rôtie, lentilles du Puy",
         *         "appellation": {
         *           "niveau": "AOC communale",
         *           "depuis": "2000"
         *         },
         *         "notoriete": "confidentiel",
         *         "meta": {
         *           "terroirs": [
         *             "granite"
         *           ],
         *           "cepages": [
         *             "gamay"
         *           ]
         *         }
         *       }
         *     }
         */
        VignobleEntry: {
            id: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            index: "vignobles";
            slug: components["schemas"]["EntrySlug"];
            name: string;
            subtitle: string;
            summary: string | null;
            media: components["schemas"]["PublicMedia"];
            attributes: components["schemas"]["VignobleAttributes"];
        };
        PublicEntry: components["schemas"]["FauneEntry"] | components["schemas"]["FloreEntry"] | components["schemas"]["ChateauEntry"] | components["schemas"]["GuinguetteEntry"] | components["schemas"]["TerritoireEntry"] | components["schemas"]["PersonnageEntry"] | components["schemas"]["VignobleEntry"];
        /**
         * @example {
         *       "apiVersion": "1",
         *       "data": {
         *         "name": "API publique du Codex ligérien",
         *         "description": "Index éditoriaux publics de Loire Ride Zen, en lecture seule.",
         *         "version": "1"
         *       },
         *       "meta": {
         *         "license": {
         *           "content": {
         *             "id": "CC-BY-NC-SA-4.0",
         *             "name": "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International",
         *             "url": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
         *             "attribution": "Julien Julien — Loire Ride Zen"
         *           },
         *           "media": {
         *             "name": "All rights reserved",
         *             "copyright": "© 2026 Julien Julien — Loire Ride Zen",
         *             "reuseAllowed": false
         *           }
         *         }
         *       },
         *       "links": {
         *         "self": "/api/v1",
         *         "indexes": "/api/v1/indexes",
         *         "openapi": "/api/v1/openapi.json",
         *         "documentation": "/docs/api"
         *       }
         *     }
         */
        ApiRootResponse: {
            apiVersion: components["schemas"]["ApiVersion"];
            data: {
                name: string;
                description: string;
                /** @constant */
                version: "1";
            };
            meta: {
                license: components["schemas"]["PublicLicenses"];
            };
            links: {
                /** @constant */
                self: "/api/v1";
                /** @constant */
                indexes: "/api/v1/indexes";
                /** @constant */
                openapi: "/api/v1/openapi.json";
                /** @constant */
                documentation: "/docs/api";
            };
        };
        /**
         * @example {
         *       "apiVersion": "1",
         *       "data": [
         *         {
         *           "slug": "faune",
         *           "label": "Faune",
         *           "title": "Faune ligérienne",
         *           "description": "Espèces animales du corridor ligérien.",
         *           "mark": "🐦",
         *           "accent": "#5f7f71",
         *           "presentation": "La faune du corridor ligérien.",
         *           "presentationMarkdown": "La **faune** du corridor ligérien.",
         *           "state": "publie",
         *           "entryCount": 49,
         *           "updatedAt": "2026-07-21",
         *           "source": "Loire Ride Zen",
         *           "corridor": "Loire",
         *           "editorialWarning": null,
         *           "links": {
         *             "self": "/api/v1/indexes/faune",
         *             "entries": "/api/v1/indexes/faune/entries"
         *           }
         *         }
         *       ],
         *       "meta": {
         *         "total": 3,
         *         "license": {
         *           "content": {
         *             "id": "CC-BY-NC-SA-4.0",
         *             "name": "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International",
         *             "url": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
         *             "attribution": "Julien Julien — Loire Ride Zen"
         *           },
         *           "media": {
         *             "name": "All rights reserved",
         *             "copyright": "© 2026 Julien Julien — Loire Ride Zen",
         *             "reuseAllowed": false
         *           }
         *         }
         *       },
         *       "links": {
         *         "self": "/api/v1/indexes",
         *         "api": "/api/v1"
         *       }
         *     }
         */
        IndexCollectionResponse: {
            apiVersion: components["schemas"]["ApiVersion"];
            data: components["schemas"]["PublicIndex"][];
            meta: {
                total: number;
                license: components["schemas"]["PublicLicenses"];
            };
            links: {
                /** @constant */
                self: "/api/v1/indexes";
                /** @constant */
                api: "/api/v1";
            };
        };
        /**
         * @example {
         *       "apiVersion": "1",
         *       "data": {
         *         "slug": "faune",
         *         "label": "Faune",
         *         "title": "Faune ligérienne",
         *         "description": "Espèces animales du corridor ligérien.",
         *         "mark": "🐦",
         *         "accent": "#5f7f71",
         *         "presentation": "La faune du corridor ligérien.",
         *         "presentationMarkdown": "La **faune** du corridor ligérien.",
         *         "state": "publie",
         *         "entryCount": 49,
         *         "updatedAt": "2026-07-21",
         *         "source": "Loire Ride Zen",
         *         "corridor": "Loire",
         *         "editorialWarning": null,
         *         "links": {
         *           "self": "/api/v1/indexes/faune",
         *           "entries": "/api/v1/indexes/faune/entries"
         *         }
         *       },
         *       "meta": {
         *         "license": {
         *           "content": {
         *             "id": "CC-BY-NC-SA-4.0",
         *             "name": "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International",
         *             "url": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
         *             "attribution": "Julien Julien — Loire Ride Zen"
         *           },
         *           "media": {
         *             "name": "All rights reserved",
         *             "copyright": "© 2026 Julien Julien — Loire Ride Zen",
         *             "reuseAllowed": false
         *           }
         *         }
         *       },
         *       "links": {
         *         "self": "/api/v1/indexes/faune",
         *         "entries": "/api/v1/indexes/faune/entries",
         *         "indexes": "/api/v1/indexes"
         *       }
         *     }
         */
        IndexDetailResponse: {
            apiVersion: components["schemas"]["ApiVersion"];
            data: components["schemas"]["PublicIndex"];
            meta: {
                license: components["schemas"]["PublicLicenses"];
            };
            links: {
                self: string;
                entries: string;
                /** @constant */
                indexes: "/api/v1/indexes";
            };
        };
        /**
         * @example {
         *       "apiVersion": "1",
         *       "data": [
         *         {
         *           "id": "faune:heron-cendre",
         *           "index": "faune",
         *           "slug": "heron-cendre",
         *           "name": "Héron cendré",
         *           "subtitle": "sur la levée",
         *           "summary": null,
         *           "media": {
         *             "emoji": "🐦",
         *             "imageUrl": "https://codex.loireridezen.bike/illustrations/faune/heron-cendree.png"
         *           },
         *           "attributes": {
         *             "autresNoms": [
         *               "Héron",
         *               "Aigron"
         *             ],
         *             "type": "oiseau",
         *             "nomScientifique": "Ardea cinerea",
         *             "regne": "Animalia",
         *             "classe": "Aves",
         *             "famille": "Ardeidae",
         *             "rangTaxinomique": "Animalia › Chordata › Aves",
         *             "identification": {
         *               "silhouette": "Grand échassier.",
         *               "couleurs": [
         *                 "gris",
         *                 "blanc",
         *                 "noir"
         *               ],
         *               "dimorphisme": "Très faible."
         *             },
         *             "conservation": {
         *               "monde": "LC",
         *               "france": "LC"
         *             },
         *             "rarete": "commun",
         *             "milieu": "Eau libre & grève",
         *             "periode": "Jour"
         *           }
         *         }
         *       ],
         *       "meta": {
         *         "index": "faune",
         *         "total": 49,
         *         "license": {
         *           "content": {
         *             "id": "CC-BY-NC-SA-4.0",
         *             "name": "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International",
         *             "url": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
         *             "attribution": "Julien Julien — Loire Ride Zen"
         *           },
         *           "media": {
         *             "name": "All rights reserved",
         *             "copyright": "© 2026 Julien Julien — Loire Ride Zen",
         *             "reuseAllowed": false
         *           }
         *         }
         *       },
         *       "links": {
         *         "self": "/api/v1/indexes/faune/entries",
         *         "index": "/api/v1/indexes/faune"
         *       }
         *     }
         */
        EntryCollectionResponse: {
            apiVersion: components["schemas"]["ApiVersion"];
            data: components["schemas"]["PublicEntry"][];
            meta: {
                index: components["schemas"]["PublishedIndexSlug"];
                total: number;
                license: components["schemas"]["PublicLicenses"];
            };
            links: {
                self: string;
                index: string;
            };
        };
        /**
         * @example {
         *       "apiVersion": "1",
         *       "data": {
         *         "id": "faune:heron-cendre",
         *         "index": "faune",
         *         "slug": "heron-cendre",
         *         "name": "Héron cendré",
         *         "subtitle": "sur la levée",
         *         "summary": null,
         *         "media": {
         *           "emoji": "🐦",
         *           "imageUrl": "https://codex.loireridezen.bike/illustrations/faune/heron-cendree.png"
         *         },
         *         "attributes": {
         *           "autresNoms": [
         *             "Héron",
         *             "Aigron"
         *           ],
         *           "type": "oiseau",
         *           "nomScientifique": "Ardea cinerea",
         *           "regne": "Animalia",
         *           "classe": "Aves",
         *           "famille": "Ardeidae",
         *           "rangTaxinomique": "Animalia › Chordata › Aves",
         *           "identification": {
         *             "silhouette": "Grand échassier.",
         *             "couleurs": [
         *               "gris",
         *               "blanc",
         *               "noir"
         *             ],
         *             "dimorphisme": "Très faible."
         *           },
         *           "conservation": {
         *             "monde": "LC",
         *             "france": "LC"
         *           },
         *           "rarete": "commun",
         *           "milieu": "Eau libre & grève",
         *           "periode": "Jour"
         *         }
         *       },
         *       "meta": {
         *         "license": {
         *           "content": {
         *             "id": "CC-BY-NC-SA-4.0",
         *             "name": "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International",
         *             "url": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
         *             "attribution": "Julien Julien — Loire Ride Zen"
         *           },
         *           "media": {
         *             "name": "All rights reserved",
         *             "copyright": "© 2026 Julien Julien — Loire Ride Zen",
         *             "reuseAllowed": false
         *           }
         *         }
         *       },
         *       "links": {
         *         "self": "/api/v1/indexes/faune/entries/heron-cendre",
         *         "index": "/api/v1/indexes/faune",
         *         "collection": "/api/v1/indexes/faune/entries"
         *       }
         *     }
         */
        EntryDetailResponse: {
            apiVersion: components["schemas"]["ApiVersion"];
            data: components["schemas"]["PublicEntry"];
            meta: {
                license: components["schemas"]["PublicLicenses"];
            };
            links: {
                self: string;
                index: string;
                collection: string;
            };
        };
        /**
         * @example {
         *       "type": "https://codex.loireridezen.bike/problems/not-found",
         *       "title": "Resource not found",
         *       "status": 404,
         *       "detail": "No published entry matches the requested identifier.",
         *       "instance": "/api/v1/indexes/faune/entries/entree-inconnue"
         *     }
         */
        Problem: {
            /** Format: uri */
            type: string;
            title: string;
            status: number;
            detail: string;
            instance: string;
        };
    };
    responses: {
        /** @description Identité et liens de découverte de l’API. */
        ApiRootSuccess: {
            headers: {
                "Cache-Control": components["headers"]["SuccessCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ApiRootResponse"];
            };
        };
        /** @description Liste complète des index publiés. */
        IndexCollectionSuccess: {
            headers: {
                "Cache-Control": components["headers"]["SuccessCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["IndexCollectionResponse"];
            };
        };
        /** @description Métadonnées publiques de l’index demandé. */
        IndexDetailSuccess: {
            headers: {
                "Cache-Control": components["headers"]["SuccessCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["IndexDetailResponse"];
            };
        };
        /** @description Collection complète des entrées de l’index. */
        EntryCollectionSuccess: {
            headers: {
                "Cache-Control": components["headers"]["SuccessCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["EntryCollectionResponse"];
            };
        };
        /** @description Entrée publique demandée. */
        EntryDetailSuccess: {
            headers: {
                "Cache-Control": components["headers"]["SuccessCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["EntryDetailResponse"];
            };
        };
        /** @description Aucune ressource publiée ne correspond aux identifiants demandés. */
        NotFound: {
            headers: {
                "Cache-Control": components["headers"]["NoStoreCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content: {
                "application/problem+json": components["schemas"]["Problem"];
            };
        };
        /** @description Le serveur n’a pas pu terminer la requête. */
        InternalServerError: {
            headers: {
                "Cache-Control": components["headers"]["NoStoreCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content: {
                "application/problem+json": components["schemas"]["Problem"];
            };
        };
        /** @description Statut et en-têtes du GET équivalent, sans corps. */
        HeadSuccess: {
            headers: {
                "Cache-Control": components["headers"]["SuccessCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Ressource absente, sans corps. */
        HeadNotFound: {
            headers: {
                "Cache-Control": components["headers"]["NoStoreCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Erreur interne générique, sans corps. */
        HeadInternalServerError: {
            headers: {
                "Cache-Control": components["headers"]["NoStoreCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Méthodes et en-têtes CORS autorisés. */
        OptionsNoContent: {
            headers: {
                Allow: components["headers"]["Allow"];
                "Cache-Control": components["headers"]["NoStoreCacheControl"];
                "Access-Control-Allow-Origin": components["headers"]["AllowOrigin"];
                "Access-Control-Allow-Methods": components["headers"]["AllowMethods"];
                "Access-Control-Allow-Headers": components["headers"]["AllowHeaders"];
                [name: string]: unknown;
            };
            content?: never;
        };
    };
    parameters: {
        /** @description Identifiant d’un index actuellement publié. */
        IndexPath: components["schemas"]["PublishedIndexSlug"];
        /** @description Slug immuable de l’entrée. */
        EntrySlugPath: components["schemas"]["EntrySlug"];
    };
    requestBodies: never;
    headers: {
        /**
         * @description Politique de cache public. Le CDN peut consommer les directives partagées avant de transmettre cet en-tête au client.
         * @example public, max-age=300
         */
        SuccessCacheControl: string;
        /**
         * @description Interdit la mise en cache de la réponse.
         * @example no-store
         */
        NoStoreCacheControl: "no-store";
        /**
         * @description Origine autorisée par CORS.
         * @example *
         */
        AllowOrigin: "*";
        /**
         * @description Méthodes autorisées par CORS.
         * @example GET, HEAD, OPTIONS
         */
        AllowMethods: "GET, HEAD, OPTIONS";
        /**
         * @description En-têtes de requête autorisés par CORS.
         * @example Content-Type
         */
        AllowHeaders: "Content-Type";
        /**
         * @description Méthodes HTTP prises en charge par la ressource.
         * @example GET, HEAD, OPTIONS
         */
        Allow: "GET, HEAD, OPTIONS";
    };
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getApiRoot: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ApiRootSuccess"];
            500: components["responses"]["InternalServerError"];
        };
    };
    optionsApiRoot: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: components["responses"]["OptionsNoContent"];
        };
    };
    headApiRoot: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["HeadSuccess"];
            500: components["responses"]["HeadInternalServerError"];
        };
    };
    listIndexes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["IndexCollectionSuccess"];
            500: components["responses"]["InternalServerError"];
        };
    };
    optionsIndexes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: components["responses"]["OptionsNoContent"];
        };
    };
    headIndexes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["HeadSuccess"];
            500: components["responses"]["HeadInternalServerError"];
        };
    };
    getIndex: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["IndexDetailSuccess"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    optionsIndex: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: components["responses"]["OptionsNoContent"];
        };
    };
    headIndex: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["HeadSuccess"];
            404: components["responses"]["HeadNotFound"];
            500: components["responses"]["HeadInternalServerError"];
        };
    };
    listIndexEntries: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["EntryCollectionSuccess"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    optionsIndexEntries: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: components["responses"]["OptionsNoContent"];
        };
    };
    headIndexEntries: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["HeadSuccess"];
            404: components["responses"]["HeadNotFound"];
            500: components["responses"]["HeadInternalServerError"];
        };
    };
    getIndexEntry: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
                /** @description Slug immuable de l’entrée. */
                slug: components["parameters"]["EntrySlugPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["EntryDetailSuccess"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    optionsIndexEntry: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
                /** @description Slug immuable de l’entrée. */
                slug: components["parameters"]["EntrySlugPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: components["responses"]["OptionsNoContent"];
        };
    };
    headIndexEntry: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Identifiant d’un index actuellement publié. */
                index: components["parameters"]["IndexPath"];
                /** @description Slug immuable de l’entrée. */
                slug: components["parameters"]["EntrySlugPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["HeadSuccess"];
            404: components["responses"]["HeadNotFound"];
            500: components["responses"]["HeadInternalServerError"];
        };
    };
}
