import chateauxData from "@data/catalogue-chateaux.json";
import guinguettesData from "@data/catalogue-guinguettes.json";

import PageShell from "@/components/layout/PageShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getContentPageDefinition } from "@/registry/pages";
import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";

import CarteMap, { type CarteMarker } from "./CarteMap";
import styles from "./carte.module.css";

const CARTE_PAGE = getContentPageDefinition("/carte");

export const metadata = buildPageMetadata(CARTE_PAGE);

const chateaux = chateauxData.chateaux as Chateau[];
const guinguettes = guinguettesData.guinguettes as Guinguette[];

const markers: CarteMarker[] = [
    ...chateaux.map((chateau) => ({
        id: `chateau:${chateau.slug}`,
        kind: "chateau" as const,
        title: chateau.nom,
        detail: `${chateau.commune} · ${chateau.epoque}`,
        href: `/chateau/${chateau.slug}`,
        longitude: chateau.coordonnees.lng,
        latitude: chateau.coordonnees.lat,
    })),
    ...guinguettes.flatMap((guinguette) => {
        const { latitude, longitude } = guinguette.position;

        if (
            typeof latitude !== "number" ||
            !Number.isFinite(latitude) ||
            typeof longitude !== "number" ||
            !Number.isFinite(longitude)
        ) {
            return [];
        }

        return [
            {
                id: `guinguette:${guinguette.slug}`,
                kind: "guinguette" as const,
                title: guinguette.nom,
                detail: `${guinguette.commune} · ${guinguette.type.replaceAll("-", " ")}`,
                href: `/guinguette/${guinguette.slug}`,
                longitude,
                latitude,
            },
        ];
    }),
];

export default function CartePage() {
    return (
        <PageShell
            page={CARTE_PAGE}
            width="wide"
            spacing="compact"
            mainClassName={styles.main}
        >
            <CarteMap markers={markers} />
        </PageShell>
    );
}
