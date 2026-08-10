import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";
import LRZSeparateur, {
    type LRZSeparateurProps,
} from "@/components/LRZSeparateur/LRZSeparateur";
import { LRZ_COLOR_GROUPS, LRZ_COLOR_VARIABLES } from "@/registry/colors";
import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZSeparateurPlayground from "./LRZSeparateurPlayground";
import styles from "./LRZSeparateurPlayground.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-separateur",
);

type SeparatorExample = LRZSeparateurProps & {
    name: string;
    code: string;
};

type ExampleGroup = {
    title: string;
    description: string;
    examples: SeparatorExample[];
};

const PRESETS: Array<{
    preset: NonNullable<LRZSeparateurProps["preset"]>;
    title: string;
    description: string;
    color?: LRZSeparateurProps["color"];
}> = [
    {
        preset: "simple",
        title: "Simple",
        description:
            "Une ligne continue et discrète pour séparer deux éléments proches.",
        color: "galet",
    },
    {
        preset: "spark",
        title: "Étincelle",
        description:
            "Le séparateur emblématique des grandes respirations éditoriales.",
        color: "ocre",
    },
    {
        preset: "diamond",
        title: "Losange",
        description:
            "Une ponctuation patrimoniale adaptée aux chapitres et sous-sections.",
        color: "sable",
    },
    {
        preset: "dot",
        title: "Point",
        description:
            "Une variante minimale pour les contenus denses et les métadonnées.",
        color: "bleu-gris",
    },
    {
        preset: "ornament",
        title: "Ornement",
        description:
            "Un motif enrichi pouvant être remplacé par un élément personnalisé.",
        color: "vert-metallise",
    },
    {
        preset: "fade",
        title: "Fondu",
        description:
            "Une transition atmosphérique dont les extrémités disparaissent.",
        color: "galet",
    },
    {
        preset: "none",
        title: "Espacement seul",
        description:
            "Conserve le rythme vertical sans afficher de trait ni d’ornement.",
        color: "galet",
    },
];

const GROUPS: ExampleGroup[] = [
    {
        title: "Séparer des sections",
        description:
            "Une respiration large entre les grands chapitres de la page : présentation, collections, exploration, carte et catalogue.",
        examples: [
            {
                name: "Étincelle principale",
                code: 'scope="section" preset="spark"',
                scope: "section",
                preset: "spark",
                size: "lg",
                tone: "muted",
                color: "ocre",
            },
            {
                name: "Transition douce",
                code: 'scope="section" preset="fade"',
                scope: "section",
                preset: "fade",
                size: "lg",
                tone: "subtle",
                color: "galet",
            },
            {
                name: "Chapitre patrimonial",
                code: 'scope="section" preset="diamond"',
                scope: "section",
                preset: "diamond",
                size: "lg",
                tone: "muted",
                color: "sable",
            },
        ],
    },
    {
        title: "Séparer des contenus",
        description:
            "Des coupures plus compactes à l’intérieur d’une fiche, d’un panneau ou d’un bloc éditorial.",
        examples: [
            {
                name: "Trait simple",
                code: 'scope="content" preset="simple"',
                scope: "content",
                preset: "simple",
                size: "sm",
                tone: "subtle",
                color: "galet",
            },
            {
                name: "Point central",
                code: 'scope="content" preset="dot"',
                scope: "content",
                preset: "dot",
                size: "sm",
                tone: "muted",
                color: "bleu-gris",
            },
            {
                name: "Petit losange",
                code: 'scope="content" preset="diamond"',
                scope: "content",
                preset: "diamond",
                size: "xs",
                tone: "subtle",
                color: "sable",
            },
        ],
    },
    {
        title: "Libellés et alignements",
        description:
            "Le contenu central peut porter un mot court et être déplacé vers le début ou la fin du séparateur.",
        examples: [
            {
                name: "Libellé centré",
                code: 'label="Explorer"',
                scope: "content",
                preset: "simple",
                label: "Explorer",
                size: "md",
                tone: "muted",
                color: "ocre",
            },
            {
                name: "Aligné au début",
                code: 'label="Catalogue" align="start"',
                scope: "content",
                preset: "simple",
                label: "Catalogue",
                align: "start",
                size: "md",
                tone: "muted",
                color: "bleu-gris",
            },
            {
                name: "Aligné à la fin",
                code: 'label="Territoires" align="end"',
                scope: "content",
                preset: "simple",
                label: "Territoires",
                align: "end",
                size: "md",
                tone: "muted",
                color: "vert-metallise",
            },
        ],
    },
];

const VERTICAL_EXAMPLES: SeparatorExample[] = [
    {
        name: "Trait vertical",
        code: 'orientation="vertical"',
        orientation: "vertical",
        scope: "content",
        preset: "simple",
        size: "lg",
        tone: "subtle",
        color: "galet",
        marginBlock: "16px",
    },
    {
        name: "Étincelle verticale",
        code: 'orientation="vertical" preset="spark"',
        orientation: "vertical",
        scope: "content",
        preset: "spark",
        size: "lg",
        tone: "muted",
        color: "ocre",
        marginBlock: "16px",
    },
    {
        name: "Losange vertical",
        code: 'orientation="vertical" preset="diamond"',
        orientation: "vertical",
        scope: "content",
        preset: "diamond",
        size: "lg",
        tone: "muted",
        color: "sable",
        marginBlock: "16px",
    },
];

const PROPS = [
    {
        name: "scope",
        type: '"section" | "content"',
        required: "Non",
        defaultValue: '"content"',
        description:
            "Définit le contexte d’utilisation et ajuste les espacements, la taille et la tonalité par défaut.",
    },
    {
        name: "preset",
        type: '"simple" | "spark" | "diamond" | "dot" | "ornament" | "fade" | "none"',
        required: "Non",
        defaultValue: '"simple"',
        description: "Sélectionne la composition visuelle du séparateur.",
    },
    {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        required: "Non",
        defaultValue: '"horizontal"',
        description: "Détermine l’axe principal du composant.",
    },
    {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        required: "Non",
        defaultValue: "selon scope",
        description:
            "Contrôle les espacements, la longueur minimale et les dimensions de l’ornement.",
    },
    {
        name: "weight",
        type: '"hairline" | "thin" | "regular"',
        required: "Non",
        defaultValue: '"hairline"',
        description: "Contrôle l’épaisseur des traits.",
    },
    {
        name: "tone",
        type: '"subtle" | "muted" | "normal" | "strong"',
        required: "Non",
        defaultValue: "selon scope",
        description: "Contrôle l’opacité des traits et du contenu central.",
    },
    {
        name: "color",
        type: "LRZColor",
        required: "Non",
        defaultValue: '"galet"',
        description:
            "Applique une couleur issue de la palette partagée Loire Ride Zen.",
    },
    {
        name: "align",
        type: '"start" | "center" | "end"',
        required: "Non",
        defaultValue: '"center"',
        description:
            "Déplace le centre visuel et modifie la proportion des deux traits.",
    },
    {
        name: "ornament",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Remplace l’ornement fourni par le preset avec un contenu personnalisé.",
    },
    {
        name: "label",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Ajoute un petit libellé central, prioritaire sur ornament et sur le motif du preset.",
    },
    {
        name: "maxWidth",
        type: "CSSProperties['maxWidth']",
        required: "Non",
        defaultValue: "selon scope",
        description: "Définit la largeur maximale du séparateur.",
    },
    {
        name: "minLineLength",
        type: "CSSProperties['minWidth']",
        required: "Non",
        defaultValue: "selon size",
        description: "Définit la longueur minimale de chaque segment.",
    },
    {
        name: "gap",
        type: "CSSProperties['gap']",
        required: "Non",
        defaultValue: "selon size",
        description: "Contrôle l’espace entre les traits et le centre.",
    },
    {
        name: "marginBlock",
        type: "CSSProperties['marginBlock']",
        required: "Non",
        defaultValue: "selon scope et size",
        description: "Remplace l’espacement vertical ou latéral extérieur.",
    },
    {
        name: "fadeEdges",
        type: "boolean",
        required: "Non",
        defaultValue: "false",
        description: "Ajoute un fondu progressif aux extrémités des traits.",
    },
    {
        name: "hideOnMobile",
        type: "boolean",
        required: "Non",
        defaultValue: "false",
        description: "Masque le séparateur sous 640 pixels.",
    },
    {
        name: "compactOnMobile",
        type: "boolean",
        required: "Non",
        defaultValue: "true",
        description:
            "Réduit automatiquement les dimensions et les espacements sur mobile.",
    },
    {
        name: "as",
        type: "ElementType",
        required: "Non",
        defaultValue: '"div"',
        description: "Permet de remplacer l’élément HTML racine du composant.",
    },
    {
        name: "id",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Identifiant HTML, notamment utilisable comme ancre.",
    },
    {
        name: "className",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Classe externe facultative pour ajuster le placement.",
    },
    {
        name: "style",
        type: "CSSProperties",
        required: "Non",
        defaultValue: "undefined",
        description: "Styles supplémentaires appliqués à l’élément racine.",
    },
    {
        name: "ariaLabel",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Donne un rôle sémantique au séparateur. Sans label, il reste décoratif.",
    },
] as const;

export default function LRZSeparateurPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-separateur" />

            <div className={styles.wrap}>
                <header className={styles.pageHeader}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>

                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>

                    <h1 className={styles.title}>LRZSeparateur</h1>

                    <p className={styles.lede}>
                        Une primitive de ponctuation visuelle destinée à régler
                        le rythme du Codex. Elle peut séparer deux grandes
                        sections éditoriales, deux éléments internes ou
                        simplement conserver une respiration structurelle.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="main-example-title"
                >
                    <div className={styles.mainExamplePreview}>
                        <p className={styles.kicker}>Preset emblématique</p>

                        <h2 id="main-example-title">
                            Une étincelle entre deux chapitres
                        </h2>

                        <p>
                            Le preset <code>spark</code> reprend les deux traits
                            fins et l’ornement central doré retenus pour la
                            recomposition éditoriale de la page Châteaux.
                        </p>

                        <div className={styles.mainExampleCanvas}>
                            <LRZSeparateur
                                scope="section"
                                preset="spark"
                                color="ocre"
                                size="lg"
                                tone="muted"
                            />
                        </div>
                    </div>

                    <pre className={styles.mainExampleCode}>
                        <code>{`<LRZSeparateur
    scope="section"
    preset="spark"
    color="ocre"
    size="lg"
    tone="muted"
/>`}</code>
                    </pre>
                </section>

                <section
                    className={styles.sectionCard}
                    aria-labelledby="presets-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Presets</p>

                        <h2 id="presets-title">
                            Une ponctuation pour chaque intensité
                        </h2>

                        <p>
                            Les presets partagent la même structure DOM. Ils
                            modifient uniquement la présence du centre, la forme
                            de l’ornement et le traitement des traits.
                        </p>
                    </header>

                    <div className={styles.presetGrid}>
                        {PRESETS.map(
                            ({ preset, title, description, color }) => (
                                <article
                                    className={styles.presetCard}
                                    key={preset}
                                >
                                    <header className={styles.presetHeader}>
                                        <h3>{title}</h3>
                                        <code>{preset}</code>
                                    </header>

                                    <p className={styles.presetDescription}>
                                        {description}
                                    </p>

                                    <div className={styles.presetPreview}>
                                        <LRZSeparateur
                                            preset={preset}
                                            scope="content"
                                            size="md"
                                            color={color}
                                        />
                                    </div>
                                </article>
                            ),
                        )}
                    </div>
                </section>

                <section
                    className={styles.sectionCard}
                    aria-labelledby="usage-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Compositions</p>

                        <h2 id="usage-title">Exemples d’utilisation</h2>

                        <p>
                            Les valeurs restent sobres par défaut, puis peuvent
                            être enrichies uniquement lorsque la structure de la
                            page le demande.
                        </p>
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
                                        ({ name, code, ...props }) => (
                                            <article
                                                className={styles.example}
                                                key={name}
                                            >
                                                <div
                                                    className={
                                                        styles.exampleMeta
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.exampleName
                                                        }
                                                    >
                                                        {name}
                                                    </span>

                                                    <code>{code}</code>
                                                </div>

                                                <div
                                                    className={
                                                        styles.examplePreview
                                                    }
                                                >
                                                    <LRZSeparateur {...props} />
                                                </div>
                                            </article>
                                        ),
                                    )}
                                </div>
                            </section>
                        ))}

                        <section className={styles.group}>
                            <div className={styles.groupHeader}>
                                <h3>Orientation verticale</h3>

                                <p>
                                    Une variante réservée aux compositions en
                                    colonnes, aux panneaux et aux séparations
                                    latérales.
                                </p>
                            </div>

                            <div className={styles.examples}>
                                {VERTICAL_EXAMPLES.map(
                                    ({ name, code, ...props }) => (
                                        <article
                                            className={styles.example}
                                            key={name}
                                        >
                                            <div className={styles.exampleMeta}>
                                                <span
                                                    className={
                                                        styles.exampleName
                                                    }
                                                >
                                                    {name}
                                                </span>

                                                <code>{code}</code>
                                            </div>

                                            <div
                                                className={[
                                                    styles.examplePreview,
                                                    styles.verticalExamplePreview,
                                                ].join(" ")}
                                            >
                                                <LRZSeparateur {...props} />
                                            </div>
                                        </article>
                                    ),
                                )}
                            </div>
                        </section>
                    </div>
                </section>

                <LRZSeparateurPlayground />

                <section
                    className={styles.sectionCard}
                    aria-labelledby="props-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>API</p>

                        <h2 id="props-title">Propriétés du composant</h2>

                        <p>
                            Les valeurs libres acceptent aussi bien des nombres
                            que des longueurs CSS comme <code>24px</code>,{" "}
                            <code>60%</code> ou une variable personnalisée.
                        </p>
                    </header>

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
                    className={styles.sectionCard}
                    aria-labelledby="palette-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Palette Naturalist</p>

                        <h2 id="palette-title">
                            Toutes les couleurs LRZ disponibles
                        </h2>

                        <p>
                            La couleur pilote les traits et l’ornement. Leur
                            intensité respective reste contrôlée par la prop{" "}
                            <code>tone</code>.
                        </p>
                    </header>

                    <div className={styles.colorGroups}>
                        {LRZ_COLOR_GROUPS.map((group) => (
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
                                            <LRZSeparateur
                                                preset="spark"
                                                scope="content"
                                                size="sm"
                                                tone="muted"
                                                color={color}
                                            />

                                            <code>
                                                {color} ·{" "}
                                                {LRZ_COLOR_VARIABLES[color]}
                                            </code>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
