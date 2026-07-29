import LRZTypography, {
    type LRZTypographyProps,
} from "@/components/LRZTypography";
import type { Ambiance } from "@/registry/ambiances";

import styles from "./LRZLivingTypography.module.css";

export type LRZAtmosphericTextProps = LRZTypographyProps & {
    ambiance: Ambiance;
    intensity?: "subtle" | "medium" | "expressive";
};

export default function LRZAtmosphericText({
    ambiance,
    intensity = "medium",
    className,
    ...props
}: LRZAtmosphericTextProps) {
    return (
        <LRZTypography
            {...props}
            className={[styles.atmospheric, className]
                .filter(Boolean)
                .join(" ")}
            data-ambiance={ambiance}
            data-intensity={intensity}
        />
    );
}
