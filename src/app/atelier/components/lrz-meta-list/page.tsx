import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";
import { CalendarDays, Landmark, MapPin } from "lucide-react";

import LRZBadge from "@/components/_ui/LRZBadge";
import LRZMetaList, {
    type LRZMetaListTone,
} from "@/components/_ui/LRZMetaList";

import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import LRZMetaListPlayground from "./LRZMetaListPlayground";
import styles from "./LRZMetaListPlayground.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-meta-list",
);

const TONES: Array<{
    tone: LRZMetaListTone;
    title: string;
    description: string;
}> = [
    {
        tone: "plain",
        title: "Plain",
        description:
            "Aucun fond ni séparation dans un contexte déjà structuré.",
    },
    {
        tone: "divided",
        title: "Divided",
        description: "Des séparateurs subtils pour faciliter le balayage.",
    },
    {
        tone: "soft",
        title: "Soft",
        description:
            "Chaque métadonnée repose sur une surface légèrement teintée.",
    },
];

const DEMO_ITEMS = [
    {
        id: "epoque",
        label: "Époque",
        value: "Renaissance",
        icon: <CalendarDays aria-hidden="true" />,
    },
    {
        id: "architecture",
        label: "Architecture",
        value: "Renaissance française",
        icon: <Landmark aria-hidden="true" />,
    },
    {
        id: "commune",
        label: "Commune",
        value: "Chambord",
        icon: <MapPin aria-hidden="true" />,
        hint: "Loir-et-Cher",
    },
    {
        id: "protection",
        label: "Protection",
        value: <LRZBadge label="Classé" color="vert-metallise" />,
    },
];

const PROPS = [
    ["items", "readonly LRZMetaListItem[]", "—", "Métadonnées à afficher."],
    ["color", "LRZColor", '"ocre"', "Couleur d’accent LRZ."],
    [
        "tone",
        '"plain" | "divided" | "soft"',
        '"divided"',
        "Traitement visuel des entrées.",
    ],
    ["size", '"sm" | "md" | "lg"', '"md"', "Densité du composant."],
    [
        "layout",
        '"responsive" | "inline" | "stacked"',
        '"responsive"',
        "Organisation des libellés et valeurs.",
    ],
    [
        "columns",
        '1 | 2 | 3 | "auto"',
        "1",
        "Nombre d’entrées distribuées sur une ligne.",
    ],
    [
        "valueAlign",
        '"start" | "end"',
        '"start"',
        "Alignement horizontal des valeurs.",
    ],
    [
        "emptyValue",
        "ReactNode",
        '"—"',
        "Contenu substitué aux valeurs absentes.",
    ],
    [
        "hideEmpty",
        "boolean",
        "false",
        "Retire les entrées dont la valeur est absente.",
    ],
    [
        "labelWidth",
        "string",
        "undefined",
        "Largeur CSS personnalisée des libellés.",
    ],
    [
        "itemClassName",
        "string",
        "undefined",
        "Classe commune appliquée aux entrées.",
    ],
    ["className", "string", "undefined", "Classe additionnelle de la racine."],
    [
        "style",
        "CSSProperties",
        "undefined",
        "Styles additionnels de la racine.",
    ],
] as const;

export default function LRZMetaListPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-meta-list" />

            <div className={styles.wrap}>
                <header className={styles.pageHeader}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.pageTitle}>LRZMetaList</h1>
                    <p className={styles.lede}>
                        Une liste de définitions sémantique pour présenter les
                        faits essentiels d’un lieu, d’une espèce ou d’un
                        itinéraire sans transformer la lecture en tableau.
                    </p>
                </header>

                <section className={styles.mainExample}>
                    <div className={styles.mainExamplePreview}>
                        <p className={styles.kicker}>Exemple principal</p>
                        <h2>Les informations essentielles</h2>
                        <p>
                            Les libellés restent discrets tandis que les valeurs
                            portent la lecture.
                        </p>
                        <LRZMetaList items={DEMO_ITEMS} color="ocre" />
                    </div>

                    <pre className={styles.mainExampleCode}>
                        <code>{`<LRZMetaList
    color="ocre"
    items={[
        {
            id: "epoque",
            label: "Époque",
            value: "Renaissance",
        },
        {
            id: "commune",
            label: "Commune",
            value: "Chambord",
        },
    ]}
/>`}</code>
                    </pre>
                </section>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>
                        <h2>Trois traitements visuels</h2>
                        <p>
                            Le contenu et sa sémantique restent identiques,
                            quelle que soit la surface qui l’accueille.
                        </p>
                    </header>

                    <div className={styles.toneGrid}>
                        {TONES.map((example) => (
                            <article
                                className={styles.example}
                                key={example.tone}
                            >
                                <h3>{example.title}</h3>
                                <p>{example.description}</p>
                                <LRZMetaList
                                    items={DEMO_ITEMS.slice(0, 3)}
                                    tone={example.tone}
                                    size="sm"
                                    color="eau"
                                />
                                <code>{`tone="${example.tone}"`}</code>
                            </article>
                        ))}
                    </div>
                </section>

                <LRZMetaListPlayground />

                <section className={styles.propsSection}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2>Props</h2>
                        <p>
                            Chaque item accepte aussi une icône, une précision,
                            une emphase, une portée de colonne et une classe.
                        </p>
                    </header>

                    <div
                        className={styles.tableScroll}
                        role="region"
                        aria-label="Tableau des props de LRZMetaList"
                        tabIndex={0}
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Prop</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Défaut</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PROPS.map(
                                    ([
                                        name,
                                        type,
                                        defaultValue,
                                        description,
                                    ]) => (
                                        <tr key={name}>
                                            <th scope="row">
                                                <code>{name}</code>
                                            </th>
                                            <td>
                                                <code>{type}</code>
                                            </td>
                                            <td>
                                                <code>{defaultValue}</code>
                                            </td>
                                            <td>{description}</td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <aside className={styles.accessibility}>
                    <p className={styles.kicker}>Accessibilité</p>
                    <h2>Une structure native et prévisible</h2>
                    <ul>
                        <li>
                            La racine utilise <code>dl</code> et chaque entrée
                            associe un <code>dt</code> à son <code>dd</code>.
                        </li>
                        <li>
                            Les icônes sont décoratives et masquées aux
                            technologies d’assistance.
                        </li>
                        <li>
                            L’ordre visuel reste identique à l’ordre du DOM.
                        </li>
                        <li>
                            Les valeurs longues reviennent naturellement à la
                            ligne sans troncature.
                        </li>
                    </ul>
                </aside>
            </div>
        </>
    );
}
