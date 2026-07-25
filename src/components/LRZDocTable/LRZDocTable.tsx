import {
    type ComponentPropsWithoutRef,
    type ReactNode,
} from "react";

import styles from "./LRZDocTable.module.css";

export type LRZDocTableVariant =
    | "default"
    | "compact"
    | "striped"
    | "comparison";

export type LRZDocTableProps = Omit<
    ComponentPropsWithoutRef<"div">,
    "children"
> & {
    /** Table HTML native rendue à l’intérieur du conteneur. */
    children: ReactNode;

    /** Présentation visuelle de la table. */
    variant?: LRZDocTableVariant;

    /** Légende visuelle affichée au-dessus de la table. */
    title?: ReactNode;

    /** Texte d’accompagnement optionnel. */
    description?: ReactNode;

    /** Rend la première colonne visuellement dominante. */
    emphasizeFirstColumn?: boolean;
};

export default function LRZDocTable({
    children,
    variant = "default",
    title,
    description,
    emphasizeFirstColumn = false,
    className,
    ...props
}: LRZDocTableProps) {
    const hasHeader = Boolean(title || description);

    return (
        <figure
            className={[styles.root, className]
                .filter(Boolean)
                .join(" ")}
            data-variant={variant}
            data-emphasize-first-column={
                emphasizeFirstColumn ? "true" : undefined
            }
        >
            {hasHeader ? (
                <figcaption className={styles.caption}>
                    {title ? (
                        <strong className={styles.title}>
                            {title}
                        </strong>
                    ) : null}

                    {description ? (
                        <span className={styles.description}>
                            {description}
                        </span>
                    ) : null}
                </figcaption>
            ) : null}

            <div
                {...props}
                className={styles.scroll}
                tabIndex={0}
                role="region"
                aria-label={
                    typeof title === "string"
                        ? title
                        : "Tableau de documentation"
                }
            >
                <div className={styles.tableFrame}>
                    {children}
                </div>
            </div>
        </figure>
    );
}
