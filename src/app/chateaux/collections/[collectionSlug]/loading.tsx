// src/app/chateaux/collections/[collectionSlug]/loading.tsx

import styles from "./page.module.css";

export default function CollectionLoading() {
    return (
        <main
            className={styles.page}
            aria-busy="true"
            aria-label="Chargement de la collection"
        >
            <div className={styles.loadingContainer}>
                <div className={styles.loadingBreadcrumb} />

                <div className={styles.loadingHero}>
                    <div className={styles.loadingMark} />

                    <div className={styles.loadingHeroContent}>
                        <div className={styles.loadingEyebrow} />
                        <div className={styles.loadingTitle} />
                        <div className={styles.loadingSubtitle} />
                        <div className={styles.loadingText} />
                    </div>
                </div>

                <div className={styles.loadingBadges}>
                    <div className={styles.loadingBadge} />
                    <div className={styles.loadingBadge} />
                    <div className={styles.loadingBadge} />
                </div>

                <div className={styles.loadingSection}>
                    <div className={styles.loadingSectionTitle} />

                    <div className={styles.loadingCards}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className={styles.loadingCard} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
