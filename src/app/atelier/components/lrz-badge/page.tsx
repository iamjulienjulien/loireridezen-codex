import type { Metadata } from "next";
import Link from "next/link";
import LRZBadge, { type LRZBadgeProps } from "@/components/LRZBadge/LRZBadge";
import type { LRZColor } from "@/types/lrz";
import LRZBadgePlayground from "./LRZBadgePlayground";
import styles from "./lrz-badge.module.css";

export const metadata: Metadata = {
    title: "LRZBadge — Atelier du Codex ligérien",
    description:
        "Variantes du composant de statut partagé par les index du Codex ligérien.",
};

type BadgeExample = LRZBadgeProps & {
    name: string;
};

type ExampleGroup = {
    title: string;
    description: string;
    examples: BadgeExample[];
};

type ColorGroup = {
    title: string;
    colors: LRZColor[];
};

const GROUPS: ExampleGroup[] = [
    {
        title: "Statut d’extinction · Faune",
        description:
            "Le code UICN reste le repère principal, accompagné de son libellé complet.",
        examples: [
            {
                name: "Préoccupation mineure",
                color: "vert-metallise",
                label: "LC",
                detail: "Préoccupation mineure",
            },
            {
                name: "Quasi menacé",
                color: "ocre",
                label: "NT",
                detail: "Quasi menacé",
            },
            {
                name: "Vulnérable",
                color: "orange",
                label: "VU",
                detail: "Vulnérable",
            },
            {
                name: "En danger",
                color: "orange-cuivre",
                label: "EN",
                detail: "En danger",
            },
            {
                name: "En danger critique",
                color: "rouge",
                label: "CR",
                detail: "En danger critique",
            },
            {
                name: "Non applicable",
                color: "galet",
                label: "NA",
                detail: "Non applicable",
            },
        ],
    },
    {
        title: "Indigénat · Flore",
        description:
            "Le vert signale l’indigène, le neutre l’exotique et le corail l’espèce envahissante.",
        examples: [
            {
                name: "Indigène",
                color: "vert-metallise",
                label: "Indigène",
            },
            { name: "Exotique", color: "galet", label: "Exotique" },
            {
                name: "Envahissante",
                color: "orange-cuivre",
                label: "Envahissante",
            },
        ],
    },
    {
        title: "Protection · Flore",
        description:
            "Une gamme bleue distingue les niveaux de protection botanique.",
        examples: [
            {
                name: "Nationale",
                color: "gris-ardoise",
                label: "Nationale",
            },
            {
                name: "Régionale",
                color: "bleu-gris",
                label: "Régionale",
            },
            {
                name: "Non protégée",
                color: "galet",
                label: "Non protégée",
            },
        ],
    },
    {
        title: "Monument historique · Châteaux",
        description:
            "Les protections patrimoniales reprennent le vert, l’ocre et le neutre.",
        examples: [
            {
                name: "Classé",
                color: "vert-metallise",
                label: "Classé",
            },
            { name: "Inscrit", color: "ocre", label: "Inscrit" },
            {
                name: "Non protégé",
                color: "galet",
                label: "Non protégé",
            },
        ],
    },
    {
        title: "UNESCO · Châteaux",
        description:
            "Le bleu identifie le périmètre Val de Loire inscrit au patrimoine mondial.",
        examples: [
            {
                name: "Val de Loire",
                color: "ardoise",
                label: "Val de Loire",
            },
            {
                name: "Hors périmètre",
                color: "galet",
                label: "Hors périmètre",
            },
        ],
    },
];

const COLOR_GROUPS: ColorGroup[] = [
    {
        title: "Nature",
        colors: [
            "prairie",
            "roseau",
            "foret",
            "sable",
            "galet",
            "eau",
            "eau-claire",
            "ciel",
            "soleil",
            "coucher",
        ],
    },
    {
        title: "Faune",
        colors: [
            "blanc",
            "blanc-gris",
            "argent",
            "gris",
            "gris-ardoise",
            "gris-brun",
            "noir",
            "beige",
            "creme",
            "ocre",
            "fauve",
            "brun",
            "brun-roux",
            "brun-fonce",
            "jaune",
            "orange",
            "orange-cuivre",
            "roux",
            "rouge",
            "vert",
            "vert-vif",
            "vert-olive",
            "vert-metallise",
            "bleu",
            "bleu-gris",
            "bleu-turquoise",
            "bleu-metallise",
        ],
    },
    {
        title: "Patrimoine",
        colors: ["pierre", "ardoise", "brique", "tuffeau"],
    },
];

const PROPS = [
    {
        name: "label",
        type: "ReactNode",
        required: "Oui",
        defaultValue: "—",
        description:
            "Contenu principal du badge, par exemple « LC » ou « Indigène ».",
    },
    {
        name: "detail",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Libellé secondaire affiché après label dans une typographie plus discrète.",
    },
    {
        name: "color",
        type: "LRZColor",
        required: "Non",
        defaultValue: '"galet"',
        description:
            "Une des 41 couleurs partagées LRZ pour le texte, le point et le fond.",
    },
    {
        name: "title",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Infobulle native portée par le badge.",
    },
    {
        name: "className",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Classe externe facultative pour adapter le placement du composant.",
    },
] as const;

export default function LRZBadgePage() {
    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZBadge</h1>
                    <p className={styles.lede}>
                        Un indicateur compact pour les statuts éditoriaux,
                        construit sur la palette partagée <code>LRZColor</code>.
                        Il couvre la conservation de la faune, l’indigénat et la
                        protection de la flore, ainsi que les classements
                        patrimoniaux.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="main-example-title"
                >
                    <div className={styles.mainExamplePreview}>
                        <h2 id="main-example-title">
                            Un statut lisible d’un coup d’œil
                        </h2>
                        <p>
                            Le code reste compact, tandis que le détail apporte
                            le contexte nécessaire.
                        </p>
                        <LRZBadge
                            color="vert-metallise"
                            label="LC"
                            detail="Préoccupation mineure"
                            title="Statut UICN"
                        />
                    </div>
                    <pre className={styles.mainExampleCode}>
                        <code>{`<LRZBadge
    color="vert-metallise"
    label="LC"
    detail="Préoccupation mineure"
    title="Statut UICN"
/>`}</code>
                    </pre>
                </section>

                <section
                    className={styles.usageExamples}
                    aria-labelledby="usage-examples-title"
                >
                    <header className={styles.usageExamplesHeader}>
                        <p className={styles.kicker}>Cas métier</p>
                        <h2 id="usage-examples-title">
                            Exemples d’utilisation
                        </h2>
                    </header>
                    <div className={styles.groups}>
                        {GROUPS.map((group) => (
                            <section className={styles.group} key={group.title}>
                                <div className={styles.groupHeader}>
                                    <h3>{group.title}</h3>
                                    <p>{group.description}</p>
                                </div>
                                <div className={styles.examples}>
                                    {group.examples.map(
                                        ({ name, color, label, detail }) => (
                                            <article
                                                className={styles.example}
                                                key={name}
                                            >
                                                <span
                                                    className={
                                                        styles.exampleName
                                                    }
                                                >
                                                    {name}
                                                </span>
                                                <LRZBadge
                                                    color={color}
                                                    label={label}
                                                    detail={detail}
                                                />
                                                <code>{color}</code>
                                            </article>
                                        ),
                                    )}
                                </div>
                            </section>
                        ))}
                    </div>
                </section>

                <LRZBadgePlayground />

                <section className={styles.props} aria-labelledby="props-title">
                    <div className={styles.propsHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="props-title">Props</h2>
                        <p>
                            L’API reste indépendante des usages métier. Les
                            textes peuvent être de simples chaînes ou tout autre
                            nœud React.
                        </p>
                    </div>
                    <div className={styles.tableScroll}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Prop</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Requise</th>
                                    <th scope="col">Défaut</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PROPS.map((prop) => (
                                    <tr key={prop.name}>
                                        <th scope="row">
                                            <code>{prop.name}</code>
                                        </th>
                                        <td>
                                            <code>{prop.type}</code>
                                        </td>
                                        <td>{prop.required}</td>
                                        <td>
                                            <code>{prop.defaultValue}</code>
                                        </td>
                                        <td>{prop.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section
                    className={styles.palette}
                    aria-labelledby="palette-title"
                >
                    <div className={styles.paletteHeader}>
                        <p className={styles.kicker}>Palette</p>
                        <h2 id="palette-title">LRZColor</h2>
                    </div>

                    <div className={styles.colorGroups}>
                        {COLOR_GROUPS.map((group) => (
                            <section
                                className={styles.colorGroup}
                                key={group.title}
                            >
                                <h3>{group.title}</h3>
                                <div className={styles.colorGrid}>
                                    {group.colors.map((color) => (
                                        <article
                                            className={styles.colorExample}
                                            key={color}
                                        >
                                            <LRZBadge
                                                color={color}
                                                label={color}
                                            />
                                            <code>{color}</code>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
