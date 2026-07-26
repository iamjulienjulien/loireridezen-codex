"use client";

import {
    useId,
    useState,
    type ButtonHTMLAttributes,
    type CSSProperties,
    type ElementType,
    type HTMLAttributes,
    type ReactNode,
} from "react";
import { ChevronRight } from "lucide-react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZAccordion.module.css";

export type LRZAccordionTone = "plain" | "divided" | "soft" | "surface";
export type LRZAccordionSize = "sm" | "md" | "lg";
export type LRZAccordionHeadingLevel = 2 | 3 | 4 | 5 | 6;
export type LRZAccordionIndicatorPosition = "start" | "end";

export type LRZAccordionProps = {
    /** Libellé principal du déclencheur. */
    title: ReactNode;
    /** Contenu dévoilé lorsque le panneau est ouvert. */
    children: ReactNode;
    /** Information courte affichée sous le titre. */
    description?: ReactNode;
    /** Icône décorative placée avant le titre. */
    icon?: ReactNode;
    /**
     * Indicateur placé à la fin du déclencheur.
     * `undefined` utilise le chevron LRZ ; `null` le masque.
     */
    indicator?: ReactNode | null;
    /** Position de l’indicateur dans le déclencheur. */
    indicatorPosition?: LRZAccordionIndicatorPosition;
    /** Active le changement de fond au survol du déclencheur. */
    hoverState?: boolean;
    /** Étend le déclencheur sur toute la largeur disponible. */
    fullWidth?: boolean;
    /** Couleur d’accent issue de la palette Loire Ride Zen. */
    color?: LRZColor;
    /** Traitement visuel de la racine et du panneau. */
    tone?: LRZAccordionTone;
    /** Densité du composant. */
    size?: LRZAccordionSize;
    /** État imposé par le parent en mode contrôlé. */
    open?: boolean;
    /** État initial en mode non contrôlé. */
    defaultOpen?: boolean;
    /** Appelé après une demande d’ouverture ou de fermeture. */
    onOpenChange?: (open: boolean) => void;
    /** Empêche toute interaction avec le déclencheur. */
    disabled?: boolean;
    /** Identifiant de base. Généré automatiquement lorsqu’il est absent. */
    id?: string;
    /** Place le bouton dans un titre HTML du niveau indiqué. */
    headingLevel?: LRZAccordionHeadingLevel;
    /** Retire le contenu du DOM lorsque le panneau est fermé. */
    unmountOnClose?: boolean;
    /** Nom accessible explicite lorsque le titre n’est pas textuel. */
    ariaLabel?: string;
    /** Classe additionnelle appliquée à la racine. */
    className?: string;
    /** Classe additionnelle appliquée au déclencheur. */
    triggerClassName?: string;
    /** Classe additionnelle appliquée au panneau. */
    panelClassName?: string;
    /** Styles additionnels appliqués à la racine. */
    style?: CSSProperties;
    /** Attributs HTML avancés transmis au bouton. */
    triggerProps?: Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        | "children"
        | "disabled"
        | "id"
        | "onClick"
        | "aria-controls"
        | "aria-expanded"
        | "aria-label"
    >;
    /** Attributs HTML avancés transmis au panneau. */
    panelProps?: Omit<
        HTMLAttributes<HTMLDivElement>,
        "children" | "id" | "hidden"
    >;
};

type LRZAccordionStyle = CSSProperties & {
    "--accordion-color": string;
};

function joinClassNames(...classNames: Array<string | undefined | false>) {
    return classNames.filter(Boolean).join(" ");
}

export default function LRZAccordion({
    title,
    children,
    description,
    icon,
    indicator,
    indicatorPosition = "end",
    hoverState = true,
    fullWidth = false,
    color = "ocre",
    tone = "soft",
    size = "md",
    open,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    id,
    headingLevel,
    unmountOnClose = false,
    ariaLabel,
    className,
    triggerClassName,
    panelClassName,
    style,
    triggerProps,
    panelProps,
}: LRZAccordionProps) {
    const generatedId = useId();
    const baseId = id ?? `lrz-accordion-${generatedId}`;
    const triggerId = `${baseId}-trigger`;
    const panelId = `${baseId}-panel`;
    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? open : internalOpen;
    const Heading = headingLevel ? (`h${headingLevel}` as ElementType) : null;
    const paletteColor = `var(${LRZ_COLOR_VARIABLES[color]})`;
    const accordionStyle: LRZAccordionStyle = {
        "--accordion-color": paletteColor,
        ...style,
    };
    const resolvedIndicator =
        indicator === undefined ? (
            <ChevronRight aria-hidden="true" />
        ) : (
            indicator
        );

    function handleToggle() {
        if (disabled) {
            return;
        }

        const nextOpen = !isOpen;

        if (!isControlled) {
            setInternalOpen(nextOpen);
        }

        onOpenChange?.(nextOpen);
    }

    const trigger = (
        <button
            {...triggerProps}
            id={triggerId}
            className={joinClassNames(
                styles.trigger,
                triggerClassName,
                triggerProps?.className,
            )}
            type="button"
            aria-label={ariaLabel}
            aria-expanded={isOpen}
            aria-controls={panelId}
            disabled={disabled}
            onClick={handleToggle}
        >
            {icon !== undefined && icon !== null ? (
                <span className={styles.icon} aria-hidden="true">
                    {icon}
                </span>
            ) : null}

            <span className={styles.label}>
                <span className={styles.title}>{title}</span>
                {description !== undefined && description !== null ? (
                    <span className={styles.description}>{description}</span>
                ) : null}
            </span>

            {resolvedIndicator !== null ? (
                <span className={styles.indicator} aria-hidden="true">
                    {resolvedIndicator}
                </span>
            ) : null}
        </button>
    );

    return (
        <div
            className={joinClassNames(styles.accordion, className)}
            data-color={color}
            data-disabled={disabled || undefined}
            data-full-width={fullWidth || undefined}
            data-hover-state={hoverState ? "enabled" : "disabled"}
            data-indicator-position={indicatorPosition}
            data-size={size}
            data-state={isOpen ? "open" : "closed"}
            data-tone={tone}
            style={accordionStyle}
        >
            {Heading ? (
                <Heading className={styles.heading}>{trigger}</Heading>
            ) : (
                trigger
            )}

            {isOpen || !unmountOnClose ? (
                <div
                    {...panelProps}
                    id={panelId}
                    className={joinClassNames(
                        styles.panel,
                        panelClassName,
                        panelProps?.className,
                    )}
                    aria-labelledby={triggerId}
                    hidden={!isOpen}
                >
                    <div className={styles.content}>{children}</div>
                </div>
            ) : null}
        </div>
    );
}
