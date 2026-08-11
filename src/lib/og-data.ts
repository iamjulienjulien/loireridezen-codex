import chateauxData from "@data/catalogue-chateaux.json";
import guinguettesData from "@data/catalogue-guinguettes.json";
import personnagesData from "@data/catalogue-personnages.json";
import territoiresData from "@data/catalogue-territoires.json";
import fauneData from "@data/catalogue-faune.json";
import floreData from "@data/catalogue-flore.json";
import vignoblesData from "@data/catalogue-vignobles.json";

import { SITE_URL } from "@/lib/site-metadata";
import { getIndexBySlug } from "@/registry/indexes";
import { LRZ_VIGNOBLE_COULEUR_SYMBOLS } from "@/registry/symbols";
import type { ChateauV2 } from "@/types/chateauV2";
import type { FauneEspece } from "@/types/faune";
import type { Flore } from "@/types/flore";
import type { Guinguette } from "@/types/guinguette";
import type { Personnage } from "@/types/personnage";
import type { Territoire } from "@/types/territoire";
import type { Vignoble } from "@/types/vignoble";

export const CODEX_OG_ITEM_KINDS = [
    "chateau",
    "faune",
    "flore",
    "guinguette",
    "personnage",
    "territoire",
    "vignoble",
] as const;

export type CodexOgItemKind = (typeof CODEX_OG_ITEM_KINDS)[number];

export type CodexOgItem = {
    kind: CodexOgItemKind;
    indexSlug:
        | "chateaux"
        | "faune"
        | "flore"
        | "guinguettes"
        | "personnages"
        | "territoires"
        | "vignobles";
    indexTitle: string;
    indexMark: string;
    accent: string;
    title: string;
    subtitle: string;
    detail: string;
    visual?: string;
    visualAlt?: string;
    visualFit: "cover" | "contain";
};

const CHATEAUX = chateauxData.chateaux as ChateauV2[];
const FAUNE = fauneData.especes as FauneEspece[];
const FLORE = floreData.flore as Flore[];
const GUINGUETTES = guinguettesData.guinguettes as Guinguette[];
const PERSONNAGES = personnagesData.personnages as Personnage[];
const TERRITOIRES = territoiresData.territoires as Territoire[];
const VIGNOBLES = vignoblesData.vignobles as Vignoble[];

const toLabel = (value: string) =>
    value
        .replaceAll("-", " ")
        .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase("fr-FR"));

const getIndexIdentity = (slug: CodexOgItem["indexSlug"]) => {
    const index = getIndexBySlug(slug);

    if (!index) {
        throw new Error(`Index absent du registre OG : ${slug}.`);
    }

    return index;
};

const withIndexIdentity = (
    kind: CodexOgItemKind,
    indexSlug: CodexOgItem["indexSlug"],
    item: Omit<
        CodexOgItem,
        "kind" | "indexSlug" | "indexTitle" | "indexMark" | "accent"
    >,
): CodexOgItem => {
    const index = getIndexIdentity(indexSlug);

    return {
        kind,
        indexSlug,
        indexTitle: index.title,
        indexMark: index.mark,
        accent: index.accent,
        ...item,
    };
};

export const getCodexOgItem = (
    kind: CodexOgItemKind,
    slug: string,
): CodexOgItem | undefined => {
    if (kind === "chateau") {
        const chateau = CHATEAUX.find((entry) => entry.slug === slug);

        return chateau
            ? withIndexIdentity(kind, "chateaux", {
                  title: chateau.nom,
                  subtitle: chateau.sousTitre,
                  detail: `${chateau.epoque} · ${chateau.commune}`,
                  visual: chateau.illustrations.jour,
                  visualAlt: chateau.nom,
                  visualFit: "cover",
              })
            : undefined;
    }

    if (kind === "faune") {
        const espece = FAUNE.find((entry) => entry.slug === slug);

        return espece
            ? withIndexIdentity(kind, "faune", {
                  title: espece.nomCommun,
                  subtitle: espece.sousTitre,
                  detail: `${espece.nomScientifique} · ${toLabel(espece.type)}`,
                  visual: espece.customEmoji,
                  visualAlt: espece.nomCommun,
                  visualFit: "contain",
              })
            : undefined;
    }

    if (kind === "flore") {
        const plante = FLORE.find((entry) => entry.slug === slug);

        return plante
            ? withIndexIdentity(kind, "flore", {
                  title: plante.nomCommun,
                  subtitle: plante.sousTitre,
                  detail: `${plante.nomScientifique} · ${toLabel(plante.categorie)}`,
                  visual: plante.customEmoji,
                  visualAlt: plante.nomCommun,
                  visualFit: "contain",
              })
            : undefined;
    }

    if (kind === "guinguette") {
        const guinguette = GUINGUETTES.find((entry) => entry.slug === slug);

        return guinguette
            ? withIndexIdentity(kind, "guinguettes", {
                  title: guinguette.nom,
                  subtitle:
                      guinguette.sousTitre ?? "Une halte au fil de la Loire",
                  detail: `${guinguette.commune} · ${toLabel(guinguette.type)}`,
                  visualFit: "contain",
              })
            : undefined;
    }

    if (kind === "personnage") {
        const personnage = PERSONNAGES.find((entry) => entry.id === slug);

        return personnage
            ? withIndexIdentity(kind, "personnages", {
                  title: personnage.nom,
                  subtitle:
                      personnage.roles[0] ?? "Figure des récits ligériens",
                  detail: toLabel(personnage.categoriePrincipale),
                  visual: personnage.illustration,
                  visualAlt: personnage.nom,
                  visualFit: "contain",
              })
            : undefined;
    }

    if (kind === "vignoble") {
        const vignoble = VIGNOBLES.find((entry) => entry.slug === slug);

        return vignoble
            ? withIndexIdentity(kind, "vignobles", {
                  title: vignoble.nom,
                  subtitle: vignoble.sousTitre,
                  detail: `${vignoble.appellation.niveau} · ${vignoble.rive}`,
                  visual: LRZ_VIGNOBLE_COULEUR_SYMBOLS[vignoble.couleur],
                  visualAlt: `Robe ${vignoble.couleur} de ${vignoble.nom}`,
                  visualFit: "contain",
              })
            : undefined;
    }

    const territoire = TERRITOIRES.find((entry) => entry.slug === slug);

    return territoire
        ? withIndexIdentity(kind, "territoires", {
              title: territoire.nom,
              subtitle: territoire.sousTitre,
              detail: `${toLabel(territoire.nature)} · ${toLabel(territoire.paysage)}`,
              visual: territoire.identite.blason,
              visualAlt: territoire.identite.blasonAlt,
              visualFit: "contain",
          })
        : undefined;
};

export const getCodexOgImageUrl = (kind: CodexOgItemKind, slug: string) =>
    new URL(`/api/og/${kind}/${slug}`, SITE_URL).toString();
