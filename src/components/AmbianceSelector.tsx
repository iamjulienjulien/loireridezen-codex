"use client";

import { AMBIANCES, type Ambiance } from "@/registry/ambiances";
import { useAmbianceSelectorVisibility } from "@/hooks/useAmbiance";
import styles from "./AmbianceSelector.module.css";

export default function AmbianceSelector({
    ambiance,
    onAmbiance,
}: {
    ambiance: Ambiance;
    onAmbiance: (ambiance: Ambiance) => void;
}) {
    const isVisible = useAmbianceSelectorVisibility();

    if (!isVisible) return null;

    return (
        <div className={styles.ambiance} role="group" aria-label="Ambiance">
            <span className={styles.label}>Ambiance</span>
            {AMBIANCES.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    className={styles.button}
                    aria-pressed={ambiance === item.id}
                    onClick={() => onAmbiance(item.id)}
                >
                    <span className={styles.emoji} aria-hidden>
                        {item.emoji}
                    </span>
                    {item.label}
                </button>
            ))}
        </div>
    );
}
