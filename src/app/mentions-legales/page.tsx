import Link from "next/link";

import PageShell from "@/components/_shells/PageShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getContentPageDefinition } from "@/registry/pages";

import styles from "./mentions-legales.module.css";

const LEGAL_PAGE = getContentPageDefinition("/mentions-legales");

export const metadata = buildPageMetadata(LEGAL_PAGE);

export default function LegalNoticePage() {
    return (
        <PageShell
            page={LEGAL_PAGE}
            width="reading"
            spacing="compact"
            navigation={
                <nav
                    className={styles.headerNavigation}
                    aria-label="Informations légales"
                >
                    <Link href="/a-propos">À propos</Link>
                    <a href="mailto:julien@loireridezen.bike">Contact</a>
                </nav>
            }
            footer="Dernière mise à jour · 11 août 2026"
        >
            <article className={styles.legalNotice}>
                <p className={styles.updatedAt}>
                    Dernière mise à jour : 11 août 2026
                </p>

                <section className={styles.section} aria-labelledby="edition">
                    <p className={styles.sectionNumber}>01</p>
                    <div className={styles.sectionContent}>
                        <h2 id="edition">Édition du site</h2>
                        <p>
                            Le site <strong>Le Codex Ligérien</strong>,
                            accessible à l’adresse{" "}
                            <a href="https://codex.loireridezen.bike">
                                codex.loireridezen.bike
                            </a>
                            , est un projet éditorial de{" "}
                            <strong>Loire Ride Zen</strong>, édité à titre non
                            professionnel par <strong>Julien Julien</strong>.
                        </p>
                        <dl className={styles.facts}>
                            <div>
                                <dt>Directeur de la publication</dt>
                                <dd>Julien Julien</dd>
                            </div>
                            <div>
                                <dt>Contact</dt>
                                <dd>
                                    <a href="mailto:julien@loireridezen.bike">
                                        julien@loireridezen.bike
                                    </a>
                                </dd>
                            </div>
                        </dl>
                        <p>
                            Conformément à l’article 1-1, II de la loi n°
                            2004-575 du 21 juin 2004 pour la confiance dans
                            l’économie numérique, les coordonnées complètes de
                            l’éditeur ont été communiquées à l’hébergeur du
                            site.
                        </p>
                    </div>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="hebergement"
                >
                    <p className={styles.sectionNumber}>02</p>
                    <div className={styles.sectionContent}>
                        <h2 id="hebergement">Hébergement</h2>
                        <p>Le site est hébergé par :</p>
                        <address className={styles.address}>
                            <strong>Vercel Inc.</strong>
                            <br />
                            440 N Barranca Avenue #4133
                            <br />
                            Covina, CA 91723
                            <br />
                            États-Unis
                            <br />
                            Téléphone :{" "}
                            <a href="tel:+15592887060">+1 559 288 7060</a>
                            <br />
                            Site : <a href="https://vercel.com">vercel.com</a>
                        </address>
                    </div>
                </section>

                <section className={styles.section} aria-labelledby="propriete">
                    <p className={styles.sectionNumber}>03</p>
                    <div className={styles.sectionContent}>
                        <h2 id="propriete">Propriété intellectuelle</h2>
                        <p>
                            Sauf mention contraire, les contenus du Codex
                            Ligérien sont créés et publiés par{" "}
                            <strong>Julien Julien — Loire Ride Zen</strong>.
                        </p>
                        <p>
                            Les textes et données éditoriales sont mis à
                            disposition sous licence{" "}
                            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr">
                                Creative Commons Attribution — Pas d’Utilisation
                                Commerciale — Partage dans les Mêmes Conditions
                                4.0 International
                            </a>{" "}
                            (CC BY-NC-SA 4.0).
                        </p>
                        <p>Toute réutilisation autorisée doit :</p>
                        <ul>
                            <li>
                                créditer « Julien Julien — Loire Ride Zen » ;
                            </li>
                            <li>
                                mentionner les éventuelles modifications
                                apportées ;
                            </li>
                            <li>ne pas poursuivre de finalité commerciale ;</li>
                            <li>être diffusée sous la même licence.</li>
                        </ul>
                        <p>
                            Le code source et la documentation technique du
                            Codex sont distribués sous{" "}
                            <a href="https://github.com/iamjulienjulien/loireridezen-codex/blob/main/LICENSE">
                                licence MIT
                            </a>
                            .
                        </p>
                        <p>
                            Les illustrations originales, symboles LRZ, logos,
                            éléments graphiques, noms de projets et signes
                            distinctifs de Loire Ride Zen et du Codex Ligérien
                            restent protégés et sont proposés tous droits
                            réservés, sauf indication explicite contraire.
                        </p>
                        <p>
                            Les contenus, marques, photographies, polices,
                            bibliothèques et autres éléments provenant de tiers
                            restent soumis aux droits et licences de leurs
                            propriétaires respectifs. Les données
                            cartographiques sont notamment issues d’
                            <a href="https://www.openstreetmap.org/copyright">
                                OpenStreetMap
                            </a>{" "}
                            et de ses contributeurs.
                        </p>
                    </div>
                </section>

                <section className={styles.section} aria-labelledby="fiabilite">
                    <p className={styles.sectionNumber}>04</p>
                    <div className={styles.sectionContent}>
                        <h2 id="fiabilite">Fiabilité des informations</h2>
                        <p>
                            Le Codex Ligérien est un projet éditorial vivant,
                            enrichi et corrigé progressivement. L’éditeur veille
                            à proposer des informations fiables et sourcées,
                            mais ne peut garantir que l’ensemble des contenus
                            soit en permanence exhaustif, exact ou à jour.
                        </p>
                        <p>
                            Les horaires, tarifs, conditions d’accès,
                            classements, réglementations et informations
                            pratiques peuvent notamment évoluer. Avant tout
                            déplacement ou toute décision fondée sur une
                            information publiée dans le Codex, il est recommandé
                            de la vérifier auprès de l’établissement, de
                            l’organisme ou de la source officielle concernée.
                        </p>
                        <p>
                            L’éditeur ne pourra être tenu responsable d’un
                            dommage résultant d’une interprétation des contenus,
                            d’une information devenue obsolète ou d’une
                            indisponibilité temporaire du site, de son API ou de
                            ses services associés.
                        </p>
                    </div>
                </section>

                <section className={styles.section} aria-labelledby="liens">
                    <p className={styles.sectionNumber}>05</p>
                    <div className={styles.sectionContent}>
                        <h2 id="liens">Liens externes</h2>
                        <p>
                            Le site peut proposer des liens vers des services ou
                            sites tiers afin de compléter ses contenus.
                            L’éditeur ne contrôle pas ces services externes et
                            ne peut être tenu responsable de leur disponibilité,
                            de leurs contenus, de leurs pratiques ou de leur
                            politique de protection des données.
                        </p>
                        <p>
                            La création de liens vers les pages publiques du
                            Codex est autorisée, sous réserve de ne pas
                            présenter les contenus de manière trompeuse, de ne
                            pas laisser entendre l’existence d’un partenariat
                            inexistant et de ne pas intégrer les pages du site
                            dans un cadre susceptible de créer une confusion sur
                            leur origine.
                        </p>
                    </div>
                </section>

                <section className={styles.section} aria-labelledby="donnees">
                    <p className={styles.sectionNumber}>06</p>
                    <div className={styles.sectionContent}>
                        <h2 id="donnees">
                            Données personnelles et mesure d’audience
                        </h2>
                        <p>
                            La V1 du Codex ne propose ni création de compte, ni
                            inscription à une lettre d’information, ni
                            formulaire public recueillant directement des
                            informations personnelles.
                        </p>
                        <p>
                            Des données techniques peuvent néanmoins être
                            traitées par Vercel pour assurer l’hébergement, la
                            sécurité et le fonctionnement du site. Leur
                            traitement est décrit dans la{" "}
                            <a href="https://vercel.com/legal/privacy-notice">
                                politique de confidentialité de Vercel
                            </a>
                            .
                        </p>
                        <p>
                            Le site utilise{" "}
                            <strong>Vercel Web Analytics</strong> afin de
                            mesurer son audience et d’améliorer ses contenus.
                            Cet outil collecte des statistiques agrégées telles
                            que les pages consultées, le site référent, la
                            localisation approximative, le navigateur, le
                            système d’exploitation et le type d’appareil. Il
                            n’utilise pas de cookie et ne conserve pas l’adresse
                            IP avec les données d’audience. L’identifiant
                            anonyme calculé à partir de la requête est renouvelé
                            chaque jour et supprimé après vingt-quatre heures.
                        </p>
                        <p>
                            Cette mesure d’audience poursuit l’intérêt légitime
                            de l’éditeur à comprendre l’utilisation du Codex et
                            à en améliorer le fonctionnement. Les données sont
                            accessibles à l’éditeur sous forme agrégée et
                            traitées par Vercel en qualité de prestataire
                            technique.
                        </p>
                        <p>
                            Un conteneur Google Tag Manager est présent sur le
                            site, mais aucune balise n’y est publiée pour la V1.
                            Il n’est donc pas utilisé à ce jour pour déposer des
                            traceurs de mesure d’audience ou de publicité. Toute
                            évolution nécessitant un consentement préalable
                            donnera lieu à une information et à un mécanisme de
                            choix adaptés.
                        </p>
                        <p>
                            Pour exercer vos droits ou poser une question
                            relative aux données personnelles, écrivez à{" "}
                            <a href="mailto:julien@loireridezen.bike">
                                julien@loireridezen.bike
                            </a>
                            . Vous pouvez également adresser une réclamation à
                            la{" "}
                            <a href="https://www.cnil.fr/fr/plaintes">
                                Commission nationale de l’informatique et des
                                libertés
                            </a>
                            .
                        </p>
                    </div>
                </section>

                <section className={styles.section} aria-labelledby="droit">
                    <p className={styles.sectionNumber}>07</p>
                    <div className={styles.sectionContent}>
                        <h2 id="droit">Droit applicable</h2>
                        <p>
                            Le site et les présentes mentions légales sont
                            soumis au droit français.
                        </p>
                        <p>
                            Pour toute question concernant le site, ses contenus
                            ou l’utilisation de données personnelles, vous
                            pouvez écrire à{" "}
                            <a href="mailto:julien@loireridezen.bike">
                                julien@loireridezen.bike
                            </a>
                            .
                        </p>
                    </div>
                </section>
            </article>
        </PageShell>
    );
}
