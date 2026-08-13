"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Copy, Share2 } from "lucide-react";

import {
    LRZDialog,
    LRZDialogBody,
    LRZDialogContent,
    LRZDialogFooter,
    LRZDialogTitle,
    type LRZDialogSize,
    type LRZDialogVariant,
} from "@/components/_ui/LRZDialog";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZCardDialog.module.css";

const SWIPE_THRESHOLD = 56;
const CARD_TRANSITION_DURATION = 160;
const CARD_ENTRY_TRANSITION_DURATION = 220;

export type LRZCardDialogItem = {
    /** Identifiant stable utilisé par la route et la navigation. */
    id: string;
    /** Nom lisible de l’élément, annoncé par les contrôles. */
    label: string;
};

export type LRZCardDialogNavigationDirection = "previous" | "next";

export type LRZCardDialogNavigationMode = "button" | "keyboard" | "swipe";

export type LRZCardDialogNavigationContext = {
    direction: LRZCardDialogNavigationDirection;
    interactionMode: LRZCardDialogNavigationMode;
    position: number;
    total: number;
};

export type LRZCardDialogNavigation = {
    /** Élément précédent dans l’ordre éditorial de l’index. */
    previous?: LRZCardDialogItem;
    /** Élément suivant dans l’ordre éditorial de l’index. */
    next?: LRZCardDialogItem;
    /** Position courante dans l’index, à partir de 1. */
    position: number;
    /** Nombre total d’éléments navigables dans l’index. */
    total: number;
    /** Met à jour l’élément ouvert et son URL profonde. */
    onNavigate: (
        item: LRZCardDialogItem,
        context: LRZCardDialogNavigationContext,
    ) => void;
};

export function resolveLRZCardDialogNavigation(
    navigation: LRZCardDialogNavigation,
    direction: LRZCardDialogNavigationDirection,
    interactionMode: LRZCardDialogNavigationMode,
) {
    const item = navigation[direction];
    const position = navigation.position + (direction === "previous" ? -1 : 1);

    if (
        !item ||
        !Number.isInteger(position) ||
        !Number.isInteger(navigation.total) ||
        position < 1 ||
        position > navigation.total
    ) {
        return null;
    }

    return {
        item,
        context: {
            direction,
            interactionMode,
            position,
            total: navigation.total,
        } satisfies LRZCardDialogNavigationContext,
    };
}

export type LRZCardDialogShare = {
    /** URL canonique et partageable de l’élément. */
    url: string;
    /** Titre transmis aux plateformes de partage. */
    title: string;
    /** Texte court facultatif transmis au partage natif et à X. */
    text?: string;
};

export type LRZCardDialogProps = {
    /** État contrôlé du dialogue. */
    open: boolean;
    /** Réagit à la fermeture par Échap, clic extérieur ou bouton. */
    onOpenChange: (open: boolean) => void;
    /** Libellé de l’index affiché dans l’en-tête. */
    indexLabel: string;
    /** Symbole décoratif facultatif de l’index. */
    indexIcon?: ReactNode;
    /** Élément affiché, utilisé pour les annonces accessibles. */
    item: LRZCardDialogItem;
    /** Contenu de la carte déjà utilisé dans l’index. */
    children: ReactNode;
    /** Navigation éditoriale précédente/suivante. */
    navigation?: LRZCardDialogNavigation;
    /** Données nécessaires au pied de partage. */
    share?: LRZCardDialogShare;
    /** Taille LRZDialog, fixée à sm pour les cartes d’index. */
    size?: LRZDialogSize;
    /** Variante visuelle du LRZDialog sous-jacent. */
    variant?: LRZDialogVariant;
    /** Couleur d’accent du dialogue. */
    color?: LRZColor;
    /** Couleur CSS d’accent, prioritaire sur la palette. */
    customColor?: string;
    /** Classe additionnelle du viewport de carte. */
    className?: string;
};

function joinClassNames(...classNames: Array<string | undefined | false>) {
    return classNames.filter(Boolean).join(" ");
}

function BrandIcon({ platform }: { platform: "x" | "facebook" | "linkedin" }) {
    if (platform === "x") {
        return (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.37l7.24-8.27L2.96 2h6.4l4.42 5.84L18.9 2Zm-1.1 18.02h1.72L8.43 3.87H6.58L17.8 20.02Z" />
            </svg>
        );
    }

    if (platform === "facebook") {
        return (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.5v3h2.8v8h3.2Z" />
            </svg>
        );
    }

    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.2 3.5A1.8 1.8 0 1 0 5.2 7a1.8 1.8 0 0 0 0-3.5ZM3.7 8.4h3v12.1h-3V8.4Zm4.9 0h2.9V10c.4-.8 1.5-1.9 3.3-1.9 3.5 0 4.2 2.3 4.2 5.3v7.1h-3v-6.3c0-1.5 0-3.5-2.1-3.5s-2.5 1.7-2.5 3.4v6.4h-3V8.4Z" />
        </svg>
    );
}

function isEditableTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
        return false;
    }

    return (
        target.isContentEditable ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
    );
}

function buildShareHref(
    platform: "x" | "facebook" | "linkedin",
    share: LRZCardDialogShare,
) {
    const url = encodeURIComponent(share.url);
    const message = encodeURIComponent(share.text ?? share.title);

    switch (platform) {
        case "x":
            return `https://x.com/intent/post?text=${message}&url=${url}`;
        case "facebook":
            return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        case "linkedin":
            return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }
}

async function copyToClipboard(value: string) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return;
    }

    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
}

export default function LRZCardDialog({
    open,
    onOpenChange,
    indexLabel,
    indexIcon,
    item,
    children,
    navigation,
    share,
    size = "sm",
    variant = "immersive",
    color = "ocre",
    customColor,
    className,
}: LRZCardDialogProps) {
    const swipeStart = useRef<{
        x: number;
        y: number;
        pointerId: number;
    } | null>(null);
    const navigationLocked = useRef(false);
    const [shareStatus, setShareStatus] = useState("");
    const [transition, setTransition] = useState<{
        direction: "previous" | "next";
        itemId: string;
    } | null>(null);
    const [cardEntryAnimation, setCardEntryAnimation] = useState<
        "previous" | "next" | null
    >(null);

    const navigate = (
        direction: LRZCardDialogNavigationDirection,
        interactionMode: LRZCardDialogNavigationMode,
    ) => {
        const resolved = navigation
            ? resolveLRZCardDialogNavigation(
                  navigation,
                  direction,
                  interactionMode,
              )
            : null;

        if (!resolved || navigationLocked.current) {
            return;
        }

        navigationLocked.current = true;
        setTransition({ direction, itemId: item.id });
        window.setTimeout(() => {
            navigation?.onNavigate(resolved.item, resolved.context);
            setTransition(null);
            setCardEntryAnimation(direction);
            navigationLocked.current = false;
            window.setTimeout(() => {
                setCardEntryAnimation(null);
            }, CARD_ENTRY_TRANSITION_DURATION);
        }, CARD_TRANSITION_DURATION);
    };

    const handleCopy = async () => {
        if (!share) {
            return;
        }

        try {
            await copyToClipboard(share.url);
            setShareStatus("Lien copié dans le presse-papiers.");
        } catch {
            setShareStatus("Impossible de copier le lien.");
        }
    };

    const handleNativeShare = async () => {
        if (!share) {
            return;
        }

        if (!navigator.share) {
            await handleCopy();
            return;
        }

        try {
            await navigator.share({
                title: share.title,
                text: share.text,
                url: share.url,
            });
        } catch (error) {
            if (!(
                error instanceof DOMException && error.name === "AbortError"
            )) {
                setShareStatus("Impossible d’ouvrir le partage.");
            }
        }
    };

    return (
        <LRZDialog open={open} onOpenChange={onOpenChange}>
            <LRZDialogContent
                className={styles.dialogContent}
                size={size}
                variant={variant}
                scrollMode="content"
                color={color}
                customColor={customColor}
                stickyFooter={Boolean(share)}
                onKeyDown={(event) => {
                    if (
                        event.altKey ||
                        event.ctrlKey ||
                        event.metaKey ||
                        isEditableTarget(event.target)
                    ) {
                        return;
                    }

                    if (event.key === "ArrowLeft" && navigation?.previous) {
                        event.preventDefault();
                        navigate("previous", "keyboard");
                    }

                    if (event.key === "ArrowRight" && navigation?.next) {
                        event.preventDefault();
                        navigate("next", "keyboard");
                    }
                }}
            >
                <header className={styles.header}>
                    {indexIcon ? (
                        <span className={styles.indexIcon} aria-hidden="true">
                            {indexIcon}
                        </span>
                    ) : null}
                    <div>
                        <p className={styles.eyebrow}>Index du Codex</p>
                        <LRZDialogTitle as="h2" className={styles.indexTitle}>
                            {indexLabel}
                        </LRZDialogTitle>
                    </div>
                </header>

                <LRZDialogBody
                    className={joinClassNames(styles.cardViewport, className)}
                    padding="none"
                    onPointerDown={(event) => {
                        if (event.pointerType !== "touch") {
                            return;
                        }

                        swipeStart.current = {
                            x: event.clientX,
                            y: event.clientY,
                            pointerId: event.pointerId,
                        };
                    }}
                    onPointerUp={(event) => {
                        const start = swipeStart.current;
                        swipeStart.current = null;

                        if (!start || start.pointerId !== event.pointerId) {
                            return;
                        }

                        const distanceX = event.clientX - start.x;
                        const distanceY = event.clientY - start.y;

                        if (
                            Math.abs(distanceX) < SWIPE_THRESHOLD ||
                            Math.abs(distanceX) <= Math.abs(distanceY)
                        ) {
                            return;
                        }

                        navigate(distanceX > 0 ? "previous" : "next", "swipe");
                    }}
                    onPointerCancel={() => {
                        swipeStart.current = null;
                    }}
                >
                    <div
                        className={styles.cardContent}
                        data-enter={cardEntryAnimation ?? undefined}
                        data-transition={
                            transition?.itemId === item.id
                                ? transition.direction
                                : undefined
                        }
                    >
                        {children}
                    </div>
                </LRZDialogBody>

                {share ? (
                    <LRZDialogFooter
                        className={styles.shareFooter}
                        align="start"
                        divided
                        sticky
                    >
                        <div className={styles.shareRow}>
                            <p className={styles.shareLabel}>Partager</p>
                            <div className={styles.shareActions}>
                                <button
                                    className={styles.shareButton}
                                    type="button"
                                    onClick={handleNativeShare}
                                    aria-label={`Partager ${item.label}`}
                                    title={`Partager ${item.label}`}
                                >
                                    <Share2 size={15} strokeWidth={1.7} />
                                </button>
                                <a
                                    className={styles.networkLink}
                                    href={buildShareHref("x", share)}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Partager ${item.label} sur X`}
                                >
                                    <BrandIcon platform="x" />
                                </a>
                                <a
                                    className={styles.networkLink}
                                    href={buildShareHref("facebook", share)}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Partager ${item.label} sur Facebook`}
                                >
                                    <BrandIcon platform="facebook" />
                                </a>
                                <a
                                    className={styles.networkLink}
                                    href={buildShareHref("linkedin", share)}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Partager ${item.label} sur LinkedIn`}
                                >
                                    <BrandIcon platform="linkedin" />
                                </a>
                                <button
                                    className={styles.shareButton}
                                    type="button"
                                    onClick={handleCopy}
                                    aria-label={`Copier le lien de ${item.label}`}
                                    title={`Copier le lien de ${item.label}`}
                                >
                                    <Copy size={15} strokeWidth={1.7} />
                                </button>
                            </div>
                        </div>
                        {navigation ? (
                            <div className={styles.navigationRow}>
                                <nav
                                    className={styles.navigation}
                                    aria-label={`Navigation dans ${indexLabel}`}
                                >
                                    <button
                                        className={styles.navigationButton}
                                        type="button"
                                        onClick={() =>
                                            navigate("previous", "button")
                                        }
                                        disabled={
                                            !navigation.previous ||
                                            Boolean(transition)
                                        }
                                        aria-label={
                                            navigation.previous
                                                ? `Élément précédent : ${navigation.previous.label}`
                                                : "Aucun élément précédent"
                                        }
                                    >
                                        <ArrowLeft
                                            size={16}
                                            strokeWidth={1.7}
                                        />
                                        <span>Précédent</span>
                                    </button>
                                    {navigation.position && navigation.total ? (
                                        <span
                                            className={styles.navigationCount}
                                            aria-label={`Élément ${navigation.position} sur ${navigation.total}`}
                                        >
                                            <span aria-hidden="true">
                                                {navigation.position}
                                            </span>
                                            <span aria-hidden="true">
                                                / {navigation.total}
                                            </span>
                                        </span>
                                    ) : null}
                                    <p className={styles.keyboardHint}>
                                        Clavier <kbd>←</kbd> <kbd>→</kbd>
                                    </p>
                                    <button
                                        className={styles.navigationButton}
                                        type="button"
                                        onClick={() =>
                                            navigate("next", "button")
                                        }
                                        disabled={
                                            !navigation.next ||
                                            Boolean(transition)
                                        }
                                        aria-label={
                                            navigation.next
                                                ? `Élément suivant : ${navigation.next.label}`
                                                : "Aucun élément suivant"
                                        }
                                    >
                                        <span>Suivant</span>
                                        <ArrowRight
                                            size={16}
                                            strokeWidth={1.7}
                                        />
                                    </button>
                                </nav>
                            </div>
                        ) : null}
                        <p className={styles.shareStatus} aria-live="polite">
                            {shareStatus}
                        </p>
                    </LRZDialogFooter>
                ) : null}
            </LRZDialogContent>
        </LRZDialog>
    );
}

export { LRZCardDialog };
