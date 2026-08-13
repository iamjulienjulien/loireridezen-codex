"use client";

import {
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import { Check, Search, X } from "lucide-react";

import styles from "./LRZCommandPalette.module.css";

export type LRZCommand = {
    /** Identifiant stable et unique dans la palette. */
    id: string;
    /** Libellé principal de la commande. */
    label: string;
    /** Information complémentaire affichée sous le libellé. */
    description?: string;
    /** Icône ou emoji placé avant le libellé. */
    icon?: ReactNode;
    /** Termes supplémentaires utilisés par la recherche. */
    keywords?: readonly string[];
    /** Groupe visuel auquel appartient la commande. */
    group?: string;
    /** Raccourci informatif affiché à droite. */
    shortcut?: readonly string[];
    /** Indique l’option actuellement appliquée. */
    active?: boolean;
    /** Empêche l’exécution de la commande. */
    disabled?: boolean;
    /** Action exécutée après sélection. */
    onSelect: () => void;
};

export type LRZCommandPaletteProps = {
    commands: readonly LRZCommand[];
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    emptyMessage?: string;
    title?: string;
    enableGlobalShortcut?: boolean;
    className?: string;
};

function joinClassNames(...values: Array<string | undefined | false>) {
    return values.filter(Boolean).join(" ");
}

function normalizeSearchValue(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("fr-FR")
        .trim();
}

function getSearchValue(command: LRZCommand) {
    return normalizeSearchValue(
        [
            command.label,
            command.description,
            command.group,
            ...(command.keywords ?? []),
        ]
            .filter(Boolean)
            .join(" "),
    );
}

function getOptionId(listboxId: string, commandId: string) {
    return `${listboxId}-option-${encodeURIComponent(commandId)}`;
}

export default function LRZCommandPalette({
    commands,
    open,
    defaultOpen = false,
    onOpenChange,
    placeholder = "Rechercher une commande…",
    emptyMessage = "Aucune commande trouvée",
    title = "Commandes",
    enableGlobalShortcut = true,
    className,
}: LRZCommandPaletteProps) {
    const generatedId = useId();
    const inputId = `${generatedId}-input`;
    const titleId = `${generatedId}-title`;
    const listboxId = `${generatedId}-listbox`;
    const inputRef = useRef<HTMLInputElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [query, setQuery] = useState("");
    const [activeCommandId, setActiveCommandId] = useState<string | null>(null);
    const isControlled = open !== undefined;
    const isOpen = open ?? internalOpen;

    const filteredCommands = useMemo(() => {
        const normalizedQuery = normalizeSearchValue(query);

        if (!normalizedQuery) {
            return commands;
        }

        const terms = normalizedQuery.split(/\s+/);
        return commands.filter((command) => {
            const searchValue = getSearchValue(command);
            return terms.every((term) => searchValue.includes(term));
        });
    }, [commands, query]);

    const enabledCommands = useMemo(
        () => filteredCommands.filter((command) => !command.disabled),
        [filteredCommands],
    );

    const groupedCommands = useMemo(() => {
        const groups = new Map<string, LRZCommand[]>();

        for (const command of filteredCommands) {
            const group = command.group ?? "";
            groups.set(group, [...(groups.get(group) ?? []), command]);
        }

        return [...groups].map(([label, groupCommands]) => ({
            label,
            commands: groupCommands,
        }));
    }, [filteredCommands]);

    const activeCommand =
        enabledCommands.find((command) => command.id === activeCommandId) ??
        enabledCommands[0];

    const requestOpenChange = useCallback(
        (nextOpen: boolean) => {
            if (!isControlled) {
                setInternalOpen(nextOpen);
            }

            if (!nextOpen) {
                setQuery("");
                setActiveCommandId(null);
            }

            onOpenChange?.(nextOpen);
        },
        [isControlled, onOpenChange],
    );

    const executeCommand = useCallback(
        (command: LRZCommand | undefined) => {
            if (!command || command.disabled) {
                return;
            }

            command.onSelect();
            requestOpenChange(false);
        },
        [requestOpenChange],
    );

    const moveActiveCommand = useCallback(
        (direction: 1 | -1) => {
            if (enabledCommands.length === 0) {
                return;
            }

            const currentIndex = activeCommand
                ? enabledCommands.findIndex(
                      (command) => command.id === activeCommand.id,
                  )
                : -1;
            const nextIndex =
                (currentIndex + direction + enabledCommands.length) %
                enabledCommands.length;

            setActiveCommandId(enabledCommands[nextIndex].id);
        },
        [activeCommand, enabledCommands],
    );

    useEffect(() => {
        if (!enableGlobalShortcut) {
            return;
        }

        function handleGlobalShortcut(event: globalThis.KeyboardEvent) {
            const isShortcut =
                (event.metaKey || event.ctrlKey) &&
                !event.altKey &&
                event.key.toLocaleLowerCase() === "k";

            if (!isShortcut) {
                return;
            }

            event.preventDefault();
            requestOpenChange(!isOpen);
        }

        document.addEventListener("keydown", handleGlobalShortcut);
        return () =>
            document.removeEventListener("keydown", handleGlobalShortcut);
    }, [enableGlobalShortcut, isOpen, requestOpenChange]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        previousFocusRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const focusFrame = window.requestAnimationFrame(() =>
            inputRef.current?.focus(),
        );

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.body.style.overflow = previousOverflow;
            previousFocusRef.current?.focus({ preventScroll: true });
        };
    }, [isOpen]);

    function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Escape") {
            event.preventDefault();
            requestOpenChange(false);
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            moveActiveCommand(1);
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            moveActiveCommand(-1);
            return;
        }

        if (event.key === "Enter" && event.target === inputRef.current) {
            event.preventDefault();
            executeCommand(activeCommand);
            return;
        }

        if (event.key !== "Tab" || !dialogRef.current) {
            return;
        }

        const focusableElements = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
                'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
            ),
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1);

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className={joinClassNames(styles.root, className)}>
            <button
                type="button"
                className={styles.backdrop}
                aria-label="Fermer la palette de commandes"
                tabIndex={-1}
                onClick={() => requestOpenChange(false)}
            />

            <div
                ref={dialogRef}
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onKeyDown={handleDialogKeyDown}
            >
                <header className={styles.header}>
                    <h2 id={titleId} className={styles.title}>
                        {title}
                    </h2>

                    <div className={styles.headerActions}>
                        <kbd className={styles.globalShortcut}>
                            <span>⌘</span>
                            <span>K</span>
                        </kbd>
                        <button
                            type="button"
                            className={styles.closeButton}
                            aria-label="Fermer"
                            onClick={() => requestOpenChange(false)}
                        >
                            <X aria-hidden="true" />
                        </button>
                    </div>
                </header>

                <div className={styles.search}>
                    <Search className={styles.searchIcon} aria-hidden="true" />
                    <label className={styles.srOnly} htmlFor={inputId}>
                        {placeholder}
                    </label>
                    <input
                        ref={inputRef}
                        id={inputId}
                        className={styles.input}
                        type="search"
                        role="combobox"
                        aria-autocomplete="list"
                        aria-controls={listboxId}
                        aria-expanded="true"
                        aria-activedescendant={
                            activeCommand
                                ? getOptionId(listboxId, activeCommand.id)
                                : undefined
                        }
                        autoComplete="off"
                        spellCheck={false}
                        placeholder={placeholder}
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setActiveCommandId(null);
                        }}
                    />
                </div>

                <div
                    id={listboxId}
                    className={styles.results}
                    role="listbox"
                    aria-label={title}
                >
                    {groupedCommands.length > 0 ? (
                        groupedCommands.map((group) => (
                            <section
                                key={group.label || "commands"}
                                className={styles.group}
                            >
                                {group.label ? (
                                    <h3 className={styles.groupLabel}>
                                        {group.label}
                                    </h3>
                                ) : null}

                                <div className={styles.commandList}>
                                    {group.commands.map((command) => {
                                        const isHighlighted =
                                            command.id === activeCommand?.id;

                                        return (
                                            <button
                                                key={command.id}
                                                id={getOptionId(
                                                    listboxId,
                                                    command.id,
                                                )}
                                                type="button"
                                                role="option"
                                                className={styles.command}
                                                aria-selected={
                                                    command.active ?? false
                                                }
                                                aria-disabled={
                                                    command.disabled ||
                                                    undefined
                                                }
                                                disabled={command.disabled}
                                                data-active={
                                                    command.active || undefined
                                                }
                                                data-highlighted={
                                                    isHighlighted || undefined
                                                }
                                                onMouseEnter={() =>
                                                    setActiveCommandId(
                                                        command.id,
                                                    )
                                                }
                                                onFocus={() =>
                                                    setActiveCommandId(
                                                        command.id,
                                                    )
                                                }
                                                onClick={() =>
                                                    executeCommand(command)
                                                }
                                            >
                                                {command.icon !== undefined &&
                                                command.icon !== null ? (
                                                    <span
                                                        className={
                                                            styles.commandIcon
                                                        }
                                                        aria-hidden="true"
                                                    >
                                                        {command.icon}
                                                    </span>
                                                ) : null}

                                                <span
                                                    className={
                                                        styles.commandContent
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.commandLabel
                                                        }
                                                    >
                                                        {command.label}
                                                    </span>
                                                    {command.description ? (
                                                        <span
                                                            className={
                                                                styles.commandDescription
                                                            }
                                                        >
                                                            {
                                                                command.description
                                                            }
                                                        </span>
                                                    ) : null}
                                                </span>

                                                <span
                                                    className={
                                                        styles.commandMeta
                                                    }
                                                >
                                                    {command.shortcut
                                                        ?.length ? (
                                                        <kbd
                                                            className={
                                                                styles.commandShortcut
                                                            }
                                                        >
                                                            {command.shortcut.map(
                                                                (key) => (
                                                                    <span
                                                                        key={
                                                                            key
                                                                        }
                                                                    >
                                                                        {key}
                                                                    </span>
                                                                ),
                                                            )}
                                                        </kbd>
                                                    ) : null}
                                                    {command.active ? (
                                                        <Check
                                                            className={
                                                                styles.activeIcon
                                                            }
                                                            aria-label="Actif"
                                                        />
                                                    ) : null}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>
                        ))
                    ) : (
                        <p className={styles.empty}>{emptyMessage}</p>
                    )}
                </div>

                <footer className={styles.footer}>
                    <span>
                        <kbd>↑</kbd>
                        <kbd>↓</kbd>
                        Naviguer
                    </span>
                    <span>
                        <kbd>↵</kbd>
                        Choisir
                    </span>
                    <span>
                        <kbd>esc</kbd>
                        Fermer
                    </span>
                </footer>
            </div>
        </div>
    );
}
