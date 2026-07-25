import {
    type ComponentPropsWithoutRef,
    type ElementType,
    type ReactNode,
} from "react";

import styles from "./LRZDocList.module.css";

export type LRZDocListVariant =
    | "default"
    | "compact"
    | "check"
    | "timeline";

type UnorderedListProps = Omit<
    ComponentPropsWithoutRef<"ul">,
    "children"
>;

type OrderedListProps = Omit<
    ComponentPropsWithoutRef<"ol">,
    "children"
>;

export type LRZDocListProps = {
    /** Éléments `li` produits notamment par React Markdown. */
    children: ReactNode;

    /** Présentation visuelle de la liste. */
    variant?: LRZDocListVariant;

    /** Rend la liste ordonnée avec un compteur numérique. */
    ordered?: boolean;

    /** Classe supplémentaire appliquée à la racine. */
    className?: string;
} & (UnorderedListProps | OrderedListProps);

export default function LRZDocList({
    children,
    variant = "default",
    ordered = false,
    className,
    ...props
}: LRZDocListProps) {
    const Component: ElementType = ordered ? "ol" : "ul";

    return (
        <Component
            {...props}
            className={[styles.root, className]
                .filter(Boolean)
                .join(" ")}
            data-ordered={ordered || undefined}
            data-variant={variant}
        >
            {children}
        </Component>
    );
}
