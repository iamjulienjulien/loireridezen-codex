export type CardReturnHref = `/vignoble/${string}` | `/territoire/${string}`;

export type CardReturnContext = {
    href: CardReturnHref;
    label: string;
};

export type CardReturnCatalogs = {
    vignobles: readonly { slug: string; nom: string }[];
    territoires: readonly { slug: string; nom: string }[];
};

const CARD_RETURN_PATH =
    /^\/(vignoble|territoire)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;

export const resolveCardReturnContext = (
    value: string | readonly string[] | undefined,
    catalogs: CardReturnCatalogs,
): CardReturnContext | undefined => {
    if (typeof value !== "string") {
        return undefined;
    }

    const match = CARD_RETURN_PATH.exec(value);
    if (!match) {
        return undefined;
    }

    const [, type, slug] = match;
    const source =
        type === "vignoble" ? catalogs.vignobles : catalogs.territoires;
    const entry = source.find((candidate) => candidate.slug === slug);

    return entry
        ? {
              href: value as CardReturnHref,
              label: entry.nom,
          }
        : undefined;
};

export const buildCardHrefWithReturn = (
    href: CardReturnHref,
    returnHref?: CardReturnHref,
): string =>
    returnHref === undefined
        ? href
        : `${href}?retour=${encodeURIComponent(returnHref)}`;
