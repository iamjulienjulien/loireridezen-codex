import Link from "next/link";

import AtelierCategoryLayout from "../AtelierCategoryLayout";
import styles from "../atelier.module.css";

const COMPONENTS = [
    ["LRZDocCodeBlock", "/atelier/components/lrz-doc-code-block"],
    ["LRZDocCodeInline", "/atelier/components/lrz-doc-code-inline"],
    ["LRZDocList", "/atelier/components/lrz-doc-list"],
    ["LRZDocQuote", "/atelier/components/lrz-doc-quote"],
] as const;

export default function AtelierDocPage() {
    return (
        <AtelierCategoryLayout
            eyebrow="Atelier · Documentation"
            title="Composants Doc"
            description="Les éléments de lecture et de référence qui donnent aux pages de documentation une structure nette et durable."
        >
            <nav className={styles.catalogList} aria-label="Fiches de composants documentaires">
                {COMPONENTS.map(([label, href], index) => (
                    <Link className={styles.catalogLink} href={href} key={href}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{label}</strong>
                        <span aria-hidden="true">→</span>
                    </Link>
                ))}
            </nav>
        </AtelierCategoryLayout>
    );
}
