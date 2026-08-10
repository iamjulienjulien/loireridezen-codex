import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";
import ComponentsNavigation from "../components/ComponentsNavigation/ComponentsNavigation";
import { LRZ_COLOR_GROUPS, LRZ_COLOR_REGISTRY } from "@/registry/colors";
import styles from "./page.module.css";

export const metadata = getAtelierPageMetadata("/atelier/colors");

const AMBIANCES = [
    [
        "jour",
        "Jour",
        [
            ["Fond", "fond", "#F5ECD9"],
            ["Ciel haut", "ciel-haut", "#CFE4EA"],
            ["Ciel bas", "ciel-bas", "#EEF3E8"],
            ["Titre château", "fond-titre", "#805C3C"],
            ["Sous-titre château", "fond-sous-titre", "#F5EAD4"],
            ["Surface", "surface", "#FAF3E5"],
            ["Élévation", "elevation", "#FFFFFF"],
            ["Texte primaire", "texte-primaire", "#2B2620"],
            ["Texte secondaire", "texte-secondaire", "#6B605C"],
            ["Texte tertiaire", "texte-tertiaire", "#A0928C"],
            ["Accent", "accent", "#C8893A"],
        ],
    ],
    [
        "aube",
        "Aube",
        [
            ["Fond", "fond", "#F4E7E6"],
            ["Ciel haut", "ciel-haut", "#B9C8DC"],
            ["Ciel bas", "ciel-bas", "#F7DFBF"],
            ["Titre château", "fond-titre", "#80606C"],
            ["Sous-titre château", "fond-sous-titre", "#F5DED9"],
            ["Surface", "surface", "#FBF0EE"],
            ["Élévation", "elevation", "#FFFFFF"],
            ["Texte primaire", "texte-primaire", "#34272A"],
            ["Texte secondaire", "texte-secondaire", "#75605F"],
            ["Texte tertiaire", "texte-tertiaire", "#AB928F"],
            ["Accent", "accent", "#EDC5C5"],
        ],
    ],
    [
        "soir",
        "Soir",
        [
            ["Fond", "fond", "#2D1F1A"],
            ["Ciel haut", "ciel-haut", "#554761"],
            ["Ciel bas", "ciel-bas", "#D49A68"],
            ["Titre château", "fond-titre", "#5C3F4B"],
            ["Sous-titre château", "fond-sous-titre", "#3D2D30"],
            ["Surface", "surface", "#382821"],
            ["Élévation", "elevation", "#43322A"],
            ["Texte primaire", "texte-primaire", "#F0E0C8"],
            ["Texte secondaire", "texte-secondaire", "#C8A890"],
            ["Texte tertiaire", "texte-tertiaire", "#8A7665"],
            ["Accent", "accent", "#D49A68"],
        ],
    ],
    [
        "nuit",
        "Nuit",
        [
            ["Fond", "fond", "#0E1217"],
            ["Ciel haut", "ciel-haut", "#0D1726"],
            ["Ciel bas", "ciel-bas", "#24344A"],
            ["Titre château", "fond-titre", "#24344B"],
            ["Sous-titre château", "fond-sous-titre", "#182330"],
            ["Surface", "surface", "#171C24"],
            ["Élévation", "elevation", "#1E2530"],
            ["Texte primaire", "texte-primaire", "#E8E0D0"],
            ["Texte secondaire", "texte-secondaire", "#A0928C"],
            ["Texte tertiaire", "texte-tertiaire", "#6B605C"],
            ["Accent", "accent", "#DCC8A0"],
        ],
    ],
] as const;

const NATURE_GROUP = LRZ_COLOR_GROUPS.find((group) => group.id === "nature")!;
const PATRIMOINE_GROUP = LRZ_COLOR_GROUPS.find(
    (group) => group.id === "patrimoine",
)!;
const PALETTE_GROUPS = LRZ_COLOR_GROUPS.filter(
    (group) => group.id !== "nature" && group.id !== "patrimoine",
);

function AmbiancePreview({
    colors,
}: {
    colors: readonly (readonly string[])[];
}) {
    const value = (token: string) =>
        colors.find((color) => color[1] === token)?.[2] ?? "transparent";
    const fond = value("fond");
    const surface = value("surface");
    const primary = value("texte-primaire");
    const secondary = value("texte-secondaire");
    const accent = value("accent");

    return (
        <div
            aria-label="Aperçu d’utilisation de l’ambiance"
            style={{
                display: "grid",
                gap: "0.7rem",
                marginTop: "1.25rem",
                padding: "1rem",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                background: fond,
                color: primary,
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                }}
            >
                <span style={{ color: accent }}>Loire Ride Zen</span>
                <span style={{ color: secondary }}>Le Codex</span>
            </div>
            <div
                style={{
                    padding: "1rem",
                    borderRadius: "var(--radius-sm)",
                    background: surface,
                    boxShadow: "0 6px 16px rgb(0 0 0 / 12%)",
                }}
            >
                <p
                    style={{
                        margin: 0,
                        color: accent,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.09em",
                        textTransform: "uppercase",
                    }}
                >
                    Carnet ligérien
                </p>
                <strong
                    style={{
                        display: "block",
                        marginTop: "0.4rem",
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 540,
                    }}
                >
                    Le fil de la Loire
                </strong>
                <p
                    style={{
                        margin: "0.45rem 0 0",
                        color: secondary,
                        fontSize: "0.75rem",
                        lineHeight: 1.55,
                    }}
                >
                    Un aperçu de hiérarchie, de matière et de contraste.
                </p>
            </div>
            <div
                style={{
                    height: "0.2rem",
                    borderRadius: "999px",
                    background: accent,
                }}
            />
        </div>
    );
}

export default function AtelierColorsPage() {
    return (
        <>
            <ComponentsNavigation current="colors" />
            <div className="atelier-foundation-wrap">
                <header className="atelier-doc-header">
                    <div className="atelier-doc-links">
                        <Link href="/atelier">← Retour à l’Atelier</Link>
                        <Link href="/">Retour à Loire Ride Zen</Link>
                    </div>
                    <p className="atelier-kicker">
                        Atelier · Fondations visuelles
                    </p>
                    <h1>Couleurs</h1>
                    <p className="atelier-doc-lede">
                        La nouvelle palette LRZ rassemble les teintes du vivant,
                        les neutres de lecture et la matière du patrimoine.
                        Chaque couleur est un token stable avant d’être un effet
                        décoratif.
                    </p>
                </header>
                <section className="atelier-section-card atelier-intro-card">
                    <div>
                        <p className="atelier-kicker">Convention</p>
                        <h2>Des tokens, pas des hex isolés</h2>
                    </div>
                    <p>
                        Utilise la clé LRZ dans les composants, ou la variable
                        CSS indiquée ci-dessous dans les styles. Les valeurs hex
                        servent ici de repère de documentation.
                    </p>
                    <pre>
                        <code>
                            {
                                'color="prairie"\nbackground: var(--color-nature-prairie);'
                            }
                        </code>
                    </pre>
                </section>
                <section className="atelier-section-card">
                    <header className="atelier-section-header">
                        <p className="atelier-kicker">Palette LRZ</p>
                        <h2>Couleurs permanentes</h2>
                        <span>
                            {PALETTE_GROUPS.reduce(
                                (total, group) => total + group.colors.length,
                                0,
                            )}{" "}
                            teintes
                        </span>
                    </header>
                    {PALETTE_GROUPS.map((group) => (
                        <section key={group.id}>
                            <header className="atelier-section-header">
                                <p className="atelier-kicker">Famille</p>
                                <h2>{group.title}</h2>
                                <span>{group.colors.length} teintes</span>
                            </header>
                            <div className="atelier-card-grid">
                                {group.colors.map((color) => {
                                    const definition =
                                        LRZ_COLOR_REGISTRY[color];
                                    return (
                                        <article
                                            className={styles.swatch}
                                            key={color}
                                        >
                                            <div
                                                className={styles.color}
                                                style={{
                                                    backgroundColor:
                                                        definition.value,
                                                }}
                                            >
                                                <span>{definition.label}</span>
                                                <span>{definition.value}</span>
                                            </div>
                                            <div className={styles.meta}>
                                                <strong>
                                                    {definition.label}
                                                </strong>
                                                <code>{color}</code>
                                                <code>
                                                    {definition.variable}
                                                </code>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </section>
                {[NATURE_GROUP, PATRIMOINE_GROUP].map((group) => (
                    <section
                        className="atelier-section-card"
                        key={group.id}
                        style={{ marginTop: "1.25rem" }}
                    >
                        <header className="atelier-section-header">
                            <p className="atelier-kicker">Collection</p>
                            <h2>{group.title}</h2>
                            <span>{group.colors.length} teintes</span>
                        </header>
                        <div className="atelier-card-grid">
                            {group.colors.map((color) => {
                                const definition = LRZ_COLOR_REGISTRY[color];
                                return (
                                    <article
                                        className={styles.swatch}
                                        key={color}
                                    >
                                        <div
                                            className={styles.color}
                                            style={{
                                                backgroundColor:
                                                    definition.value,
                                            }}
                                        >
                                            <span>{definition.label}</span>
                                            <span>{definition.value}</span>
                                        </div>
                                        <div className={styles.meta}>
                                            <strong>{definition.label}</strong>
                                            <code>{color}</code>
                                            <code>{definition.variable}</code>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                ))}
                <div className="atelier-section-card-list">
                    {AMBIANCES.map(([id, title, colors]) => (
                        <section className="atelier-section-card" key={id}>
                            <header className="atelier-section-header">
                                <p className="atelier-kicker">Ambiance</p>
                                <h2>{title}</h2>
                                <span>{colors.length} teintes</span>
                            </header>
                            <AmbiancePreview colors={colors} />
                            <div className="atelier-card-grid">
                                {colors.map(([label, token, value]) => (
                                    <article
                                        className={styles.swatch}
                                        key={token}
                                    >
                                        <div
                                            className={styles.color}
                                            style={{ backgroundColor: value }}
                                        >
                                            <span>{label}</span>
                                            <span>{value}</span>
                                        </div>
                                        <div className={styles.meta}>
                                            <strong>{label}</strong>
                                            <code>
                                                --color-{id}-{token}
                                            </code>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </>
    );
}
