@AGENTS.md

# Gestionnaire de paquets

Ce projet utilise **pnpm** exclusivement. Ne jamais utiliser `npm` ou `yarn`.

- Installer les dépendances : `pnpm install`
- Ajouter un paquet : `pnpm add <pkg>` / `pnpm add -D <pkg>` (dev)
- Lancer un script : `pnpm <script>` (ex. `pnpm dev`, `pnpm build`, `pnpm lint`)
- Exécuter un binaire : `pnpm exec <bin>` (ex. `pnpm exec prettier ...`)

# Formatage

Prettier est la source de vérité du style. Indentation **4 espaces** (voir `.prettierrc.json`).

- Formater tout : `pnpm format`
- Vérifier : `pnpm format:check`
