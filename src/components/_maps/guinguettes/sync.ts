export const GUINGUETTES_MAP_SYNC_EVENT = "lrz:guinguettes-map-sync";

export type GuinguettesMapSyncDetail =
    | {
          source: "catalogue";
          type: "viewport";
          visibleSlugs: string[];
          primarySlug?: string;
      }
    | {
          source: "catalogue";
          type: "territory";
          territorySlug?: string;
      }
    | {
          source: "catalogue" | "map";
          type: "hover";
          slug?: string;
      }
    | {
          source: "catalogue";
          type: "focus";
          slug: string;
      };

type ViewportSyncDetail = Extract<
    GuinguettesMapSyncDetail,
    { type: "viewport" }
>;
type TerritorySyncDetail = Extract<
    GuinguettesMapSyncDetail,
    { type: "territory" }
>;
type CatalogueHoverSyncDetail = {
    source: "catalogue";
    type: "hover";
    slug?: string;
};
type FocusSyncDetail = Extract<GuinguettesMapSyncDetail, { type: "focus" }>;

let latestViewport: ViewportSyncDetail | undefined;
let latestTerritory: TerritorySyncDetail | undefined;
let latestCatalogueHover: CatalogueHoverSyncDetail | undefined;
let latestFocus: FocusSyncDetail | undefined;

export function dispatchGuinguettesMapSync(detail: GuinguettesMapSyncDetail) {
    if (detail.type === "viewport") latestViewport = detail;
    if (detail.type === "territory") latestTerritory = detail;
    if (detail.source === "catalogue" && detail.type === "hover") {
        latestCatalogueHover = {
            source: "catalogue",
            type: "hover",
            slug: detail.slug,
        };
    }
    if (detail.type === "focus") latestFocus = detail;

    window.dispatchEvent(
        new CustomEvent<GuinguettesMapSyncDetail>(GUINGUETTES_MAP_SYNC_EVENT, {
            detail,
        }),
    );
}

export function getLatestGuinguettesMapViewport() {
    return latestViewport;
}

export function getLatestGuinguettesMapTerritory() {
    return latestTerritory;
}

export function getLatestGuinguettesMapCatalogueHover():
    CatalogueHoverSyncDetail | undefined {
    return latestCatalogueHover;
}

export function getLatestGuinguettesMapFocus(): FocusSyncDetail | undefined {
    return latestFocus;
}
