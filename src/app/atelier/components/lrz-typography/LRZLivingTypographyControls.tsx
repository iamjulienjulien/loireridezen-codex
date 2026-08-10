"use client";

import { useState } from "react";

import LRZLivingText, {
    type LRZPathTextPath,
    type LRZScrambleCharacterSet,
} from "@/components/LRZLivingText";
import type { Ambiance } from "@/registry/ambiances";
import { LRZ_COLOR_LABELS, LRZ_COLOR_NAMES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import LRZAnimationCard, { useLRZAnimationPlayback } from "./LRZAnimationCard";
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
const CUTOUT_PADDINGS = ["sm", "md", "lg"] as const;
const CUTOUT_RADII = ["none", "sm", "md"] as const;
const TYPEWRITER_CURSORS = ["bar", "block", "underscore", "none"] as const;
const TYPEWRITER_CURSOR_AFTER = ["keep", "hide"] as const;
const SCRAMBLE_CHARACTER_SETS = [
    "mixte",
    "upper",
    "lower",
    "ucfirst",
    "emoji",
    "symbol",
] as const satisfies readonly LRZScrambleCharacterSet[];

export function LRZCutoutTextControls({ className }: { className: string }) {
    const [surface, setSurface] = useState<LRZColor>("bleu-gris");
    const [padding, setPadding] =
        useState<(typeof CUTOUT_PADDINGS)[number]>("md");
    const [radius, setRadius] = useState<(typeof CUTOUT_RADII)[number]>("none");

    return (
        <>
            <div className={styles.livingControls}>
                <label className={styles.livingControl}>
                    <span>surface</span>
                    <select
                        value={surface}
                        onChange={(event) =>
                            setSurface(event.target.value as LRZColor)
                        }
                    >
                        {LRZ_COLOR_NAMES.map((colorName) => (
                            <option key={colorName} value={colorName}>
                                {LRZ_COLOR_LABELS[colorName]}
                            </option>
                        ))}
                    </select>
                </label>
                <SelectControl
                    label="padding"
                    value={padding}
                    options={CUTOUT_PADDINGS}
                    onChange={(value) =>
                        setPadding(value as (typeof CUTOUT_PADDINGS)[number])
                    }
                />
                <SelectControl
                    label="radius"
                    value={radius}
                    options={CUTOUT_RADII}
                    onChange={(value) =>
                        setRadius(value as (typeof CUTOUT_RADII)[number])
                    }
                />
            </div>
            <div className={className}>
                <div className={styles.cutoutScene}>
                    <LRZLivingText.CutoutText
                        preset="display"
                        as="p"
                        surface={surface}
                        padding={padding}
                        radius={radius}
                    >
                        LOIRE
                    </LRZLivingText.CutoutText>
                </div>
            </div>
            <pre className={styles.compositionCode}>
                <code>{`<LRZLivingText.CutoutText
  preset="display"
  as="p"
  surface="${surface}"
  padding="${padding}"
  radius="${radius}"
>
  LOIRE
</LRZLivingText.CutoutText>`}</code>
            </pre>
        </>
    );
}

function TypewriterPreview({
    speed,
    startDelay,
    cursor,
    cursorAfter,
}: {
    speed: number;
    startDelay: number;
    cursor: (typeof TYPEWRITER_CURSORS)[number];
    cursorAfter: (typeof TYPEWRITER_CURSOR_AFTER)[number];
}) {
    const playback = useLRZAnimationPlayback();
    const resting = playback.mode === "auto" && !playback.playing;

    return (
        <LRZLivingText.Typewriter
            key={`${playback.cycle}-${resting ? "rest" : "active"}`}
            preset="heading-2"
            as="p"
            speed={speed}
            startDelay={startDelay}
            cursor={cursor}
            cursorAfter={cursorAfter}
            autoPlay={playback.playing}
        >
            Prochaine halte : Saumur
        </LRZLivingText.Typewriter>
    );
}

export function LRZTypewriterControls({ className }: { className: string }) {
    const [speed, setSpeed] = useState(62);
    const [startDelay, setStartDelay] = useState(0);
    const [cursor, setCursor] =
        useState<(typeof TYPEWRITER_CURSORS)[number]>("underscore");
    const [cursorAfter, setCursorAfter] =
        useState<(typeof TYPEWRITER_CURSOR_AFTER)[number]>("keep");

    return (
        <>
            <LRZAnimationCard
                className={className}
                label="LRZLivingText.Typewriter"
                controlsPosition="above"
                controls={
                    <div className={styles.livingControls}>
                        <label className={styles.livingControl}>
                            <span>speed · {speed} ms</span>
                            <input
                                type="range"
                                min={20}
                                max={180}
                                step={1}
                                value={speed}
                                onChange={(event) =>
                                    setSpeed(Number(event.target.value))
                                }
                            />
                        </label>
                        <label className={styles.livingControl}>
                            <span>startDelay · {startDelay} ms</span>
                            <input
                                type="range"
                                min={0}
                                max={1500}
                                step={50}
                                value={startDelay}
                                onChange={(event) =>
                                    setStartDelay(Number(event.target.value))
                                }
                            />
                        </label>
                        <SelectControl
                            label="cursor"
                            value={cursor}
                            options={TYPEWRITER_CURSORS}
                            onChange={(value) =>
                                setCursor(
                                    value as (typeof TYPEWRITER_CURSORS)[number],
                                )
                            }
                        />
                        <SelectControl
                            label="cursorAfter"
                            value={cursorAfter}
                            options={TYPEWRITER_CURSOR_AFTER}
                            onChange={(value) =>
                                setCursorAfter(
                                    value as (typeof TYPEWRITER_CURSOR_AFTER)[number],
                                )
                            }
                        />
                    </div>
                }
            >
                <TypewriterPreview
                    speed={speed}
                    startDelay={startDelay}
                    cursor={cursor}
                    cursorAfter={cursorAfter}
                />
            </LRZAnimationCard>
            <pre className={styles.compositionCode}>
                <code>{`<LRZLivingText.Typewriter
  preset="heading-2"
  as="p"
  speed={${speed}}
  startDelay={${startDelay}}
  cursor="${cursor}"
  cursorAfter="${cursorAfter}"
>
  Prochaine halte : Saumur
</LRZLivingText.Typewriter>`}</code>
            </pre>
        </>
    );
}

function ScramblePreview({
    speed,
    scrambleFrames,
    characterSet,
    mono,
    trim,
    preserveSpaces,
}: {
    speed: number;
    scrambleFrames: number;
    characterSet: LRZScrambleCharacterSet;
    mono: boolean;
    trim: boolean;
    preserveSpaces: boolean;
}) {
    const playback = useLRZAnimationPlayback();

    return (
        <LRZLivingText.ScrambleText
            key={`${playback.cycle}-${playback.playing ? "active" : "rest"}`}
            preset="heading-2"
            as="p"
            playing={playback.playing}
            speed={speed}
            scrambleFrames={scrambleFrames}
            characterSet={characterSet}
            mono={mono}
            trim={trim}
            preserveSpaces={preserveSpaces}
        >
            {"  CODEX   LIGÉRIEN  "}
        </LRZLivingText.ScrambleText>
    );
}

export function LRZScrambleTextControls({ className }: { className: string }) {
    const [speed, setSpeed] = useState(58);
    const [scrambleFrames, setScrambleFrames] = useState(8);
    const [characterSet, setCharacterSet] =
        useState<LRZScrambleCharacterSet>("mixte");
    const [mono, setMono] = useState(false);
    const [trim, setTrim] = useState(true);
    const [preserveSpaces, setPreserveSpaces] = useState(false);

    return (
        <>
            <LRZAnimationCard
                className={className}
                label="LRZLivingText.ScrambleText"
                controlsPosition="above"
                controls={
                    <div className={styles.livingControls}>
                        <label className={styles.livingControl}>
                            <span>speed · {speed} ms</span>
                            <input
                                type="range"
                                min={24}
                                max={180}
                                step={1}
                                value={speed}
                                onChange={(event) =>
                                    setSpeed(Number(event.target.value))
                                }
                            />
                        </label>
                        <SelectControl
                            label="characterSet"
                            value={characterSet}
                            options={SCRAMBLE_CHARACTER_SETS}
                            onChange={(value) =>
                                setCharacterSet(
                                    value as LRZScrambleCharacterSet,
                                )
                            }
                        />
                        <label className={styles.livingCheck}>
                            <input
                                type="checkbox"
                                checked={mono}
                                onChange={(event) =>
                                    setMono(event.target.checked)
                                }
                            />
                            <span>mono</span>
                        </label>
                        <label className={styles.livingControl}>
                            <span>scrambleFrames · {scrambleFrames}</span>
                            <input
                                type="range"
                                min={2}
                                max={16}
                                step={1}
                                value={scrambleFrames}
                                onChange={(event) =>
                                    setScrambleFrames(
                                        Number(event.target.value),
                                    )
                                }
                            />
                        </label>
                        <label className={styles.livingCheck}>
                            <input
                                type="checkbox"
                                checked={trim}
                                onChange={(event) =>
                                    setTrim(event.target.checked)
                                }
                            />
                            <span>trim</span>
                        </label>
                        <label className={styles.livingCheck}>
                            <input
                                type="checkbox"
                                checked={preserveSpaces}
                                onChange={(event) =>
                                    setPreserveSpaces(event.target.checked)
                                }
                            />
                            <span>preserveSpaces</span>
                        </label>
                    </div>
                }
            >
                <ScramblePreview
                    speed={speed}
                    scrambleFrames={scrambleFrames}
                    characterSet={characterSet}
                    mono={mono}
                    trim={trim}
                    preserveSpaces={preserveSpaces}
                />
            </LRZAnimationCard>
            <pre className={styles.compositionCode}>
                <code>{`<LRZLivingText.ScrambleText
  preset="heading-2"
  as="p"
  speed={${speed}}
  scrambleFrames={${scrambleFrames}}
  characterSet="${characterSet}"
  mono={${mono}}
  trim={${trim}}
  preserveSpaces={${preserveSpaces}}
>
  {"  CODEX   LIGÉRIEN  "}
</LRZLivingText.ScrambleText>`}</code>
            </pre>
        </>
    );
}

export function LRZPathTextControls({ className }: { className: string }) {
    const [path, setPath] = useState<LRZPathTextPath>("meander");
    const [direction, setDirection] = useState<PathDirection>("forward");
    const [size, setSize] = useState<PathSize>("lg");
    const [color, setColor] = useState<LRZColor>("eau");
    const [flow, setFlow] = useState(true);

    return (
        <>
            <LRZAnimationCard
                className={className}
                label="LRZLivingText.PathText"
                controlsPosition="above"
                controls={
                    <div className={styles.livingControls}>
                        <SelectControl
                            label="path"
                            value={path}
                            options={PATHS}
                            onChange={(value) =>
                                setPath(value as LRZPathTextPath)
                            }
                        />
                        <SelectControl
                            label="direction"
                            value={direction}
                            options={DIRECTIONS}
                            onChange={(value) =>
                                setDirection(value as PathDirection)
                            }
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
                                onChange={(event) =>
                                    setFlow(event.target.checked)
                                }
                            />
                            <span>flow</span>
                        </label>
                    </div>
                }
            >
                <LRZLivingText.PathText
                    path={path}
                    direction={direction}
                    size={size}
                    color={color}
                    flow={flow}
                >
                    D’Orléans à l’Atlantique · suivre le fil de l’eau
                </LRZLivingText.PathText>
            </LRZAnimationCard>
            <pre className={styles.compositionCode}>
                <code>{`<LRZLivingText.PathText
  path="${path}"
  direction="${direction}"
  size="${size}"
  color="${color}"
  flow={${flow}}
>
  D’Orléans à l’Atlantique · suivre le fil de l’eau
</LRZLivingText.PathText>`}</code>
            </pre>
        </>
    );
}

export function LRZBreathingTextControls({ className }: { className: string }) {
    const [rhythm, setRhythm] = useState<BreathingRhythm>("calm");
    const [intensity, setIntensity] = useState<LivingIntensity>("medium");
    const [duration, setDuration] = useState(6500);

    return (
        <>
            <LRZAnimationCard
                className={className}
                label="LRZLivingText.BreathingText"
                controlsPosition="above"
                controls={
                    <div className={styles.livingControls}>
                        <SelectControl
                            label="rhythm"
                            value={rhythm}
                            options={RHYTHMS}
                            onChange={(value) =>
                                setRhythm(value as BreathingRhythm)
                            }
                        />
                        <SelectControl
                            label="intensity"
                            value={intensity}
                            options={INTENSITIES}
                            onChange={(value) =>
                                setIntensity(value as LivingIntensity)
                            }
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
                }
            >
                <LRZLivingText.BreathingText
                    preset="heading-2"
                    as="p"
                    rhythm={rhythm}
                    intensity={intensity}
                    duration={duration}
                >
                    Prenez le temps du détour
                </LRZLivingText.BreathingText>
            </LRZAnimationCard>
            <pre className={styles.compositionCode}>
                <code>{`<LRZLivingText.BreathingText
  preset="heading-2"
  as="p"
  rhythm="${rhythm}"
  intensity="${intensity}"
  duration={${duration}}
>
  Prenez le temps du détour
</LRZLivingText.BreathingText>`}</code>
            </pre>
        </>
    );
}

export function LRZAtmosphericTextControls({
    className,
}: {
    className: string;
}) {
    const [ambiance, setAmbiance] = useState<Ambiance>("nuit");
    const [intensity, setIntensity] = useState<LivingIntensity>("expressive");

    return (
        <>
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
            <div className={className}>
                <LRZLivingText.AtmosphericText
                    preset="heading-2"
                    as="p"
                    ambiance={ambiance}
                    intensity={intensity}
                >
                    Saumur au clair de Loire
                </LRZLivingText.AtmosphericText>
            </div>
            <pre className={styles.compositionCode}>
                <code>{`<LRZLivingText.AtmosphericText
  preset="heading-2"
  as="p"
  ambiance="${ambiance}"
  intensity="${intensity}"
>
  Saumur au clair de Loire
</LRZLivingText.AtmosphericText>`}</code>
            </pre>
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
