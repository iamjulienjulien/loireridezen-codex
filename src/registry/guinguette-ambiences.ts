// src/registry/guinguette-ambiences.ts

import type { LucideIcon } from "lucide-react";
import {
    Anchor,
    Armchair,
    Building2,
    Caravan,
    Clock3,
    Flower2,
    HandHeart,
    Heart,
    Landmark,
    Leaf,
    MapPinned,
    Music2,
    Palette,
    PartyPopper,
    ShipWheel,
    Sunset,
    Trees,
    UsersRound,
    UtensilsCrossed,
    Waves,
    Wheat,
} from "lucide-react";

import type { LRZBadgeVariant } from "@/components/LRZBadge/LRZBadge";
import {
    isGuinguetteAmbience,
    type GuinguetteAmbience,
} from "@/registry/Meta/guinguette-ambience";
import type { LRZColor } from "@/types/lrz";

export const GUINGUETTE_AMBIENCE_REGISTRY = {
    traditionnelle: {
        label: "Traditionnelle",
        icon: Landmark,
        color: "ocre",
        variant: "plaque",
        description: "Esprit des guinguettes historiques et tables de rivière.",
    },

    familiale: {
        label: "Familiale",
        icon: UsersRound,
        color: "prairie",
        variant: "pill",
        description:
            "Une adresse adaptée aux tablées et aux sorties en famille.",
    },

    "bord de rivière": {
        label: "Bord de rivière",
        icon: Waves,
        color: "bleu-gris",
        variant: "trail",
        description: "Une halte installée directement au fil de l’eau.",
    },

    festive: {
        label: "Festive",
        icon: PartyPopper,
        color: "orange",
        variant: "medallion",
        description: "Une ambiance animée, vivante et volontiers nocturne.",
    },

    musicale: {
        label: "Musicale",
        icon: Music2,
        color: "orange-cuivre",
        variant: "ticket",
        description: "Concerts, bals, scènes ou rendez-vous musicaux.",
    },

    conviviale: {
        label: "Conviviale",
        icon: HandHeart,
        color: "fauve",
        variant: "pill",
        description: "Une atmosphère simple, accueillante et généreuse.",
    },

    bucolique: {
        label: "Bucolique",
        icon: Flower2,
        color: "roseau",
        variant: "herbarium",
        description: "Prairies, jardins et paysages doucement champêtres.",
    },

    nature: {
        label: "Nature",
        icon: Leaf,
        color: "prairie",
        variant: "leaf",
        description: "Une adresse immergée dans un environnement végétal.",
    },

    décontractée: {
        label: "Décontractée",
        icon: Armchair,
        color: "galet",
        variant: "default",
        description: "Une halte sans cérémonie, facile et spontanée.",
    },

    urbaine: {
        label: "Urbaine",
        icon: Building2,
        color: "gris-ardoise",
        variant: "plaque",
        description: "Une guinguette inscrite dans un paysage de ville.",
    },

    paisible: {
        label: "Paisible",
        icon: Trees,
        color: "roseau",
        variant: "leaf",
        description:
            "Un cadre calme, propice à la pause et à la contemplation.",
    },

    gourmande: {
        label: "Gourmande",
        icon: UtensilsCrossed,
        color: "orange-cuivre",
        variant: "ticket",
        description:
            "Une adresse où la cuisine constitue une vraie destination.",
    },

    romantique: {
        label: "Romantique",
        icon: Heart,
        color: "rouge",
        variant: "crest",
        description: "Un cadre intime, élégant ou particulièrement évocateur.",
    },

    "bord de Loire": {
        label: "Bord de Loire",
        icon: ShipWheel,
        color: "bleu-gris",
        variant: "trail",
        description: "Une adresse directement liée au paysage du fleuve.",
    },

    champêtre: {
        label: "Champêtre",
        icon: Wheat,
        color: "ocre",
        variant: "herbarium",
        description: "Une ambiance rurale entre herbes hautes et chemins.",
    },

    "coucher de soleil": {
        label: "Coucher de soleil",
        icon: Sunset,
        color: "orange",
        variant: "medallion",
        description: "Une adresse particulièrement agréable en fin de journée.",
    },

    portuaire: {
        label: "Portuaire",
        icon: Anchor,
        color: "gris-ardoise",
        variant: "shield",
        description: "Quais, ports, bateaux et mémoire de la navigation.",
    },

    populaire: {
        label: "Populaire",
        icon: UsersRound,
        color: "fauve",
        variant: "plaque",
        description: "Un esprit vivant, accessible et profondément collectif.",
    },

    insulaire: {
        label: "Insulaire",
        icon: Waves,
        color: "bleu-gris",
        variant: "medallion",
        description:
            "Une halte située sur une île ou marquée par son isolement.",
    },

    locale: {
        label: "Locale",
        icon: MapPinned,
        color: "vert-metallise",
        variant: "shield",
        description:
            "Cuisine, produits ou programmation ancrés dans le territoire.",
    },

    itinérante: {
        label: "Itinérante",
        icon: Caravan,
        color: "ocre",
        variant: "trail",
        description: "Une guinguette mobile dont l’emplacement peut évoluer.",
    },

    culturelle: {
        label: "Culturelle",
        icon: Palette,
        color: "bleu-gris",
        variant: "crest",
        description:
            "Arts, spectacles, rencontres ou programmation culturelle.",
    },

    éphémère: {
        label: "Éphémère",
        icon: Clock3,
        color: "galet",
        variant: "ticket",
        description: "Une présence ponctuelle ou limitée à une programmation.",
    },
} as const satisfies Record<
    GuinguetteAmbience,
    {
        label: string;
        icon: LucideIcon;
        color: LRZColor;
        variant: LRZBadgeVariant;
        description: string;
    }
>;

export type GuinguetteAmbienceDefinition =
    (typeof GUINGUETTE_AMBIENCE_REGISTRY)[GuinguetteAmbience];

export {
    isGuinguetteAmbience,
    type GuinguetteAmbience,
} from "@/registry/Meta/guinguette-ambience";

export function getGuinguetteAmbienceDefinition(
    value: string,
): GuinguetteAmbienceDefinition | null {
    if (!isGuinguetteAmbience(value)) {
        return null;
    }

    return GUINGUETTE_AMBIENCE_REGISTRY[value];
}
