"use client";

import {
    createContext,
    useContext,
    useId,
    useRef,
    useState,
    type KeyboardEvent,
    type ReactNode,
} from "react";

import type {
    LRZButtonProps,
    LRZButtonSize,
    LRZButtonVariant,
} from "@/components/LRZButton";
import LRZButton from "@/components/LRZButton";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZButtonGroup.module.css";

export type LRZButtonGroupOrientation = "horizontal" | "vertical";
export type LRZButtonGroupSelectionMode = "single" | "none";

export type LRZButtonGroupProps = {
    children: ReactNode;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    color?: LRZColor;
    size?: LRZButtonSize;
    variant?: LRZButtonVariant;
    orientation?: LRZButtonGroupOrientation;
    selectionMode?: LRZButtonGroupSelectionMode;
    fullWidth?: boolean;
    withWrapper?: boolean;
    attached?: boolean;
    ariaLabel: string;
    className?: string;
};

export type LRZButtonGroupItemProps = Omit<
    LRZButtonProps,
    "children" | "color" | "size" | "variant" | "fullWidth"
> & {
    value: string;
    children: ReactNode;
    color?: LRZColor;
    size?: LRZButtonSize;
    variant?: LRZButtonVariant;
};

type ButtonGroupContextValue = {
    selectedValue: string | undefined;
    select: (value: string) => void;
    color?: LRZColor;
    size: LRZButtonSize;
    variant: LRZButtonVariant;
    orientation: LRZButtonGroupOrientation;
    selectionMode: LRZButtonGroupSelectionMode;
};

const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
) {
    return classNames.filter(Boolean).join(" ");
}

export function LRZButtonGroup({
    children,
    value,
    defaultValue,
    onValueChange,
    color,
    size = "md",
    variant = "quiet",
    orientation = "horizontal",
    selectionMode = "single",
    fullWidth = false,
    withWrapper = false,
    attached = true,
    ariaLabel,
    className,
}: LRZButtonGroupProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const groupId = useId();
    const groupRef = useRef<HTMLDivElement>(null);
    const selectedValue = value ?? internalValue;

    const select = (nextValue: string) => {
        if (value === undefined) {
            setInternalValue(nextValue);
        }
        onValueChange?.(nextValue);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (selectionMode === "none") return;

        const direction =
            orientation === "horizontal" ? "horizontal" : "vertical";
        const isPrevious =
            (direction === "horizontal" && event.key === "ArrowLeft") ||
            (direction === "vertical" && event.key === "ArrowUp");
        const isNext =
            (direction === "horizontal" && event.key === "ArrowRight") ||
            (direction === "vertical" && event.key === "ArrowDown");

        if (
            !isPrevious &&
            !isNext &&
            event.key !== "Home" &&
            event.key !== "End"
        ) {
            return;
        }

        const buttons = Array.from(
            groupRef.current?.querySelectorAll<HTMLButtonElement>(
                '[role="radio"]:not(:disabled)',
            ) ?? [],
        );
        if (buttons.length === 0) return;

        event.preventDefault();
        const currentIndex = buttons.indexOf(
            document.activeElement as HTMLButtonElement,
        );
        const nextIndex =
            event.key === "Home"
                ? 0
                : event.key === "End"
                  ? buttons.length - 1
                  : (currentIndex + (isNext ? 1 : -1) + buttons.length) %
                    buttons.length;
        const nextButton = buttons[nextIndex];
        nextButton.focus();
        nextButton.click();
    };

    return (
        <div
            ref={groupRef}
            id={groupId}
            className={joinClassNames(
                styles.group,
                fullWidth && styles.fullWidth,
                className,
            )}
            data-orientation={orientation}
            data-wrapper={withWrapper || undefined}
            data-attached={attached}
            role={selectionMode === "single" ? "radiogroup" : "group"}
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}
        >
            <ButtonGroupContext.Provider
                value={{
                    selectedValue,
                    select,
                    color,
                    size,
                    variant,
                    orientation,
                    selectionMode,
                }}
            >
                {children}
            </ButtonGroupContext.Provider>
        </div>
    );
}

export function LRZButtonGroupItem({
    value,
    children,
    color,
    size,
    variant,
    className,
    onClick,
    disabled,
    ...buttonProps
}: LRZButtonGroupItemProps) {
    const context = useContext(ButtonGroupContext);
    if (!context) {
        throw new Error(
            "LRZButtonGroupItem doit être utilisé à l'intérieur d'un LRZButtonGroup.",
        );
    }

    const checked = context.selectedValue === value;
    const isSelectionGroup = context.selectionMode === "single";

    return (
        <LRZButton
            {...buttonProps}
            className={joinClassNames(styles.item, className)}
            color={color ?? context.color}
            size={size ?? context.size}
            variant={variant ?? (checked ? "primary" : context.variant)}
            disabled={disabled}
            role={isSelectionGroup ? "radio" : undefined}
            aria-checked={isSelectionGroup ? checked : undefined}
            tabIndex={
                isSelectionGroup
                    ? checked || context.selectedValue === undefined
                        ? 0
                        : -1
                    : buttonProps.tabIndex
            }
            onClick={(event) => {
                onClick?.(event);
                if (!event.defaultPrevented && !disabled && isSelectionGroup) {
                    context.select(value);
                }
            }}
        >
            {children}
        </LRZButton>
    );
}

export default LRZButtonGroup;
