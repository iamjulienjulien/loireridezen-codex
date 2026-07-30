export const CHATEAUX_MAP_SYNC_EVENT = "lrz:chateaux-map-sync";

export type ChateauxMapSyncDetail =
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
      };

type ViewportSyncDetail = Extract<ChateauxMapSyncDetail, { type: "viewport" }>;
type TerritorySyncDetail = Extract<
    ChateauxMapSyncDetail,
    { type: "territory" }
>;

let latestViewport: ViewportSyncDetail | undefined;
let latestTerritory: TerritorySyncDetail | undefined;

export function dispatchChateauxMapSync(detail: ChateauxMapSyncDetail) {
    if (detail.type === "viewport") latestViewport = detail;
    if (detail.type === "territory") latestTerritory = detail;

    window.dispatchEvent(
        new CustomEvent<ChateauxMapSyncDetail>(CHATEAUX_MAP_SYNC_EVENT, {
            detail,
        }),
    );
}

export function getLatestChateauxMapViewport() {
    return latestViewport;
}

export function getLatestChateauxMapTerritory() {
    return latestTerritory;
}
