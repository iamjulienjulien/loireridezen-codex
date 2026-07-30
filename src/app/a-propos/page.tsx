import type { Metadata } from "next";
import Link from "next/link";

import LRZSection from "@/components/LRZSection/LRZSection";
import PageFooter from "@/components/PageFooter";

import styles from "./a-propos.module.css";

export const metadata: Metadata = {
    title: "À propos — Le Codex ligérien",
    description:
        "Le Codex ligérien : un atlas éditorial pour explorer, observer et raconter les paysages de la Loire.",
};

const PILLARS = [
    {
        number: "01",
        title: "Explorer",
        text: "Relier les lieux, les territoires et les itinéraires pour faire apparaître un paysage continu, de la source à l’Atlantique.",
    },
    {
        number: "02",
        title: "Observer",
        text: "Regarder les châteaux, le vivant, les ouvrages et les usages avec attention, sans réduire le fleuve à un simple décor.",
    },
    {
        number: "03",
        title: "Raconter",
        text: "Faire dialoguer repères concrets, mémoire locale et récits sensibles afin que chaque halte donne envie d’aller voir plus loin.",
    },
] as const;

export default function AboutPage() {
    return (
        <main className={styles.page}>
            <header className={styles.masthead}>
                <Link className={styles.brand} href="/">
                    <span className={styles.brandKicker}>Loire Ride Zen</span>
                    <span aria-hidden="true">·</span>
                    <span>Le Codex ligérien</span>
                </Link>

                <nav className={styles.navigation} aria-label="À propos">
                    <Link href="/">Explorer le Codex</Link>
                    <Link href="/docs">Documentation</Link>
                </nav>
            </header>

            <LRZSection
                className={styles.hero}
                width="wide"
                spacing="xl"
                color="eau"
                eyebrow="À propos"
                title="Un atlas vivant pour suivre le fil de la Loire."
                titleAs="h1"
                description={
                    <p>
                        Le Codex ligérien est la mémoire éditoriale de Loire
                        Ride Zen : un lieu pour explorer lentement les paysages,
                        les patrimoines et le vivant qui accompagnent le fleuve.
                    </p>
                }
            >
                <div className={styles.heroNote}>
                    <span aria-hidden="true">↘</span>
                    <p>
                        Ni encyclopédie fermée, ni guide pressé : un carnet de
                        navigation qui se construit au rythme des rives.
                    </p>
                </div>
            </LRZSection>

            <LRZSection
                width="content"
                spacing="lg"
                color="soleil"
                eyebrow="Une manière de regarder"
                title="Le territoire comme un récit à parcourir."
                description={
                    <p>
                        Chaque entrée est une porte ouverte : vers un lieu, une
                        époque, une espèce, une rivière ou une histoire. Le
                        Codex préfère les liens aux listes et les détours aux
                        réponses définitives.
                    </p>
                }
                separatorBefore="spark"
            >
                <div className={styles.pillars}>
                    {PILLARS.map((pillar) => (
                        <article className={styles.pillar} key={pillar.number}>
                            <span className={styles.pillarNumber}>
                                {pillar.number}
                            </span>
                            <h2>{pillar.title}</h2>
                            <p>{pillar.text}</p>
                        </article>
                    ))}
                </div>
            </LRZSection>

            <LRZSection
                layout="split"
                width="wide"
                spacing="xl"
                tone="tinted"
                color="prairie"
                eyebrow="Méthode"
                title="Un projet éditorial, en mouvement."
                description={
                    <p>
                        Les contenus sont composés à partir de sources
                        publiques, de lectures, de traces de terrain et d’un
                        travail de mise en relation. Ils sont appelés à être
                        précisés, enrichis et parfois corrigés.
                    </p>
                }
                aside={
                    <div className={styles.methodCard}>
                        <p className={styles.methodKicker}>Le principe</p>
                        <p>
                            Donner à chaque donnée une place, un contexte et une
                            direction possible pour poursuivre l’exploration.
                        </p>
                        <Link href="/docs">
                            Voir la documentation du Codex →
                        </Link>
                    </div>
                }
            >
                <div className={styles.methodList}>
                    <p>
                        <strong>Des repères fiables.</strong> Les informations
                        pratiques et patrimoniales cherchent à être claires,
                        sourcées et révisables.
                    </p>
                    <p>
                        <strong>Une voix située.</strong> Le regard reste celui
                        d’un explorateur à vélo, attentif au temps long et aux
                        paysages ordinaires.
                    </p>
                    <p>
                        <strong>Un Codex ouvert.</strong> Une imprécision, une
                        idée ou une histoire locale mérite d’être partagée : le
                        projet avance aussi grâce à ses lecteurs.
                    </p>
                </div>
            </LRZSection>

            <LRZSection
                width="reading"
                spacing="xl"
                color="coucher"
                align="center"
                eyebrow="Loire Ride Zen"
                title="Prendre le temps de suivre le fleuve."
                description={
                    <p>
                        Le Codex prolonge Loire Ride Zen, un projet de récits et
                        d’itinérances slow gravel en Val de Loire et en Anjou.
                    </p>
                }
                separatorBefore="spark"
            >
                <a
                    className={styles.primaryLink}
                    href="https://loireridezen.bike"
                    target="_blank"
                    rel="noreferrer"
                >
                    Découvrir Loire Ride Zen <span aria-hidden="true">↗</span>
                </a>
            </LRZSection>

            <div className={styles.footerWrap}>
                <PageFooter color="eau"></PageFooter>
            </div>
        </main>
    );
}
