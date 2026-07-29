import type { Metadata } from "next";
import Link from "next/link";

import { LRZCompteur } from "@/components/LRZCompteur";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import styles from "../filter-playground.module.css";
import LRZCompteurPlayground from "./LRZCompteurPlayground";

const PROPS = [
    {
        name: "value",
        type: "number",
        required: "Oui",
        defaultValue: "—",
        description:
            "Valeur affichée et animée. Une valeur non finie est ramenée à 0.",
    },
    {
        name: "label",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Légende éditoriale sous le boîtier et complément du libellé accessible.",
    },
    {
        name: "prefix / suffix",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Texte court avant ou après le nombre, par exemple « km ».",
    },
    {
        name: "format",
        type: '"integer" | "decimal"',
        required: "Non",
        defaultValue: '"integer"',
        description:
            "Active l’affichage des décimales lorsque la valeur doit être précise.",
    },
    {
        name: "decimals",
        type: "number",
        required: "Non",
        defaultValue: "0",
        description:
            'Nombre de décimales entre 0 et 6 ; utilisé avec format="decimal".',
    },
    {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        required: "Non",
        defaultValue: '"md"',
        description:
            "Échelle du compteur : micro-compteur, carte compacte, statistique ou chiffre manifeste.",
    },
    {
        name: "tone",
        type: '"gold" | "cream" | "accent"',
        required: "Non",
        defaultValue: '"gold"',
        description: "Accent colorimétrique du boîtier et des chiffres.",
    },
    {
        name: "theme",
        type: '"brass" | "ivory" | "slate" | "river"',
        required: "Non",
        defaultValue: '"brass"',
        description: "Matière du compteur : laiton, ivoire, ardoise ou eau.",
    },
    {
        name: "variant",
        type: '"machine" | "minimal" | "panel"',
        required: "Non",
        defaultValue: '"machine"',
        description:
            "Présence du boîtier : mécanique, réduite ou renforcée en panneau.",
    },
    {
        name: "accent",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Couleur CSS qui surcharge l’accent du thème, par exemple une variable LRZ.",
    },
    {
        name: "padding",
        type: "boolean",
        required: "Non",
        defaultValue: "true",
        description:
            "Conserve l’espace intérieur du boîtier ; false plaque les digits contre son cadre.",
    },
    {
        name: "digits / leadingZeros",
        type: "number / boolean",
        required: "Non",
        defaultValue: "undefined / false",
        description:
            "Fixe une largeur de 1 à 12 digits ; leadingZeros remplit les colonnes vides avec des zéros.",
    },
    {
        name: "direction",
        type: '"auto" | "up" | "down"',
        required: "Non",
        defaultValue: '"auto"',
        description:
            "Sens des rouleaux : suit la valeur, force la montée ou force la descente.",
    },
    {
        name: "animation",
        type: '"roll" | "fade" | "none"',
        required: "Non",
        defaultValue: '"roll"',
        description: "Transition utilisée lorsque animate est actif.",
    },
    {
        name: "animate",
        type: "boolean",
        required: "Non",
        defaultValue: "true",
        description:
            "Active le roulement des colonnes lors des changements de valeur.",
    },
    {
        name: "animateOnMount",
        type: "boolean",
        required: "Non",
        defaultValue: "true",
        description: "Déclenche la première arrivée depuis une valeur neutre.",
    },
    {
        name: "duration",
        type: "number",
        required: "Non",
        defaultValue: "650",
        description:
            "Durée maximale de l’animation en millisecondes, plafonnée à 2 000.",
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

export const metadata: Metadata = {
    title: "LRZCompteur — Atelier du Codex ligérien",
    description:
        "Compteur vintage à chiffres roulants du système UI Loire Ride Zen.",
};

export default function LRZCompteurPage() {
    return (
        <main className={styles.page}>
            <ComponentsNavigation current="lrz-compteur" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZCompteur</h1>
                    <p className={styles.lede}>
                        Un afficheur mécanique pour les chiffres qui méritent
                        d’être retenus : il fait rouler la donnée, sans la
                        déguiser en gadget.
                    </p>
                </header>

                <section
                    className={styles.section}
                    aria-labelledby="compteur-overview"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>
                        <h2 id="compteur-overview">
                            Le chiffre devient un objet
                        </h2>
                    </div>
                    <div className={styles.grid}>
                        <div className={styles.preview}>
                            <LRZCompteur
                                label="châteaux recensés"
                                size="sm"
                                value={52}
                            />
                        </div>
                        <div className={styles.preview}>
                            <LRZCompteur
                                label="kilomètres de Loire parcourus"
                                size="md"
                                suffix="km"
                                tone="cream"
                                value={128}
                            />
                        </div>
                        <div className={styles.preview}>
                            <LRZCompteur
                                decimals={1}
                                format="decimal"
                                label="hectares de jardins remarquables"
                                size="md"
                                tone="accent"
                                value={1_248.4}
                            />
                        </div>
                    </div>
                </section>

                <LRZCompteurPlayground />

                <section
                    className={styles.section}
                    aria-labelledby="compteur-props"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="compteur-props">Props</h2>
                        <p>
                            Le compteur reste générique : son contexte provient
                            de sa valeur, de sa légende et de son accent.
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
            </div>
        </main>
    );
}
