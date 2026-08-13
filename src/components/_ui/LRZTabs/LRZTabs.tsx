"use client";

import {
    useId,
    useRef,
    useState,
    type KeyboardEvent,
    type CSSProperties,
    type ReactNode,
} from "react";

import styles from "./LRZTabs.module.css";

export type LRZTab = {
    id: string;
    label: ReactNode;
    count?: number;
    disabled?: boolean;
    panel?: ReactNode;
};

export type LRZTabsVariant = "line" | "pill" | "vintage";
export type LRZTabsSize = "sm" | "md" | "lg";

export type LRZTabsProps = {
    tabs: readonly LRZTab[];
    activeId?: string;
    defaultActiveId?: string;
    onActiveChange?: (id: string) => void;
    variant?: LRZTabsVariant;
    size?: LRZTabsSize;
    accent?: string;
    ariaLabel?: string;
    className?: string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

function getInitialTabId(
    tabs: readonly LRZTab[],
    activeId?: string,
    defaultActiveId?: string,
): string | undefined {
    const requestedId = activeId ?? defaultActiveId;
    const requestedTab = tabs.find(
        (tab) => tab.id === requestedId && !tab.disabled,
    );

    return requestedTab?.id ?? tabs.find((tab) => !tab.disabled)?.id;
}

export default function LRZTabs({
    tabs,
    activeId,
    defaultActiveId,
    onActiveChange,
    variant = "line",
    size = "md",
    accent,
    ariaLabel = "Onglets",
    className,
}: LRZTabsProps) {
    const baseId = useId();
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [uncontrolledId, setUncontrolledId] = useState(() =>
        getInitialTabId(tabs, activeId, defaultActiveId),
    );
    const selectedId = activeId ?? uncontrolledId;
    const selectedTab = tabs.find((tab) => tab.id === selectedId);
    const hasPanels = tabs.some((tab) => tab.panel !== undefined);

    function selectTab(id: string, focus = false) {
        const tab = tabs.find((item) => item.id === id);
        if (!tab || tab.disabled) return;

        if (activeId === undefined) setUncontrolledId(id);
        onActiveChange?.(id);

        if (focus) tabRefs.current[id]?.focus();
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
        const enabledTabs = tabs.filter((tab) => !tab.disabled);
        const currentIndex = enabledTabs.findIndex(
            (tab) => tab.id === selectedId,
        );
        if (currentIndex < 0 || enabledTabs.length < 2) return;

        let nextIndex: number | undefined;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (currentIndex + 1) % enabledTabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex =
                (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = enabledTabs.length - 1;
        }

        if (nextIndex === undefined) return;
        event.preventDefault();
        selectTab(enabledTabs[nextIndex].id, true);
    }

    const style = accent
        ? ({ "--tabs-accent": accent } as CSSProperties & {
              "--tabs-accent"?: string;
          })
        : undefined;

    return (
        <div
            className={joinClassNames(
                styles.tabs,
                styles[variant],
                styles[size],
                className,
            )}
            style={style}
        >
            <div
                className={styles.tabList}
                role="tablist"
                aria-label={ariaLabel}
            >
                {tabs.map((tab) => {
                    const isActive = tab.id === selectedId;
                    const panelId = `${baseId}-panel-${tab.id}`;

                    return (
                        <button
                            key={tab.id}
                            id={`${baseId}-tab-${tab.id}`}
                            ref={(element) => {
                                tabRefs.current[tab.id] = element;
                            }}
                            className={styles.tab}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={hasPanels ? panelId : undefined}
                            tabIndex={isActive ? 0 : -1}
                            disabled={tab.disabled}
                            onClick={() => selectTab(tab.id)}
                            onKeyDown={handleKeyDown}
                        >
                            <span className={styles.label}>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span
                                    className={styles.count}
                                    aria-hidden="true"
                                >
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {hasPanels && selectedTab?.panel !== undefined && (
                <div
                    id={`${baseId}-panel-${selectedTab.id}`}
                    className={styles.panel}
                    role="tabpanel"
                    aria-labelledby={`${baseId}-tab-${selectedTab.id}`}
                    tabIndex={0}
                >
                    {selectedTab.panel}
                </div>
            )}
        </div>
    );
}
