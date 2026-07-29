"use client";

import { useState } from "react";

import {
    LRZAtmosphericText,
    LRZBreathingText,
    LRZPathText,
    type LRZPathTextPath,
} from "@/components/LRZLivingTypography";
import LRZTypography from "@/components/LRZTypography";
import type { Ambiance } from "@/registry/ambiances";
import { LRZ_COLOR_LABELS, LRZ_COLOR_NAMES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZTypographyPlayground.module.css";

type LivingIntensity = "subtle" | "medium" | "expressive";
type BreathingRhythm = "calm" | "river" | "sleep" | "pulse";
type PathDirection = "forward" | "reverse";
type PathSize = "sm" | "md" | "lg" | "xl";

const PATHS: LRZPathTextPath[] = [
    "meander",
    "wave",
    "arch",
    "circle",
    "horizon",
];
const DIRECTIONS: PathDirection[] = ["forward", "reverse"];
const PATH_SIZES: PathSize[] = ["sm", "md", "lg", "xl"];
const RHYTHMS: BreathingRhythm[] = ["calm", "river", "sleep", "pulse"];
const INTENSITIES: LivingIntensity[] = ["subtle", "medium", "expressive"];
const AMBIANCES: Ambiance[] = ["aube", "jour", "soir", "nuit"];

export function LRZPathTextControls() {
    const [path, setPath] = useState<LRZPathTextPath>("meander");
    const [direction, setDirection] = useState<PathDirection>("forward");
    const [size, setSize] = useState<PathSize>("lg");
    const [color, setColor] = useState<LRZColor>("eau");
    const [flow, setFlow] = useState(true);

    return (
        <>
            <div className={styles.livingMeta}>
                <LRZTypography preset="eyebrow">LRZPathText</LRZTypography>
                <code>{`path="${path}" direction="${direction}" size="${size}" color="${color}"${flow ? " flow" : ""}`}</code>
            </div>
            <div className={styles.livingControls}>
                <SelectControl
                    label="path"
                    value={path}
                    options={PATHS}
                    onChange={(value) => setPath(value as LRZPathTextPath)}
                />
                <SelectControl
                    label="direction"
                    value={direction}
                    options={DIRECTIONS}
                    onChange={(value) => setDirection(value as PathDirection)}
                />
                <SelectControl
                    label="size"
                    value={size}
                    options={PATH_SIZES}
                    onChange={(value) => setSize(value as PathSize)}
                />
                <label className={styles.livingControl}>
                    <span>color</span>
                    <select
                        value={color}
                        onChange={(event) =>
                            setColor(event.target.value as LRZColor)
                        }
                    >
                        {LRZ_COLOR_NAMES.map((colorName) => (
                            <option key={colorName} value={colorName}>
                                {LRZ_COLOR_LABELS[colorName]}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={styles.livingCheck}>
                    <input
                        type="checkbox"
                        checked={flow}
                        onChange={(event) => setFlow(event.target.checked)}
                    />
                    <span>flow</span>
                </label>
            </div>
            <LRZPathText
                path={path}
                direction={direction}
                size={size}
                color={color}
                flow={flow}
            >
                D’Orléans à l’Atlantique · suivre le fil de l’eau
            </LRZPathText>
        </>
    );
}

export function LRZBreathingTextControls() {
    const [rhythm, setRhythm] = useState<BreathingRhythm>("calm");
    const [intensity, setIntensity] = useState<LivingIntensity>("medium");
    const [duration, setDuration] = useState(6500);

    return (
        <>
            <div className={styles.livingMeta}>
                <LRZTypography preset="eyebrow">LRZBreathingText</LRZTypography>
                <code>{`rhythm="${rhythm}" intensity="${intensity}" duration={${duration}}`}</code>
            </div>
            <div className={styles.livingControls}>
                <SelectControl
                    label="rhythm"
                    value={rhythm}
                    options={RHYTHMS}
                    onChange={(value) => setRhythm(value as BreathingRhythm)}
                />
                <SelectControl
                    label="intensity"
                    value={intensity}
                    options={INTENSITIES}
                    onChange={(value) => setIntensity(value as LivingIntensity)}
                />
                <label
                    className={`${styles.livingControl} ${styles.durationControl}`}
                >
                    <span>duration · {duration} ms</span>
                    <input
                        type="range"
                        min={1200}
                        max={12000}
                        step={100}
                        value={duration}
                        onChange={(event) =>
                            setDuration(Number(event.target.value))
                        }
                    />
                </label>
            </div>
            <LRZBreathingText
                preset="heading-2"
                as="p"
                rhythm={rhythm}
                intensity={intensity}
                duration={duration}
            >
                Prenez le temps du détour
            </LRZBreathingText>
        </>
    );
}

export function LRZAtmosphericTextControls() {
    const [ambiance, setAmbiance] = useState<Ambiance>("nuit");
    const [intensity, setIntensity] = useState<LivingIntensity>("expressive");

    return (
        <>
            <div className={styles.livingMeta}>
                <LRZTypography preset="eyebrow">
                    LRZAtmosphericText
                </LRZTypography>
                <code>{`ambiance="${ambiance}" intensity="${intensity}"`}</code>
            </div>
            <div className={styles.livingControls}>
                <SelectControl
                    label="ambiance"
                    value={ambiance}
                    options={AMBIANCES}
                    onChange={(value) => setAmbiance(value as Ambiance)}
                />
                <SelectControl
                    label="intensity"
                    value={intensity}
                    options={INTENSITIES}
                    onChange={(value) => setIntensity(value as LivingIntensity)}
                />
            </div>
            <LRZAtmosphericText
                preset="heading-2"
                as="p"
                ambiance={ambiance}
                intensity={intensity}
            >
                Saumur au clair de Loire
            </LRZAtmosphericText>
        </>
    );
}

function SelectControl({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: readonly string[];
    onChange: (value: string) => void;
}) {
    return (
        <label className={styles.livingControl}>
            <span>{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}
