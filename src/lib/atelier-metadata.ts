import { buildPageMetadata } from "@/lib/site-metadata";
import { getAtelierPageDefinition } from "@/registry/atelier-pages";

export const getAtelierPageMetadata = (href: string) =>
    buildPageMetadata(getAtelierPageDefinition(href));
