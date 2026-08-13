import { useId, type CSSProperties, type SVGAttributes } from "react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "../LRZLivingText.module.css";

export type LRZPathTextPath =
    "meander" | "wave" | "arch" | "circle" | "horizon";

export type LRZPathTextProps = Omit<
    SVGAttributes<SVGSVGElement>,
    "children" | "color" | "path"
> & {
    children: string;
    path?: LRZPathTextPath;
    direction?: "forward" | "reverse";
    size?: "sm" | "md" | "lg" | "xl";
    color?: LRZColor;
    flow?: boolean;
};

type PathTextStyle = CSSProperties & {
    "--living-color"?: string;
};

const PATHS: Record<LRZPathTextPath, { path: string; viewBox: string }> = {
    meander: {
        path: "M 20 105 C 150 10, 250 190, 390 95 S 650 30, 780 105",
        viewBox: "0 0 800 190",
    },
    wave: {
        path: "M 20 100 Q 120 25, 220 100 T 420 100 T 620 100 T 780 100",
        viewBox: "0 0 800 175",
    },
    arch: {
        path: "M 45 145 Q 400 -20, 755 145",
        viewBox: "0 0 800 180",
    },
    circle: {
        path: "M 150 100 A 250 80 0 1 1 650 100 A 250 80 0 1 1 150 100",
        viewBox: "0 0 800 200",
    },
    horizon: {
        path: "M 20 105 C 220 88, 580 122, 780 100",
        viewBox: "0 0 800 160",
    },
};

export default function LRZPathText({
    children,
    path = "meander",
    direction = "forward",
    size = "md",
    color,
    flow = false,
    className,
    style,
    ...props
}: LRZPathTextProps) {
    const pathId = `lrz-path-${useId().replaceAll(":", "")}`;
    const definition = PATHS[path];

    return (
        <svg
            {...props}
            aria-label={children}
            className={[styles.pathRoot, className].filter(Boolean).join(" ")}
            data-direction={direction}
            data-flow={flow || undefined}
            data-size={size}
            role="img"
            style={
                {
                    "--living-color": color
                        ? `var(${LRZ_COLOR_VARIABLES[color]})`
                        : undefined,
                    ...style,
                } as PathTextStyle
            }
            viewBox={definition.viewBox}
        >
            <defs>
                <path id={pathId} d={definition.path} />
            </defs>
            <text className={styles.pathText} aria-hidden="true">
                <textPath
                    href={`#${pathId}`}
                    startOffset={direction === "reverse" ? "100%" : "50%"}
                    textAnchor={direction === "reverse" ? "end" : "middle"}
                >
                    {children}
                </textPath>
            </text>
        </svg>
    );
}
