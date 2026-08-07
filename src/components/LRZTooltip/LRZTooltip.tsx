"use client";

import {
    cloneElement,
    isValidElement,
    useEffect,
    useId,
    useRef,
    useState,
    useSyncExternalStore,
    type CSSProperties,
    type ReactElement,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import styles from "./LRZTooltip.module.css";

const subscribeToMount = () => () => {};
const getClientMountSnapshot = () => true;
const getServerMountSnapshot = () => false;

export type LRZTooltipSide = "top" | "right" | "bottom" | "left";
export type LRZTooltipAlign = "start" | "center" | "end";
export type LRZTooltipTrigger = "hover" | "click" | "open";

export type LRZTooltipProps = {
    /** Élément déclencheur du tooltip. */
    children: ReactElement;
    /** Contenu affiché au survol ou au focus clavier. */
    content: ReactNode;
    /** Position du tooltip autour de l’élément déclencheur. */
    side?: LRZTooltipSide;
    /** Alignement du tooltip sur l’axe secondaire. */
    align?: LRZTooltipAlign;
    /** Interaction qui ouvre l’infobulle. */
    trigger?: LRZTooltipTrigger;
    /** Délai d’apparition en millisecondes. */
    delay?: number;
    /** Identifiant utile pour le lien aria-describedby. */
    id?: string;
    /** Désactive l’affichage du tooltip tout en conservant l’élément déclencheur. */
    disabled?: boolean;
    /** Rend le tooltip dans le document pour éviter les conteneurs avec overflow. */
    portal?: boolean;
    /** Classe additionnelle appliquée au conteneur. */
    className?: string;
};

export default function LRZTooltip({
    children,
    content,
    side = "top",
    align = "center",
    trigger = "hover",
    delay = 120,
    id,
    disabled = false,
    portal = false,
    className,
}: LRZTooltipProps) {
    const generatedId = useId();
    const rootRef = useRef<HTMLSpanElement>(null);
    const portalRef = useRef<HTMLSpanElement>(null);
    const [open, setOpen] = useState(false);
    const mounted = useSyncExternalStore(
        subscribeToMount,
        getClientMountSnapshot,
        getServerMountSnapshot,
    );
    const [portalPosition, setPortalPosition] = useState<CSSProperties>();
    const isVisible = trigger === "open" || open;

    useEffect(() => {
        if (!portal || !isVisible) return;

        const updatePosition = () => {
            if (!rootRef.current || !portalRef.current) return;

            setPortalPosition(
                getPortalPosition(
                    rootRef.current.getBoundingClientRect(),
                    portalRef.current.getBoundingClientRect(),
                    side,
                    align,
                ),
            );
        };

        const frame = requestAnimationFrame(updatePosition);
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [align, isVisible, portal, side]);

    useEffect(() => {
        if (!open || trigger !== "click") return;

        const closeOnOutsidePointer = (event: PointerEvent) => {
            const target = event.target as Node | null;

            if (
                target &&
                (rootRef.current?.contains(target) ||
                    portalRef.current?.contains(target))
            ) {
                return;
            }

            setOpen(false);
        };

        document.addEventListener("pointerdown", closeOnOutsidePointer);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsidePointer);
        };
    }, [open, trigger]);

    if (disabled || content == null || content === false) return children;

    const tooltipId = id ?? `lrz-tooltip-${generatedId.replace(/:/g, "")}`;
    const triggerElement = isValidElement(children)
        ? cloneElement(children as ReactElement<Record<string, unknown>>, {
              "aria-describedby": portal && !mounted ? undefined : tooltipId,
          })
        : children;

    return (
        <span
            className={[styles.root, className].filter(Boolean).join(" ")}
            data-align={align}
            data-open={isVisible ? "true" : undefined}
            data-portal={portal ? "true" : undefined}
            data-side={side}
            onBlur={(event) => {
                if (
                    !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                    ) &&
                    (trigger === "click" || (trigger === "hover" && portal))
                ) {
                    setOpen(false);
                }
            }}
            onClick={() => {
                if (trigger === "click") setOpen((value) => !value);
            }}
            onMouseEnter={() => {
                if (trigger === "hover" && portal) setOpen(true);
            }}
            onMouseLeave={() => {
                if (trigger === "hover" && portal) setOpen(false);
            }}
            onFocus={() => {
                if (trigger === "hover" && portal) setOpen(true);
            }}
            ref={rootRef}
            style={{ "--tooltip-delay": `${delay}ms` } as CSSProperties}
        >
            {triggerElement}
            {portal
                ? isVisible &&
                  mounted
                    ? createPortal(
                          <span
                              ref={portalRef}
                              id={tooltipId}
                              className={[styles.tooltip, styles.portalTooltip].join(" ")}
                              data-align={align}
                              data-portal-tooltip="true"
                              data-portal-ready={portalPosition ? "true" : undefined}
                              data-side={side}
                              role="tooltip"
                              style={portalPosition}
                              onMouseEnter={() => {
                                  if (trigger === "hover") setOpen(true);
                              }}
                              onMouseLeave={() => {
                                  if (trigger === "hover") setOpen(false);
                              }}
                          >
                              {content}
                          </span>,
                          document.body,
                      )
                    : null
                : <span id={tooltipId} className={styles.tooltip} role="tooltip">
                      {content}
                  </span>}
        </span>
    );
}

function getPortalPosition(
    trigger: DOMRect,
    tooltip: DOMRect,
    side: LRZTooltipSide,
    align: LRZTooltipAlign,
): CSSProperties {
    const gap = 10;
    let top = 0;
    let left = 0;

    if (side === "top" || side === "bottom") {
        top = side === "top" ? trigger.top - tooltip.height - gap : trigger.bottom + gap;
        left = getCrossAxisPosition(trigger, tooltip, align, "horizontal");
    } else {
        left = side === "left" ? trigger.left - tooltip.width - gap : trigger.right + gap;
        top = getCrossAxisPosition(trigger, tooltip, align, "vertical");
    }

    return {
        top: Math.max(8, Math.min(top, window.innerHeight - tooltip.height - 8)),
        left: Math.max(8, Math.min(left, window.innerWidth - tooltip.width - 8)),
    };
}

function getCrossAxisPosition(
    trigger: DOMRect,
    tooltip: DOMRect,
    align: LRZTooltipAlign,
    axis: "horizontal" | "vertical",
): number {
    const start = axis === "horizontal" ? trigger.left : trigger.top;
    const size = axis === "horizontal" ? trigger.width : trigger.height;
    const tooltipSize = axis === "horizontal" ? tooltip.width : tooltip.height;

    if (align === "start") return start;
    if (align === "end") return start + size - tooltipSize;
    return start + (size - tooltipSize) / 2;
}
