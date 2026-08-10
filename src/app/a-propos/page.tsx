import Link from "next/link";
import type { CSSProperties } from "react";

import PageShell from "@/components/layout/PageShell";
import LRZSection from "@/components/LRZSection/LRZSection";
import { LRZSymbol } from "@/components/LRZSymbol";
import { buildPageMetadata, SITE_URL } from "@/lib/site-metadata";
import {
    getIndexesForEnv,
    INDEX_UNIVERSES,
    type IndexUniverse,
} from "@/registry/indexes";
import { getLRZColorValue } from "@/registry/colors";
import {
    getCommonWebsiteMeta,
    type CommonWebsite,
} from "@/registry/Meta/common-website";
import type { CommonGeneral } from "@/registry/Meta/common-general";
import { getContentPageDefinition } from "@/registry/pages";

import styles from "./a-propos.module.css";

const ABOUT_PAGE = getContentPageDefinition("/a-propos");

export const metadata = buildPageMetadata(ABOUT_PAGE);

type IllustratedText = {
    symbol: CommonGeneral;
    title: string;
    text: string;
};

const PILLARS = [
    {
        number: "01",
        symbol: "explorer",
        title: "Explorer",
        text: "Relier les lieux, les territoires et les itinéraires pour faire apparaître un paysage continu, de la source à l’Atlantique.",
    },
    {
        number: "02",
        symbol: "observer",
        title: "Observer",
        text: "Regarder le vivant, les patrimoines et les usages sans réduire le fleuve à un simple décor.",
    },
    {
        number: "03",
        symbol: "raconter",
        title: "Raconter",
        text: "Faire dialoguer repères concrets, mémoire locale et récits sensibles pour donner envie d’aller voir plus loin.",
    },
] as const satisfies readonly (IllustratedText & { number: string })[];

const METHOD_ITEMS = [
    {
        symbol: "sources",
        title: "Sourcer sans figer.",
        text: "Les informations pratiques et patrimoniales cherchent à être claires, sourcées et révisables.",
    },
    {
        symbol: "explorer",
        title: "Regarder depuis le terrain.",
        text: "Le regard reste celui d’un explorateur à vélo, attentif au temps long et aux paysages ordinaires.",
    },
    {
        symbol: "partager",
        title: "Relier, corriger, enrichir.",
        text: "Une imprécision, une idée ou une histoire locale mérite d’être partagée : le projet avance aussi grâce à ses lecteurs.",
    },
] as const satisfies readonly IllustratedText[];

const UNIVERSE_INTROS = {
    habite: {
        description:
            "Châteaux, haltes et lieux habités : les rives où se croisent pouvoirs, usages et rencontres.",
    },
    vivant: {
        description:
            "Faune et flore : les espèces qui enracinent, traversent ou accompagnent le mouvement du fleuve.",
    },
    raconte: {
        description:
            "Territoires, personnages et récits : les chapitres qui donnent une mémoire et une voix au paysage.",
    },
} as const satisfies Record<IndexUniverse, { description: string }>;

type ProjectEntry = {
    slug: CommonWebsite;
    phase: string;
    title: string;
    description: string;
    href?: string;
};

const PROJECT_JOURNEY: readonly ProjectEntry[] = [
    {
        slug: "instagram",
        phase: "Le journal d’origine",
        title: "Instagram",
        description:
            "Le premier carnet de route : des étapes, des images et des coups de cœur partagés au fil des sorties.",
        href: "https://www.instagram.com/loireridezen/",
    },
    {
        slug: "hub",
        phase: "La porte d’entrée",
        title: "Le Hub Loire Ride Zen",
        description:
            "Le point de départ qui rassemble les récits, les projets et les chemins possibles pour suivre la Loire.",
        href: "https://loireridezen.bike",
    },
    {
        slug: "carte",
        phase: "Le terrain en mouvement",
        title: "La Carte interactive",
        description:
            "Une carte pour situer les traces, les haltes, les photos et les détours qui composent le voyage.",
        href: "https://carte.loireridezen.link",
    },
    {
        slug: "codex",
        phase: "La mémoire éditoriale",
        title: "Le Codex Ligérien",
        description:
            "L’atlas qui relie les lieux, le vivant, les territoires et les récits derrière chaque étape.",
        href: "/",
    },
    {
        slug: "passeport",
        phase: "À venir",
        title: "Le Passeport ligérien",
        description:
            "La future application mobile prolongera le Codex sur le terrain, pour faire vivre les découvertes, les parcours et les traces de voyage.",
    },
];

const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: ABOUT_PAGE.seo?.title ?? ABOUT_PAGE.title,
    description: ABOUT_PAGE.seo?.description ?? ABOUT_PAGE.description,
    url: `${SITE_URL}${ABOUT_PAGE.href}`,
    mainEntity: {
        "@type": "Organization",
        name: "Loire Ride Zen",
        url: "https://loireridezen.bike",
        description:
            "Projet de récits et d’itinérances slow gravel en Val de Loire et en Anjou.",
        sameAs: [
            "https://www.instagram.com/loireridezen/",
            "https://carte.loireridezen.link",
        ],
    },
});

export default function AboutPage() {
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    const universeEntries = INDEX_UNIVERSES.flatMap((universe) => {
        const index = indexes.find((item) => item.universe === universe.slug);

        return index
            ? [
                  {
                      ...universe,
                      ...UNIVERSE_INTROS[universe.slug],
                      index,
                  },
              ]
            : [];
    });

    return (
        <PageShell
            page={ABOUT_PAGE}
            width="wide"
            spacing="compact"
            navigation={
                <nav className={styles.navigation} aria-label="À propos">
                    <Link href="/">Explorer le Codex</Link>
                    <Link href="/docs">Documentation</Link>
                </nav>
            }
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: structuredData }}
            />

            <section className={styles.manifest} aria-label="L’esprit du Codex">
                <LRZSymbol
                    className={styles.manifestMark}
                    collection="common"
                    meta="general"
                    slug="atlas"
                    size="lg"
                    frame="outline"
                    shape="rounded"
                    shadow="soft"
                    decorative
                />
                <div>
                    <p className={styles.manifestKicker}>Le point de départ</p>
                    <p className={styles.manifestText}>
                        Ni encyclopédie figée, ni guide pressé : un carnet de
                        navigation pour relier les rives, les êtres et les
                        histoires du fleuve.
                    </p>
                </div>
            </section>

            <LRZSection
                width="content"
                spacing="md"
                color="soleil"
                eyebrow="Pourquoi ce Codex ?"
                title="Faire de la Loire un paysage à parcourir."
                description={
                    <p>
                        Chaque entrée est une porte ouverte vers un lieu, une
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
                            <div className={styles.pillarMeta}>
                                <LRZSymbol
                                    collection="common"
                                    meta="general"
                                    slug={pillar.symbol}
                                    size="sm"
                                    shadow="soft"
                                    decorative
                                />
                                <span className={styles.pillarNumber}>
                                    {pillar.number}
                                </span>
                            </div>
                            <h3>{pillar.title}</h3>
                            <p>{pillar.text}</p>
                        </article>
                    ))}
                </div>
            </LRZSection>

            <LRZSection
                width="wide"
                spacing="lg"
                tone="soft"
                color="eau"
                eyebrow="Par où commencer ?"
                title="Trois façons d’entrer dans le Codex."
                description={
                    <p>
                        Choisissez un univers, puis laissez les liens vous
                        emmener d’une rive à l’autre.
                    </p>
                }
                separatorBefore="diamond"
            >
                <div className={styles.universes}>
                    {universeEntries.map((universe) => (
                        <article
                            className={styles.universe}
                            key={universe.slug}
                            style={
                                {
                                    "--universe-accent": universe.index.accent,
                                } as CSSProperties
                            }
                        >
                            <Link href={universe.index.href}>
                                <span
                                    className={styles.universeMark}
                                    aria-hidden
                                >
                                    {universe.index.mark}
                                </span>
                                <span className={styles.universeTitle}>
                                    {universe.title}
                                </span>
                                <span className={styles.universeDescription}>
                                    {universe.description}
                                </span>
                                <span className={styles.universeLink}>
                                    Explorer {universe.index.title}
                                    <span aria-hidden>→</span>
                                </span>
                            </Link>
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
                title="Un atlas qui reste en mouvement."
                description={
                    <p>
                        Les contenus sont composés à partir de sources
                        publiques, de lectures, de traces de terrain et d’un
                        travail de mise en relation. Ils restent appelés à être
                        précisés, enrichis et parfois corrigés.
                    </p>
                }
                aside={
                    <div className={styles.methodCard}>
                        <p className={styles.methodKicker}>La règle du jeu</p>
                        <p>
                            Une donnée ne vaut jamais seule : elle prend sens
                            avec son lieu, son contexte et les chemins qu’elle
                            ouvre.
                        </p>
                        <Link href="/docs">Lire la méthode du Codex →</Link>
                    </div>
                }
            >
                <div className={styles.methodList}>
                    {METHOD_ITEMS.map((item) => (
                        <div className={styles.methodItem} key={item.title}>
                            <LRZSymbol
                                collection="common"
                                meta="general"
                                slug={item.symbol}
                                size="sm"
                                shadow="soft"
                                decorative
                            />
                            <p>
                                <strong>{item.title}</strong> {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </LRZSection>

            <LRZSection
                width="wide"
                spacing="xl"
                tone="soft"
                color="orange-cuivre"
                eyebrow="L’écosystème Loire Ride Zen"
                title="Un même voyage, plusieurs portes d’entrée."
                description={
                    <p>
                        Loire Ride Zen a commencé comme un journal de voyage,
                        puis s’est enrichi d’outils pour préparer, parcourir et
                        garder trace du fleuve. Le Codex en est la mémoire
                        commune.
                    </p>
                }
                separatorBefore="diamond"
            >
                <ol className={styles.projectJourney}>
                    {PROJECT_JOURNEY.map((project, index) => {
                        const meta = getCommonWebsiteMeta(project.slug);
                        const content = (
                            <>
                                <span className={styles.projectOrder}>
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <LRZSymbol
                                    collection="common"
                                    meta="website"
                                    slug={project.slug}
                                    size="lg"
                                    frame="subtle"
                                    shape="rounded"
                                    decorative
                                />
                                <span className={styles.projectPhase}>
                                    {project.phase}
                                </span>
                                <h3>{project.title}</h3>
                                <span className={styles.projectDescription}>
                                    {project.description}
                                </span>
                                <span className={styles.projectLink}>
                                    {project.href
                                        ? project.slug === "codex"
                                            ? "Explorer le Codex"
                                            : "Découvrir le projet"
                                        : "En préparation"}
                                    <span aria-hidden>
                                        {project.href ? "→" : "·"}
                                    </span>
                                </span>
                            </>
                        );

                        return (
                            <li
                                className={styles.project}
                                key={project.slug}
                                style={
                                    {
                                        "--project-accent": meta
                                            ? getLRZColorValue(meta.color)
                                            : undefined,
                                    } as CSSProperties
                                }
                            >
                                {project.href ? (
                                    project.href.startsWith("http") ? (
                                        <a
                                            href={project.href}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <Link href={project.href}>
                                            {content}
                                        </Link>
                                    )
                                ) : (
                                    <div className={styles.projectComingSoon}>
                                        {content}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </LRZSection>

            <LRZSection
                layout="split"
                width="wide"
                spacing="xl"
                color="lie-de-vin"
                eyebrow="Derrière le Codex"
                title="Une écriture au rythme des rives."
                description={
                    <p>
                        Le Codex est imaginé et façonné par Julien Julien, entre
                        itinérances à vélo, observation de terrain, lectures et
                        conversations avec celles et ceux qui habitent le
                        fleuve.
                    </p>
                }
                aside={
                    <div
                        className={`${styles.methodCard} ${styles.originCard}`}
                    >
                        <p className={styles.methodKicker}>Loire Ride Zen</p>
                        <p>
                            Des récits et des itinérances slow gravel pour
                            prendre le temps de suivre la Loire.
                        </p>
                        <a
                            href="https://julienjulien.fr"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Découvrir Julien Julien ↗
                        </a>
                    </div>
                }
            >
                <div className={styles.originText}>
                    <LRZSymbol
                        className={styles.originSymbol}
                        collection="common"
                        meta="general"
                        slug="chemin"
                        size="md"
                        shadow="soft"
                        decorative
                    />
                    <p>
                        Ce n’est pas une encyclopédie achevée, mais un carnet de
                        navigation qui s’épaissit au fil des voyages. Chaque
                        détour peut devenir une entrée, chaque rencontre un lien
                        de plus dans la carte.
                    </p>
                </div>
            </LRZSection>

            <LRZSection
                width="reading"
                spacing="xl"
                color="coucher"
                align="center"
                eyebrow="Commencer le voyage"
                title="Prendre le temps de suivre le fleuve."
                description={
                    <p>
                        Le Codex prolonge Loire Ride Zen : un projet de récits
                        et d’itinérances slow gravel en Val de Loire et en
                        Anjou.
                    </p>
                }
                separatorBefore="spark"
            >
                <div className={styles.ctaContent}>
                    <LRZSymbol
                        className={styles.ctaSymbol}
                        collection="common"
                        meta="general"
                        slug="horizon"
                        size="lg"
                        shadow="soft"
                        decorative
                    />
                    <div className={styles.ctaGroup}>
                        <Link className={styles.primaryLink} href="/">
                            Explorer le Codex <span aria-hidden="true">→</span>
                        </Link>
                        <a
                            className={styles.secondaryLink}
                            href="https://loireridezen.bike"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Découvrir Loire Ride Zen
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
            </LRZSection>
        </PageShell>
    );
}
