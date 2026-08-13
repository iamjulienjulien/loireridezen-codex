// src/components/CollectionList/CollectionList.tsx

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import styles from "./CollectionList.module.css";

export type CollectionListGap = "sm" | "md" | "lg";

export type CollectionListProps<TElement extends ElementType = "div"> = {
    as?: TElement;
    children: ReactNode;
    gap?: CollectionListGap;
    dividers?: boolean;
    className?: string;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

export function CollectionList<TElement extends ElementType = "div">({
    as,
    children,
    gap = "md",
    dividers = false,
    className,
    ...props
}: CollectionListProps<TElement>) {
    const Element = as ?? "div";

    return (
        <Element
            className={joinClassNames(
                styles.list,
                styles[gap],
                dividers && styles.dividers,
                className,
            )}
            {...props}
        >
            {children}
        </Element>
    );
}

export default CollectionList;
