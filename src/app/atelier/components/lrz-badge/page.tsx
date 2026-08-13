import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";
import { Waves } from "lucide-react";
import LRZBadge, {
    type LRZBadgeProps,
    type LRZBadgeVariant,
} from "@/components/_ui/LRZBadge/LRZBadge";
import { LRZ_COLOR_GROUPS } from "@/registry/colors";
import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import LRZBadgePlayground from "./LRZBadgePlayground";
import styles from "./lrz-badge.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-badge");

type BadgeExample = {
    name: string;
    badge: LRZBadgeProps;
};

type ExampleGroup = {
    title: string;
    description: string;
    examples: BadgeExample[];
};

const GROUPS: ExampleGroup[] = [
    {
        title: "Statut d’extinction · Faune",
        description:
            "Le code UICN reste le repère principal, accompagné de son libellé complet.",
        examples: [
            {
                name: "Préoccupation mineure",
                badge: { preset: "extinction-faune", value: "LC" },
            },
            {
                name: "Quasi menacé",
                badge: { preset: "extinction-faune", value: "NT" },
            },
            {
                name: "Vulnérable",
                badge: { preset: "extinction-faune", value: "VU" },
            },
            {
                name: "En danger",
                badge: { preset: "extinction-faune", value: "EN" },
            },
            {
                name: "En danger critique",
                badge: { preset: "extinction-faune", value: "CR" },
            },
            {
                name: "Non applicable",
                badge: { preset: "extinction-faune", value: "NA" },
            },
        ],
    },
    {
        title: "Rareté · Faune",
        description:
            "Une piste naturaliste évolue de la trace familière à la rencontre exceptionnelle.",
        examples: [
            {
                name: "Commun",
                badge: { preset: "rarete-faune", value: "commun" },
            },
            {
                name: "Régulier",
                badge: { preset: "rarete-faune", value: "régulier" },
            },
            {
                name: "Rare",
                badge: { preset: "rarete-faune", value: "rare" },
            },
            {
                name: "Trésor",
                badge: { preset: "rarete-faune", value: "trésor" },
            },
        ],
    },
    {
        title: "Indigénat · Flore",
        description:
            "Une pousse pour l’indigène, le voyage pour l’exotique et un signal franc pour l’envahissante.",
        examples: [
            {
                name: "Indigène",
                badge: { preset: "indigenat-flore", value: "indigène" },
            },
            {
                name: "Exotique",
                badge: { preset: "indigenat-flore", value: "exotique" },
            },
            {
                name: "Envahissante",
                badge: {
                    preset: "indigenat-flore",
                    value: "envahissante",
                },
            },
        ],
    },
    {
        title: "Protection · Flore",
        description:
            "Un sceau-bouclier distingue les protections nationale, régionale et absente.",
        examples: [
            {
                name: "Nationale",
                badge: { preset: "protection-flore", value: "nationale" },
            },
            {
                name: "Régionale",
                badge: { preset: "protection-flore", value: "régionale" },
            },
            {
                name: "Non protégée",
                badge: { preset: "protection-flore", value: "aucune" },
            },
        ],
    },
    {
        title: "Rareté · Flore",
        description:
            "Une étiquette d’herbier passe de la feuille familière au joyau botanique.",
        examples: [
            {
                name: "Commune",
                badge: { preset: "rarete-flore", value: "commun" },
            },
            {
                name: "Régulière",
                badge: { preset: "rarete-flore", value: "régulier" },
            },
            {
                name: "Rare",
                badge: { preset: "rarete-flore", value: "rare" },
            },
            {
                name: "Trésor",
                badge: { preset: "rarete-flore", value: "trésor" },
            },
        ],
    },
    {
        title: "Monument historique · Châteaux",
        description:
            "Un cartouche minéral emprunte ses codes aux plaques et archives patrimoniales.",
        examples: [
            {
                name: "Classé",
                badge: {
                    preset: "monument-historique-chateau",
                    value: "classé",
                },
            },
            {
                name: "Inscrit",
                badge: {
                    preset: "monument-historique-chateau",
                    value: "inscrit",
                },
            },
            {
                name: "Non protégé",
                badge: {
                    preset: "monument-historique-chateau",
                    value: "aucune",
                },
            },
        ],
    },
    {
        title: "UNESCO · Châteaux",
        description:
            "Un médaillon bleu nuit relie le Val de Loire au patrimoine mondial.",
        examples: [
            {
                name: "Val de Loire",
                badge: { preset: "unesco-chateau", value: true },
            },
            {
                name: "Hors périmètre",
                badge: { preset: "unesco-chateau", value: false },
            },
        ],
    },
    {
        title: "Renommée · Châteaux",
        description:
            "Un insigne héraldique hiérarchise les grandes signatures et les secrets de Loire.",
        examples: [
            {
                name: "Phare",
                badge: { preset: "renommee-chateau", value: "phare" },
            },
            {
                name: "Majeur",
                badge: { preset: "renommee-chateau", value: "majeur" },
            },
            {
                name: "Notable",
                badge: { preset: "renommee-chateau", value: "notable" },
            },
            {
                name: "Confidentiel",
                badge: {
                    preset: "renommee-chateau",
                    value: "confidentiel",
                },
            },
        ],
    },
    {
        title: "Visite · Châteaux",
        description:
            "Un billet compact rend immédiatement lisible le niveau d’accès au domaine.",
        examples: [
            {
                name: "Ouvert au public",
                badge: {
                    preset: "visite-chateau",
                    value: "ouvert au public",
                },
            },
            {
                name: "Extérieurs & parc",
                badge: {
                    preset: "visite-chateau",
                    value: "extérieurs & parc",
                },
            },
            {
                name: "Privé, non visitable",
                badge: {
                    preset: "visite-chateau",
                    value: "privé, non visitable",
                },
            },
            {
                name: "Inconnu",
                badge: { preset: "visite-chateau", value: "inconnu" },
            },
        ],
    },
];

const VARIANTS: {
    variant: LRZBadgeVariant;
    name: string;
    description: string;
}[] = [
    {
        variant: "default",
        name: "Default",
        description: "Le badge essentiel, compact et neutre.",
    },
    {
        variant: "pill",
        name: "Pill",
        description: "Une capsule continue pour les échelles et statuts.",
    },
    {
        variant: "leaf",
        name: "Leaf",
        description: "Une silhouette organique à pointe végétale.",
    },
    {
        variant: "shield",
        name: "Shield",
        description: "Un sceau administratif aux angles protecteurs.",
    },
    {
        variant: "plaque",
        name: "Plaque",
        description: "Un cartouche minéral à double encadrement.",
    },
    {
        variant: "medallion",
        name: "Medallion",
        description: "Un médaillon rond, précieux et institutionnel.",
    },
    {
        variant: "trail",
        name: "Trail",
        description: "Une piste ponctuée inspirée des traces naturalistes.",
    },
    {
        variant: "herbarium",
        name: "Herbarium",
        description: "Une étiquette botanique ornée d’une nervure.",
    },
    {
        variant: "crest",
        name: "Crest",
        description: "Un insigne aux codes héraldiques.",
    },
    {
        variant: "ticket",
        name: "Ticket",
        description: "Un billet compact avec zone détachable.",
    },
];

const PROPS = [
    {
        name: "preset",
        type: "LRZBadgePreset",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Active une identité métier complète : icône, forme, couleur et libellés.",
    },
    {
        name: "value",
        type: "Valeur du preset",
        required: "Avec preset",
        defaultValue: "—",
        description:
            "État métier typé selon le preset choisi, ou un booléen pour UNESCO.",
    },
    {
        name: "label",
        type: "ReactNode",
        required: "Sans preset",
        defaultValue: "—",
        description:
            "Contenu principal du badge générique, ou surcharge du libellé d’un preset.",
    },
    {
        name: "detail",
        type: "ReactNode | false",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Surcharge le libellé secondaire. La valeur false masque explicitement le détail d’un preset.",
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
        name: "icon",
        type: "ReactNode | false",
        required: "Non",
        defaultValue: "Icône du preset / point",
        description:
            "Remplace l’icône par un élément Lucide, un emoji ou un nœud React. false la masque.",
    },
    {
        name: "variant",
        type: "LRZBadgeVariant",
        required: "Non",
        defaultValue: '"default"',
        description:
            "Applique une forme visuelle hors preset ou remplace celle choisie par le preset.",
    },
    {
        name: "dashed",
        type: "boolean",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Force une bordure pointillée avec true, ou une bordure pleine avec false.",
    },
    {
        name: "gradient",
        type: "boolean",
        required: "Non",
        defaultValue: "false / true avec preset",
        description:
            "Active ou retire le dégradé chromatique associé à la variante.",
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
        <>
            <ComponentsNavigation current="lrz-badge" />
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
                        <LRZBadge preset="extinction-faune" value="LC" />
                    </div>
                    <pre className={styles.mainExampleCode}>
                        <code>{`<LRZBadge
    preset="extinction-faune"
    value="LC"
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
                                    {group.examples.map(({ name, badge }) => (
                                        <article
                                            className={styles.example}
                                            key={name}
                                        >
                                            <span
                                                className={styles.exampleName}
                                            >
                                                {name}
                                            </span>
                                            <LRZBadge {...badge} />
                                            <code>
                                                {badge.preset
                                                    ? `value=${String(badge.value)}`
                                                    : badge.color}
                                            </code>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.usageExamples}
                    aria-labelledby="variant-examples-title"
                >
                    <header className={styles.usageExamplesHeader}>
                        <p className={styles.kicker}>Formes composables</p>
                        <h2 id="variant-examples-title">
                            Variantes indépendantes
                        </h2>
                    </header>
                    <div className={styles.groups}>
                        <section className={styles.group}>
                            <div className={styles.groupHeader}>
                                <h3>Une forme, sans métier imposé</h3>
                                <p>
                                    Chaque silhouette peut être utilisée avec un
                                    simple label, puis combinée librement avec
                                    la couleur, les pointillés et le dégradé.
                                </p>
                            </div>
                            <div className={styles.examples}>
                                {VARIANTS.map(
                                    ({ variant, name, description }) => (
                                        <article
                                            className={styles.example}
                                            key={variant}
                                        >
                                            <span
                                                className={styles.exampleName}
                                            >
                                                {description}
                                            </span>
                                            <LRZBadge
                                                color="eau"
                                                gradient
                                                icon={<Waves />}
                                                label={name}
                                                variant={variant}
                                            />
                                            <code>{variant}</code>
                                        </article>
                                    ),
                                )}
                            </div>
                        </section>
                    </div>
                </section>

                <LRZBadgePlayground />

                <section className={styles.props} aria-labelledby="props-title">
                    <div className={styles.propsHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="props-title">Props</h2>
                        <p>
                            Le mode générique reste disponible. Les presets
                            ajoutent une couche métier typée sans empêcher de
                            surcharger leur texte ou leur couleur.
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
        </>
    );
}
