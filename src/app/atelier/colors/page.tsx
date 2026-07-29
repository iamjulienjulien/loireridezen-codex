import type { Metadata } from "next";
import Link from "next/link";
import { LRZ_COLOR_GROUPS, LRZ_COLOR_REGISTRY } from "@/registry/colors";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Couleurs — Atelier du Codex ligérien" };

export default function AtelierColorsPage() {
    return <main className={styles.page}><div className={styles.wrap}>
        <header className={styles.header}><div className={styles.links}><Link href="/atelier">← Retour à l’Atelier</Link><Link href="/">Retour à Loire Ride Zen</Link></div><p className={styles.eyebrow}>Atelier · Fondations visuelles</p><h1>Couleurs</h1><p className={styles.lede}>La nouvelle palette LRZ rassemble les teintes du vivant, les neutres de lecture et la matière du patrimoine. Chaque couleur est un token stable avant d’être un effet décoratif.</p></header>
        <section className={styles.intro}><div><p className={styles.kicker}>Convention</p><h2>Des tokens, pas des hex isolés</h2></div><p>Utilise la clé LRZ dans les composants, ou la variable CSS indiquée ci-dessous dans les styles. Les valeurs hex servent ici de repère de documentation.</p><pre><code>{"color=\"prairie\"\nbackground: var(--color-nature-prairie);"}</code></pre></section>
        <div className={styles.groups}>{LRZ_COLOR_GROUPS.map((group) => <section className={styles.group} key={group.id}><header className={styles.groupHeader}><p className={styles.kicker}>Famille</p><h2>{group.title}</h2><span>{group.colors.length} teintes</span></header><div className={styles.grid}>{group.colors.map((color) => { const definition = LRZ_COLOR_REGISTRY[color]; return <article className={styles.swatch} key={color}><div className={styles.color} style={{ backgroundColor: definition.value }}><span>{definition.label}</span><span>{definition.value}</span></div><div className={styles.meta}><strong>{definition.label}</strong><code>{color}</code><code>{definition.variable}</code></div></article>; })}</div></section>)}</div>
    </div></main>;
}
