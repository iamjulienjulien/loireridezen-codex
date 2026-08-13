// Composant de collection partagé.

import type { ReactNode } from "react";

import styles from "./CollectionCriteria.module.css";

export type CollectionCriteriaVariant = "card" | "accordion";

export type CollectionCriterion = {
    label: string;
    description?: string;
    icon?: ReactNode;
};

export type CollectionCriteriaProps = {
    title?: string;
    description?: string;
    criteria: Array<string | CollectionCriterion>;
    variant?: CollectionCriteriaVariant;
    defaultOpen?: boolean;
    className?: string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

function normalizeCriterion(
    criterion: string | CollectionCriterion,
): CollectionCriterion {
    if (typeof criterion === "string") {
        return {
            label: criterion,
        };
    }

    return criterion;
}

function CriteriaContent({
    criteria,
}: {
    criteria: Array<string | CollectionCriterion>;
}) {
    return (
        <ul className={styles.list}>
            {criteria.map((criterion) => {
                const item = normalizeCriterion(criterion);

                return (
                    <li key={item.label} className={styles.item}>
                        <span className={styles.icon} aria-hidden="true">
                            {item.icon ?? "✓"}
                        </span>

                        <div className={styles.itemContent}>
                            <span className={styles.label}>{item.label}</span>

                            {item.description ? (
                                <span className={styles.itemDescription}>
                                    {item.description}
                                </span>
                            ) : null}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export function CollectionCriteria({
    title = "Comment ce classement est construit",
    description,
    criteria,
    variant = "card",
    defaultOpen = false,
    className,
}: CollectionCriteriaProps) {
    if (variant === "accordion") {
        return (
            <details
                className={joinClassNames(
                    styles.criteria,
                    styles.accordion,
                    className,
                )}
                open={defaultOpen}
            >
                <summary className={styles.summary}>
                    <span className={styles.summaryContent}>
                        <span className={styles.eyebrow} aria-hidden="true">
                            Méthode
                        </span>

                        <span className={styles.title}>{title}</span>
                    </span>

                    <span className={styles.chevron} aria-hidden="true">
                        ↓
                    </span>
                </summary>

                <div className={styles.accordionContent}>
                    {description ? (
                        <p className={styles.description}>{description}</p>
                    ) : null}

                    <CriteriaContent criteria={criteria} />
                </div>
            </details>
        );
    }

    return (
        <aside
            className={joinClassNames(styles.criteria, styles.card, className)}
            aria-labelledby="collection-criteria-title"
        >
            <div className={styles.header}>
                <span className={styles.eyebrow} aria-hidden="true">
                    Méthode
                </span>

                <h2 id="collection-criteria-title" className={styles.title}>
                    {title}
                </h2>

                {description ? (
                    <p className={styles.description}>{description}</p>
                ) : null}
            </div>

            <CriteriaContent criteria={criteria} />
        </aside>
    );
}

export default CollectionCriteria;
