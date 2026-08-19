# Changelog

Toutes les modifications notables de `@loireridezen/codex-sdk` sont consignées
dans ce fichier.

## 1.0.0

- Stabilise le contrat public sur les sept index publiés par l’API du Codex.
- Rend `attributes.illustrations` obligatoire pour les Châteaux, avec les URL
  HTTPS absolues `aube`, `jour`, `soir` et `nuit`.
- Garantit que `media.imageUrl` reste l’alias exact de
  `attributes.illustrations.jour`.
- Retire du contrat typé l’ancien champ `illustrationVariant` sans alias de
  compatibilité.
- Documente la migration depuis 0.1.0 et la politique de compatibilité 1.x.

## 0.1.0 - 2026-08-05

- Première publication expérimentale du client TypeScript.
