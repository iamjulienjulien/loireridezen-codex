import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";
import LRZAnecdote from "@/components/LRZAnecdote/LRZAnecdote";
import { LRZ_COLOR_GROUPS } from "@/registry/colors";
import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZAnecdotePlayground from "./LRZAnecdotePlayground";
import styles from "./lrz-anecdote.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-anecdote");

const EXAMPLES = [
    {
        title: "Faune",
        description: "Une observation naturaliste liée à l’espèce.",
        color: "vert-metallise" as const,
        mark: "❝",
        content:
            "Le brocard refait ses bois chaque année, au rythme des saisons ligériennes.",
    },
    {
        title: "Flore",
        description: "Un usage historique ou une particularité botanique.",
        color: "roseau" as const,
        mark: "❝",
        content:
            "Son écorce, riche en salicine, est l’ancêtre naturel de l’aspirine.",
    },
    {
        title: "Châteaux",
        description: "Un résumé patrimonial associé au monument.",
        color: "ardoise" as const,
        mark: "❝",
        content:
            "La forteresse domine la Loire et raconte plusieurs siècles d’architecture défensive.",
    },
    {
        title: "Vocabulaire",
        description: "Une origine étymologique mise en exergue.",
        color: "ocre" as const,
        mark: "❧",
        content:
            "Le mot vient de l’ancien français et conserve la mémoire des usages du fleuve.",
    },
] as const;

const PROPS = [
    {
        name: "children",
        type: "ReactNode",
        required: "Oui",
        defaultValue: "—",
        description:
            "Contenu éditorial de l’anecdote, sous forme de texte ou de nœud React.",
    },
    {
        name: "color",
        type: "LRZColor",
        required: "Non",
        defaultValue: '"ocre"',
        description:
            "Couleur du liseré, du marqueur et du fond légèrement teinté.",
    },
    {
        name: "mark",
        type: "ReactNode",
        required: "Non",
        defaultValue: '"❝"',
        description:
            "Signe décoratif masqué aux technologies d’assistance. Une valeur vide le retire.",
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

export default function LRZAnecdotePage() {
    return (
        <>
            <ComponentsNavigation current="lrz-anecdote" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZAnecdote</h1>
                    <p className={styles.lede}>
                        Une citation éditoriale compacte, extraite des cartes
                        V3. Elle met en valeur une observation, une histoire ou
                        une étymologie sans rompre le rythme de lecture.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="anecdote-main-example-title"
                >
                    <div className={styles.mainExamplePreview}>
                        <h2 id="anecdote-main-example-title">
                            Une respiration dans la fiche
                        </h2>
                        <p>
                            L’accent colore le liseré, le signe et un fond
                            volontairement discret.
                        </p>
                        <LRZAnecdote color="vert-metallise">
                            Le balbuzard pêche en piqué et peut ressortir de
                            l’eau avec un poisson presque aussi long que lui.
                        </LRZAnecdote>
                    </div>
                    <pre className={styles.mainExampleCode}>
                        <code>{`<LRZAnecdote color="vert-metallise">
    Le balbuzard pêche en piqué et peut
    ressortir de l’eau avec un poisson
    presque aussi long que lui.
</LRZAnecdote>`}</code>
                    </pre>
                </section>

                <section
                    className={styles.usageExamples}
                    aria-labelledby="anecdote-examples-title"
                >
                    <header className={styles.usageExamplesHeader}>
                        <p className={styles.kicker}>Cas métier</p>
                        <h2 id="anecdote-examples-title">
                            Exemples d’utilisation
                        </h2>
                    </header>
                    <div className={styles.examples}>
                        {EXAMPLES.map((example) => (
                            <article
                                className={styles.example}
                                key={example.title}
                            >
                                <div className={styles.exampleHeader}>
                                    <h3>{example.title}</h3>
                                    <p>{example.description}</p>
                                </div>
                                <LRZAnecdote
                                    color={example.color}
                                    mark={example.mark}
                                >
                                    {example.content}
                                </LRZAnecdote>
                                <code>{`color="${example.color}" · mark="${example.mark}"`}</code>
                            </article>
                        ))}
                    </div>
                </section>

                <LRZAnecdotePlayground />

                <section className={styles.props} aria-labelledby="props-title">
                    <div className={styles.propsHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="props-title">Props</h2>
                        <p>
                            Le composant reste éditorial et indépendant du type
                            de fiche qui l’accueille.
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
                    aria-labelledby="anecdote-palette-title"
                >
                    <div className={styles.paletteHeader}>
                        <p className={styles.kicker}>Palette</p>
                        <h2 id="anecdote-palette-title">LRZColor</h2>
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
                                            <LRZAnecdote color={color}>
                                                {color}
                                            </LRZAnecdote>
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
