"use client";

import {
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
} from "react";

import styles from "./LRZCompteur.module.css";

export type LRZCompteurFormat = "integer" | "decimal";
export type LRZCompteurSize = "xs" | "sm" | "md" | "lg";
export type LRZCompteurTone = "gold" | "cream" | "accent";
export type LRZCompteurAnimation = "roll" | "fade" | "none";
export type LRZCompteurDirection = "auto" | "up" | "down";
export type LRZCompteurVariant = "machine" | "minimal" | "panel";
export type LRZCompteurTheme = "brass" | "ivory" | "slate" | "river";

export type LRZCompteurProps = {
    value: number;
    label?: string;
    prefix?: string;
    suffix?: string;
    format?: LRZCompteurFormat;
    decimals?: number;
    size?: LRZCompteurSize;
    tone?: LRZCompteurTone;
    theme?: LRZCompteurTheme;
    variant?: LRZCompteurVariant;
    accent?: string;
    padding?: boolean;
    digits?: number;
    leadingZeros?: boolean;
    direction?: LRZCompteurDirection;
    animation?: LRZCompteurAnimation;
    animate?: boolean;
    animateOnMount?: boolean;
    duration?: number;
    className?: string;
    "aria-label"?: string;
};

type DigitReelProps = {
    from: number;
    to: number;
    isAnimating: boolean;
    direction: "forward" | "backward";
    animation: LRZCompteurAnimation;
    delay: number;
};

type CounterStyle = CSSProperties & {
    "--counter-duration"?: string;
    "--counter-delay"?: string;
    "--counter-position"?: number;
    "--counter-accent"?: string;
};

const REEL_DIGITS = Array.from({ length: 30 }, (_, index) => index % 10);

function sanitizeValue(value: number): number {
    return Number.isFinite(value) ? value : 0;
}

function getDigitFromRight(value: string, position: number): number {
    const digits = value.replace(/\D/g, "");
    const digit = digits.at(-(position + 1));

    return digit ? Number(digit) : 0;
}

function getReelPosition(
    from: number,
    to: number,
    isAnimating: boolean,
    direction: DigitReelProps["direction"],
) {
    if (!isAnimating) return 10 + from;
    if (direction === "forward") {
        return to >= from ? 10 + to : 20 + to;
    }

    return to <= from ? 10 + to : to;
}

function DigitReel({
    from,
    to,
    isAnimating,
    direction,
    animation,
    delay,
}: DigitReelProps) {
    if (animation !== "roll") {
        return (
            <span className={styles.digit}>
                <span
                    className={`${styles.staticDigit} ${animation === "fade" && isAnimating ? styles.fading : ""}`}
                >
                    {isAnimating ? to : from}
                </span>
            </span>
        );
    }

    const position = getReelPosition(from, to, isAnimating, direction);
    const style: CounterStyle = {
        "--counter-delay": `${String(delay)}ms`,
        "--counter-position": position,
    };

    return (
        <span className={styles.digit}>
            <span
                className={`${styles.reel} ${isAnimating ? styles.moving : ""}`}
                style={style}
            >
                {REEL_DIGITS.map((digit, index) => (
                    <span className={styles.reelDigit} key={index}>
                        {digit}
                    </span>
                ))}
            </span>
        </span>
    );
}

function joinClassNames(...classNames: Array<string | undefined>) {
    return classNames.filter(Boolean).join(" ");
}

export default function LRZCompteur({
    value,
    label,
    prefix,
    suffix,
    format = "integer",
    decimals = 0,
    size = "md",
    tone = "gold",
    theme = "brass",
    variant = "machine",
    accent,
    padding = true,
    digits,
    leadingZeros = false,
    direction = "auto",
    animation = "roll",
    animate = true,
    animateOnMount = true,
    duration = 650,
    className,
    "aria-label": ariaLabel,
}: LRZCompteurProps) {
    const id = useId();
    const safeValue = sanitizeValue(value);
    const safeDecimals = Number.isFinite(decimals)
        ? Math.max(0, Math.min(6, Math.floor(decimals)))
        : 0;
    const safeDigits = Number.isFinite(digits)
        ? Math.max(1, Math.min(12, Math.floor(digits ?? 1)))
        : undefined;
    const resolvedDecimals = format === "decimal" ? safeDecimals : 0;
    const resolvedDuration = Math.max(0, Math.min(2_000, duration));
    const formatter = useMemo(
        () =>
            new Intl.NumberFormat("fr-FR", {
                maximumFractionDigits: resolvedDecimals,
                minimumFractionDigits: resolvedDecimals,
                minimumIntegerDigits: leadingZeros ? safeDigits : 1,
            }),
        [leadingZeros, resolvedDecimals, safeDigits],
    );
    const formattedValue = formatter.format(safeValue);
    const [motion, setMotion] = useState(() => ({
        from: animateOnMount ? 0 : safeValue,
        to: safeValue,
        isAnimating: false,
    }));
    const previousValue = useRef(safeValue);

    useLayoutEffect(() => {
        const hasChanged = previousValue.current !== safeValue;
        const shouldAnimate = animate && (hasChanged || animateOnMount);

        if (!shouldAnimate) {
            previousValue.current = safeValue;
            setMotion({ from: safeValue, to: safeValue, isAnimating: false });
            return;
        }

        const from = hasChanged ? previousValue.current : 0;
        previousValue.current = safeValue;
        setMotion({ from, to: safeValue, isAnimating: false });

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        let animationFrame: number | undefined;
        const preparationFrame = window.requestAnimationFrame(() => {
            animationFrame = window.requestAnimationFrame(() => {
                setMotion({ from, to: safeValue, isAnimating: true });
            });
        });

        return () => {
            window.cancelAnimationFrame(preparationFrame);
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
        };
    }, [animate, animateOnMount, safeValue]);

    const fromValue = formatter.format(motion.from);
    const contentLabel = [prefix, formattedValue, suffix, label]
        .filter(Boolean)
        .join(" ");
    const rootStyle: CounterStyle = {
        "--counter-duration": `${String(resolvedDuration)}ms`,
        ...(accent ? { "--counter-accent": accent } : {}),
    };
    const resolvedDirection =
        direction === "auto"
            ? motion.to >= motion.from
                ? "forward"
                : "backward"
            : direction === "up"
              ? "forward"
              : "backward";
    const integerDigits = formatter
        .formatToParts(safeValue)
        .filter((part) => part.type === "integer")
        .map((part) => part.value)
        .join("").length;
    const emptyDigits = leadingZeros
        ? 0
        : Math.max(0, (safeDigits ?? integerDigits) - integerDigits);
    const displayCharacters = [
        ...Array<string | null>(emptyDigits).fill(null),
        ...Array.from(formattedValue),
    ];
    let digitPosition = 0;

    return (
        <output
            aria-describedby={label ? `${id}-label` : undefined}
            aria-label={ariaLabel ?? contentLabel}
            className={joinClassNames(styles.root, styles[size], className)}
            data-animation={animation}
            data-padded={padding}
            data-theme={theme}
            data-tone={tone}
            data-variant={variant}
            style={rootStyle}
        >
            <span className={styles.machine} aria-hidden="true">
                {prefix && <span className={styles.affix}>{prefix}</span>}
                <span className={styles.window}>
                    {displayCharacters.map((character, index) => {
                        if (character === null) {
                            return (
                                <span
                                    className={styles.emptyDigit}
                                    key={`empty-${index}`}
                                />
                            );
                        }
                        if (!/\d/.test(character)) {
                            return (
                                <span
                                    className={styles.separator}
                                    key={`${character}-${index}`}
                                >
                                    {character}
                                </span>
                            );
                        }

                        const positionFromRight = displayCharacters
                            .slice(index + 1)
                            .filter(
                                (item) => item !== null && /\d/.test(item),
                            ).length;
                        const from = getDigitFromRight(
                            fromValue,
                            positionFromRight,
                        );
                        const to = Number(character);
                        const delay = Math.min(digitPosition * 38, 228);
                        digitPosition += 1;

                        return (
                            <DigitReel
                                delay={delay}
                                direction={resolvedDirection}
                                from={from}
                                isAnimating={motion.isAnimating}
                                key={`${positionFromRight}-${character}`}
                                to={to}
                                animation={animation}
                            />
                        );
                    })}
                </span>
                {suffix && <span className={styles.affix}>{suffix}</span>}
            </span>
            {label && (
                <span className={styles.label} id={`${id}-label`}>
                    {label}
                </span>
            )}
        </output>
    );
}
