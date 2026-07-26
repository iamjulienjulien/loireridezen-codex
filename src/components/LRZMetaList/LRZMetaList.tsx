import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZMetaList.module.css";

export type LRZMetaListTone = "plain" | "divided" | "soft";

export type LRZMetaListSize = "sm" | "md" | "lg";

export type LRZMetaListLayout = "responsive" | "inline" | "stacked";

export type LRZMetaListColumns = 1 | 2 | 3 | "auto";

export type LRZMetaListValueAlign = "start" | "end";

export type LRZMetaListItem = {
    /** Identifiant stable utilisé comme clé React. */
    id: string;
    /** Libellé décrivant la métadonnée. */
    label: ReactNode;
    /** Valeur associée au libellé. */
    value?: ReactNode;
    /** Icône décorative placée dans le libellé. */
    icon?: ReactNode;
    /** Précision secondaire affichée sous la valeur. */
    hint?: ReactNode;
    /** Renforce visuellement la valeur. */
    emphasized?: boolean;
    /** Retire explicitement l’entrée de la liste. */
    hidden?: boolean;
    /** Nombre de colonnes externes occupées par l’entrée. */
    span?: 1 | 2 | 3 | "full";
    /** Classe additionnelle appliquée à l’entrée. */
    className?: string;
};

export type LRZMetaListProps = Omit<
    HTMLAttributes<HTMLDListElement>,
    "children" | "color"
> & {
    /** Métadonnées affichées par la liste. */
    items: readonly LRZMetaListItem[];
    /** Couleur d’accent issue de la palette Loire Ride Zen. */
    color?: LRZColor;
    /** Traitement visuel des entrées. */
    tone?: LRZMetaListTone;
    /** Densité du composant. */
    size?: LRZMetaListSize;
    /** Organisation des libellés et des valeurs. */
    layout?: LRZMetaListLayout;
    /** Nombre de métadonnées distribuées sur une ligne. */
    columns?: LRZMetaListColumns;
    /** Alignement horizontal des valeurs. */
    valueAlign?: LRZMetaListValueAlign;
    /** Contenu substitué aux valeurs absentes. */
    emptyValue?: ReactNode;
    /** Retire les entrées dont la valeur est absente. */
    hideEmpty?: boolean;
    /** Largeur CSS de la colonne des libellés. */
    labelWidth?: string;
    /** Classe commune appliquée à chaque entrée. */
    itemClassName?: string;
};

type LRZMetaListStyle = CSSProperties & {
    "--meta-list-color": string;
    "--meta-list-label-width"?: string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
) {
    return classNames.filter(Boolean).join(" ");
}

function isEmptyValue(value: ReactNode) {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim().length === 0)
    );
}

export default function LRZMetaList({
    items,
    color = "ocre",
    tone = "divided",
    size = "md",
    layout = "responsive",
    columns = 1,
    valueAlign = "start",
    emptyValue = "—",
    hideEmpty = false,
    labelWidth,
    itemClassName,
    className,
    style,
    ...props
}: LRZMetaListProps) {
    const paletteColor = `var(${LRZ_COLOR_VARIABLES[color]})`;
    const metaListStyle: LRZMetaListStyle = {
        "--meta-list-color": paletteColor,
        ...(labelWidth ? { "--meta-list-label-width": labelWidth } : undefined),
        ...style,
    };

    const visibleItems = items.filter(
        (item) => !item.hidden && !(hideEmpty && isEmptyValue(item.value)),
    );

    return (
        <dl
            {...props}
            className={joinClassNames(styles.list, className)}
            data-color={color}
            data-columns={columns}
            data-layout={layout}
            data-size={size}
            data-tone={tone}
            data-value-align={valueAlign}
            style={metaListStyle}
        >
            {visibleItems.map((item) => {
                const hasEmptyValue = isEmptyValue(item.value);

                return (
                    <div
                        key={item.id}
                        className={joinClassNames(
                            styles.item,
                            itemClassName,
                            item.className,
                        )}
                        data-emphasized={item.emphasized || undefined}
                        data-span={item.span}
                    >
                        <dt className={styles.label}>
                            {item.icon !== undefined && item.icon !== null ? (
                                <span
                                    className={styles.icon}
                                    aria-hidden="true"
                                >
                                    {item.icon}
                                </span>
                            ) : null}

                            <span>{item.label}</span>
                        </dt>

                        <dd className={styles.value}>
                            <span className={styles.valueContent}>
                                {hasEmptyValue ? emptyValue : item.value}
                            </span>

                            {item.hint !== undefined && item.hint !== null ? (
                                <span className={styles.hint}>{item.hint}</span>
                            ) : null}
                        </dd>
                    </div>
                );
            })}
        </dl>
    );
}
