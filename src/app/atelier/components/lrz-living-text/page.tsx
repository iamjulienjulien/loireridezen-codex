import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import LRZLivingText from "@/components/LRZLivingText";
import LRZTypography from "@/components/LRZTypography";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZAnimationCard from "../lrz-typography/LRZAnimationCard";
import LRZLivingTextSeparator from "./LRZLivingTextSeparator";
import {
    LRZAtmosphericTextControls,
    LRZBreathingTextControls,
    LRZCutoutTextControls,
    LRZPathTextControls,
    LRZScrambleTextControls,
    LRZTypewriterControls,
} from "../lrz-typography/LRZLivingTypographyControls";
import {
    ConfluenceText,
    MirageText,
    PelotonText,
    SillageText,
    TopographicText,
    WaveExperiment,
} from "../lrz-typography/LRZTypographyExperiments";
import styles from "../lrz-typography/LRZTypographyPlayground.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-living-text",
);

export default function LRZLivingTextPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-living-text" />

            <div className={styles.wrap}>
                <header className={styles.pageHeader}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <LRZTypography preset="eyebrow">
                        Loire Ride Zen · Composants UI
                    </LRZTypography>
                    <LRZTypography
                        preset="display"
                        as="h1"
                        className={styles.pageTitle}
                    >
                        LRZLivingText
                    </LRZTypography>
                    <LRZTypography preset="lede" className={styles.lede}>
                        Des compositions textuelles qui respirent, suivent le
                        fleuve et donnent du mouvement aux récits du Codex.
                    </LRZTypography>
                </header>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <LRZTypography preset="eyebrow">
                            Compositions vivantes
                        </LRZTypography>
                        <LRZTypography preset="heading-2">
                            Sept façons de mettre le texte en mouvement
                        </LRZTypography>
                        <LRZTypography preset="body-sm" color="secondary">
                            Chaque composition occupe sa propre séquence pour
                            montrer son rythme, son espace et sa matière.
                        </LRZTypography>
                    </header>

                    <article className={styles.livingComposition}>
                        <header className={styles.compositionHeader}>
                            <LRZTypography preset="eyebrow">
                                LRZLivingText.CutoutText
                            </LRZTypography>
                            <LRZTypography preset="heading-3">
                                La photographie traverse les lettres
                            </LRZTypography>
                        </header>
                        <LRZCutoutTextControls
                            className={styles.compositionBody}
                        />
                    </article>

                    <LRZLivingTextSeparator />

                    <article className={styles.livingComposition}>
                        <header className={styles.compositionHeader}>
                            <LRZTypography preset="eyebrow">
                                LRZLivingText.ScrambleText
                            </LRZTypography>
                            <LRZTypography preset="heading-3">
                                Le message se clarifie dans le courant
                            </LRZTypography>
                        </header>
                        <LRZScrambleTextControls
                            className={styles.compositionBody}
                        />
                    </article>

                    <LRZLivingTextSeparator />

                    <article className={styles.livingComposition}>
                        <header className={styles.compositionHeader}>
                            <LRZTypography preset="eyebrow">
                                LRZLivingText.Typewriter
                            </LRZTypography>
                            <LRZTypography preset="heading-3">
                                Une halte s’écrit sous vos yeux
                            </LRZTypography>
                        </header>
                        <LRZTypewriterControls
                            className={styles.compositionBody}
                        />
                    </article>

                    <LRZLivingTextSeparator />

                    <article className={styles.livingComposition}>
                        <header className={styles.compositionHeader}>
                            <LRZTypography preset="eyebrow">
                                LRZLivingText.PathText
                            </LRZTypography>
                            <LRZTypography preset="heading-3">
                                Le texte épouse le fil du fleuve
                            </LRZTypography>
                        </header>
                        <LRZPathTextControls
                            className={styles.compositionBody}
                        />
                    </article>

                    <LRZLivingTextSeparator />

                    <article className={styles.livingComposition}>
                        <header className={styles.compositionHeader}>
                            <LRZTypography preset="eyebrow">
                                LRZLivingText.BreathingText
                            </LRZTypography>
                            <LRZTypography preset="heading-3">
                                Un mouvement lent, comme une respiration
                            </LRZTypography>
                        </header>
                        <LRZBreathingTextControls
                            className={styles.compositionBody}
                        />
                    </article>

                    <LRZLivingTextSeparator />

                    <article className={styles.livingComposition}>
                        <header className={styles.compositionHeader}>
                            <LRZTypography preset="eyebrow">
                                LRZLivingText.AtmosphericText
                            </LRZTypography>
                            <LRZTypography preset="heading-3">
                                La lumière du texte suit l’heure du jour
                            </LRZTypography>
                        </header>
                        <LRZAtmosphericTextControls
                            className={styles.compositionBody}
                        />
                    </article>

                    <LRZLivingTextSeparator />

                    <article className={styles.livingComposition}>
                        <header className={styles.compositionHeader}>
                            <LRZTypography preset="eyebrow">
                                LRZLivingText.ScrollStory
                            </LRZTypography>
                            <LRZTypography preset="heading-3">
                                Le récit se découvre au rythme du défilement
                            </LRZTypography>
                        </header>
                        <div
                            className={`${styles.compositionBody} ${styles.scrollStoryScene}`}
                        >
                            <LRZLivingText.ScrollStory
                                preset="heading-1"
                                as="p"
                            >
                                Quitter la ligne droite suivre les îles écouter
                                le vent retrouver l’horizon
                            </LRZLivingText.ScrollStory>
                        </div>
                        <pre className={styles.compositionCode}>
                            <code>{`<LRZLivingText.ScrollStory preset="heading-1" as="p">
  Quitter la ligne droite suivre les îles écouter le vent retrouver l’horizon
</LRZLivingText.ScrollStory>`}</code>
                        </pre>
                    </article>
                </section>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <LRZTypography preset="eyebrow">
                            Laboratoire
                        </LRZTypography>
                        <LRZTypography preset="heading-2">
                            Six pistes indisciplinées
                        </LRZTypography>
                        <LRZTypography preset="body-sm" color="secondary">
                            Ces traitements restent dans l’Atelier jusqu’à ce
                            que leur usage soit suffisamment évident.
                        </LRZTypography>
                    </header>

                    <div className={styles.experimentGrid}>
                        <LRZAnimationCard
                            className={styles.experimentCard}
                            label="Wave"
                        >
                            <LRZTypography preset="caption" color="tertiary">
                                Wave
                            </LRZTypography>
                            <WaveExperiment />
                        </LRZAnimationCard>
                        <LRZAnimationCard
                            className={styles.experimentCard}
                            label="Sillage"
                        >
                            <LRZTypography preset="caption" color="tertiary">
                                Sillage
                            </LRZTypography>
                            <SillageText>LES ÎLES DÉFILENT</SillageText>
                        </LRZAnimationCard>
                        <article className={styles.experimentCard}>
                            <LRZTypography preset="caption" color="tertiary">
                                Relief topographique
                            </LRZTypography>
                            <TopographicText>VAL DE LOIRE</TopographicText>
                        </article>
                        <LRZAnimationCard
                            className={styles.experimentCard}
                            label="Confluence"
                        >
                            <LRZTypography preset="caption" color="tertiary">
                                Confluence
                            </LRZTypography>
                            <ConfluenceText
                                left="Loire"
                                right="Vienne"
                                result="Confluence"
                            />
                        </LRZAnimationCard>
                        <LRZAnimationCard
                            className={styles.experimentCard}
                            label="Mirage"
                        >
                            <LRZTypography preset="caption" color="tertiary">
                                Mirage
                            </LRZTypography>
                            <MirageText>SAUMUR</MirageText>
                        </LRZAnimationCard>
                        <LRZAnimationCard
                            className={styles.experimentCard}
                            label="Peloton"
                        >
                            <LRZTypography preset="caption" color="tertiary">
                                Peloton
                            </LRZTypography>
                            <PelotonText>ROULEZ ZEN</PelotonText>
                        </LRZAnimationCard>
                    </div>
                </section>
            </div>
        </>
    );
}
