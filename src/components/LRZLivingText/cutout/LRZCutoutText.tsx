import { useId, type CSSProperties } from "react";

import LRZTypography, {
    type LRZTypographyProps,
} from "@/components/LRZTypography";
import { LRZ_COLOR_VALUES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZCutoutText.module.css";

export type LRZCutoutTextProps = Omit<
    LRZTypographyProps,
    "children" | "color" | "dropCap" | "effect" | "gradient"
> & {
    children: string;
    /** Couleur de la plaque dans laquelle le texte est évidé. */
    surface: LRZColor;
    padding?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md";
};

type CutoutStyle = CSSProperties & {
    "--cutout-filter": string;
};

function joinClassNames(...classNames: Array<string | undefined>) {
    return classNames.filter(Boolean).join(" ");
}

/** Texte évidé dans une surface colorée. */
export default function LRZCutoutText({
    children,
    surface,
    padding = "md",
    radius = "none",
    className,
    style,
    ...props
}: LRZCutoutTextProps) {
    const filterId = `lrz-cutout-${useId().replaceAll(":", "")}`;
    const cutoutStyle: CutoutStyle = {
        "--cutout-filter": `url(#${filterId})`,
        ...style,
    };

    return (
        <span
            className={styles.root}
            data-padding={padding}
            data-radius={radius}
        >
            <svg
                className={styles.definitions}
                aria-hidden="true"
                focusable="false"
            >
                <defs>
                    <filter
                        id={filterId}
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                    >
                        <feFlood
                            floodColor={LRZ_COLOR_VALUES[surface]}
                            result="surface"
                        />
                        <feComposite
                            in="surface"
                            in2="SourceAlpha"
                            operator="out"
                        />
                    </filter>
                </defs>
            </svg>
            <LRZTypography
                {...props}
                className={joinClassNames(styles.text, className)}
                style={cutoutStyle}
            >
                {children}
            </LRZTypography>
        </span>
    );
}
