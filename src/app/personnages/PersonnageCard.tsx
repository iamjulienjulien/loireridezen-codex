import { Castle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import LRZAccordion from "@/components/LRZAccordion/LRZAccordion";
import { LRZStamp } from "@/components/LRZStamp";
import { getCategoriePersonnage } from "@/registry/categories-personnages";
import type { Personnage, RelationPersonnageLieu } from "@/types/personnage";

import styles from "./PersonnageCard.module.css";

export type PersonnageCardProps = {
    personnage: Personnage;
    relations: readonly RelationPersonnageLieu[];
};

export default function PersonnageCard({
    personnage,
    relations,
}: PersonnageCardProps) {
    const lieuCount = new Set(relations.map((relation) => relation.lieuId))
        .size;
    const categorie = getCategoriePersonnage(personnage.categoriePrincipale);
    const alias = personnage.autresNoms.find(
        (name) =>
            name.trim().length > 0 &&
            name.localeCompare(personnage.nom, "fr", {
                sensitivity: "base",
            }) !== 0,
    );
    const accent = categorie?.identite.accent ?? "var(--color-ocre)";
    const accentStyle = {
        "--category-accent": accent,
    } as CSSProperties;
    const accordionStyle = {
        "--accordion-color": accent,
        "--category-accent": accent,
    } as CSSProperties;

    return (
        <article className={styles.card} style={accentStyle}>
            <div className={styles.portraitStage}>
                {categorie ? (
                    <LRZStamp
                        collection="personnage"
                        meta="categorie"
                        slug={categorie.slug}
                        className={styles.categoryStamp}
                        variant="pill"
                        tone="solid"
                        size="sm"
                        font="grotesk"
                        labelSize="sm"
                        padding="md"
                        gap="md"
                        shadow="soft"
                        maxWidth="calc(100% - 1.8rem)"
                        style={{ paddingInline: "0.75rem" }}
                        truncate
                        gradient={false}
                        symbolScale={0.8}
                    />
                ) : (
                    <span className={styles.categoryFallback}>
                        {personnage.categoriePrincipale}
                    </span>
                )}

                <div className={styles.arch} aria-hidden="true" />

                {personnage.illustration ? (
                    <div className={styles.illustration} aria-hidden="true">
                        <Image
                            className={styles.illustrationImage}
                            src={personnage.illustration}
                            alt=""
                            width={240}
                            height={240}
                            sizes="(max-width: 620px) 80vw, (max-width: 900px) 42vw, 340px"
                        />
                    </div>
                ) : (
                    <div className={styles.placeholder} aria-hidden="true">
                        <span className={styles.initials}>
                            {getInitials(personnage.nom)}
                        </span>
                        <span className={styles.placeholderLabel}>
                            Portrait à venir
                        </span>
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.biography}>
                    <div className={styles.identity}>
                        <h3 className={styles.name}>
                            <Link
                                href={`/personnage/${personnage.id}`}
                                className={styles.nameLink}
                            >
                                {personnage.nom}
                            </Link>
                        </h3>

                        {alias ? (
                            <p className={styles.alias}>
                                <span className={styles.aliasLabel}>
                                    Aussi connu·e sous le nom de
                                </span>
                                <span className={styles.aliasName}>
                                    {alias}
                                </span>
                            </p>
                        ) : null}
                    </div>

                    {personnage.roles.length > 0 ? (
                        <ul
                            className={styles.roles}
                            aria-label={`Rôles de ${personnage.nom}`}
                        >
                            {personnage.roles.slice(0, 2).map((role) => (
                                <li key={role}>{role}</li>
                            ))}
                        </ul>
                    ) : null}
                </div>

                <section
                    className={styles.relationsSection}
                    aria-label={`Relations de ${personnage.nom} avec les châteaux`}
                >
                    {relations.length > 0 ? (
                        <LRZAccordion
                            id={`relations-${personnage.id}`}
                            className={styles.relationsAccordion}
                            title="Relations avec les châteaux"
                            description={formatLieuCount(lieuCount)}
                            icon={<Castle aria-hidden="true" size={15} />}
                            fullWidth
                            headingLevel={4}
                            size="sm"
                            tone="surface"
                            unmountOnClose
                            style={accordionStyle}
                        >
                            <RelationList relations={relations} />
                        </LRZAccordion>
                    ) : (
                        <span className={styles.relationEmptyLabel}>
                            <Castle aria-hidden="true" size={15} />
                            Aucun château relié
                        </span>
                    )}
                </section>
            </div>
        </article>
    );
}

function RelationList({
    relations,
}: {
    relations: readonly RelationPersonnageLieu[];
}) {
    return (
        <ul className={styles.relationList}>
            {relations.map((relation) => (
                <li key={`${relation.personnageId}-${relation.lieuId}`}>
                    <strong>{relation.lieuNom}</strong>
                    <span>
                        {relation.libelle} · {relation.periodeAffichee}
                    </span>
                    <small>{relation.description}</small>
                </li>
            ))}
        </ul>
    );
}

function formatLieuCount(count: number): string {
    if (count === 1) return "1 château";
    return `${count} châteaux`;
}

function getInitials(name: string): string {
    const words = name
        .split(/[\s-]+/)
        .map((word) => word.trim())
        .filter(Boolean);

    if (words.length === 0) return "?";
    if (words.length === 1) return words[0].slice(0, 2).toLocaleUpperCase("fr");

    return `${words[0][0]}${words.at(-1)?.[0] ?? ""}`.toLocaleUpperCase("fr");
}
