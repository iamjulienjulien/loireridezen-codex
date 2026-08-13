import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";

const EARTH_RADIUS_KM = 6_371.0088;

export const DEFAULT_NEARBY_GUINGUETTES_RADIUS_KM = 1.5;
export const DEFAULT_NEARBY_GUINGUETTES_LIMIT = 3;

type Coordinates = {
    latitude: number;
    longitude: number;
};

export type NearbyGuinguette = {
    guinguette: Guinguette;
    distanceKm: number;
};

export type NearbyGuinguettesOptions = {
    radiusKm?: number;
    limit?: number;
};

const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);

const hasValidCoordinates = (
    coordinates: Partial<Coordinates>,
): coordinates is Coordinates =>
    Number.isFinite(coordinates.latitude) &&
    Number.isFinite(coordinates.longitude) &&
    Math.abs(coordinates.latitude ?? Infinity) <= 90 &&
    Math.abs(coordinates.longitude ?? Infinity) <= 180;

export const getGeographicDistanceKm = (
    from: Coordinates,
    to: Coordinates,
): number => {
    if (!hasValidCoordinates(from) || !hasValidCoordinates(to)) {
        return Number.NaN;
    }

    const latitudeDelta = degreesToRadians(to.latitude - from.latitude);
    const longitudeDelta = degreesToRadians(to.longitude - from.longitude);
    const fromLatitude = degreesToRadians(from.latitude);
    const toLatitude = degreesToRadians(to.latitude);

    const haversine =
        Math.sin(latitudeDelta / 2) ** 2 +
        Math.cos(fromLatitude) *
            Math.cos(toLatitude) *
            Math.sin(longitudeDelta / 2) ** 2;

    return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(haversine)));
};

export const getNearbyGuinguettes = (
    chateau: Chateau,
    guinguettes: readonly Guinguette[],
    options: NearbyGuinguettesOptions = {},
): NearbyGuinguette[] => {
    const radiusKm = options.radiusKm ?? DEFAULT_NEARBY_GUINGUETTES_RADIUS_KM;
    const limit = options.limit ?? DEFAULT_NEARBY_GUINGUETTES_LIMIT;
    const origin = {
        latitude: chateau.coordonnees.lat,
        longitude: chateau.coordonnees.lng,
    };

    if (
        !hasValidCoordinates(origin) ||
        !Number.isFinite(radiusKm) ||
        radiusKm < 0 ||
        !Number.isInteger(limit) ||
        limit <= 0
    ) {
        return [];
    }

    return guinguettes
        .flatMap((guinguette): NearbyGuinguette[] => {
            const position = {
                latitude: guinguette.position.latitude ?? undefined,
                longitude: guinguette.position.longitude ?? undefined,
            };

            if (
                guinguette.statut === "historique" ||
                !hasValidCoordinates(position)
            ) {
                return [];
            }

            const distanceKm = getGeographicDistanceKm(origin, position);

            return distanceKm <= radiusKm ? [{ guinguette, distanceKm }] : [];
        })
        .sort(
            (left, right) =>
                left.distanceKm - right.distanceKm ||
                left.guinguette.nom.localeCompare(right.guinguette.nom, "fr"),
        )
        .slice(0, limit);
};

const DISTANCE_KM_FORMATTER = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
});

export const formatDistanceKm = (distanceKm: number): string => {
    if (!Number.isFinite(distanceKm) || distanceKm < 0) {
        throw new RangeError("La distance doit être un nombre positif fini.");
    }

    if (distanceKm < 1) {
        const distanceMeters = Math.round((distanceKm * 1_000) / 10) * 10;
        return `${distanceMeters} m`;
    }

    return `${DISTANCE_KM_FORMATTER.format(distanceKm)} km`;
};
