# Ligne de flottaison des médias · V1

Mesure réalisée le 11 août 2026 avec `pnpm assets:audit`, avant toute campagne d’optimisation destructive.

## État de référence

- **673 fichiers publics** pour **140,9 Mo** au total, après retrait des fichiers système.
- **126,5 Mo d’illustrations**, soit l’essentiel du poids public.
- **13,1 Mo de symboles**.
- **140,8 Mo de PNG** : le format concentre presque tout le volume.
- Les 20 fichiers les plus lourds pèsent entre **663 et 737 Ko** et appartiennent tous aux ambiances des châteaux.

## Lecture

La priorité n’est pas de compresser indistinctement tout le Codex. La première campagne devra cibler les grandes illustrations de châteaux, ambiance par ambiance, avec comparaison visuelle et seuil de qualité. Les symboles et petites illustrations métier peuvent rester en l’état tant qu’une mesure de chargement réelle ne les désigne pas comme goulot d’étranglement.

Cette ligne de flottaison permet de comparer les prochaines optimisations sans perdre la qualité éditoriale en route.
