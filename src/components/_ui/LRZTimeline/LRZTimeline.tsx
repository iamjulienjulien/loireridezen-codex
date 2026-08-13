import type { CSSProperties, ReactNode } from "react";

import styles from "./LRZTimeline.module.css";

export type LRZTimelineItem = {
    id: string;
    date: ReactNode;
    title: ReactNode;
    description?: ReactNode;
    eyebrow?: ReactNode;
    meta?: ReactNode;
    icon?: ReactNode;
    featured?: boolean;
};

export type LRZTimelineVariant = "line" | "cards" | "compact";
export type LRZTimelineOrientation = "vertical" | "horizontal";
export type LRZTimelineSize = "sm" | "md" | "lg";

export type LRZTimelineProps = {
    items: readonly LRZTimelineItem[];
    variant?: LRZTimelineVariant;
    orientation?: LRZTimelineOrientation;
    size?: LRZTimelineSize;
    accent?: string;
    ariaLabel?: string;
    className?: string;
};

type TimelineStyle = CSSProperties & {
    "--timeline-accent"?: string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

export default function LRZTimeline({
    items,
    variant = "line",
    orientation = "vertical",
    size = "md",
    accent,
    ariaLabel = "Frise chronologique",
    className,
}: LRZTimelineProps) {
    const style = accent
        ? ({ "--timeline-accent": accent } as TimelineStyle)
        : undefined;

    return (
        <ol
            className={joinClassNames(
                styles.timeline,
                styles[variant],
                styles[orientation],
                styles[size],
                className,
            )}
            style={style}
            aria-label={ariaLabel}
        >
            {items.map((item) => (
                <li
                    key={item.id}
                    className={joinClassNames(
                        styles.item,
                        item.featured && styles.featured,
                    )}
                >
                    <div className={styles.marker} aria-hidden="true">
                        {item.icon ?? <span />}
                    </div>
                    <article className={styles.content}>
                        <div className={styles.heading}>
                            <time className={styles.date}>{item.date}</time>
                            {item.eyebrow !== undefined && (
                                <span className={styles.eyebrow}>
                                    {item.eyebrow}
                                </span>
                            )}
                        </div>
                        <h3 className={styles.title}>{item.title}</h3>
                        {item.description !== undefined && (
                            <div className={styles.description}>
                                {item.description}
                            </div>
                        )}
                        {item.meta !== undefined && (
                            <div className={styles.meta}>{item.meta}</div>
                        )}
                    </article>
                </li>
            ))}
        </ol>
    );
}
