<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commit messages

Follow the repository's LRZ commit convention exactly:

```text
[LRZ-CODEX] <emoji> <scope> > <imperative summary in English> > 🤠 Julien
```

- Keep the message on one line.
- Use a short lowercase scope, with kebab-case when needed.
- Write the summary in English, starting with a lowercase imperative verb and without a trailing period.
- Choose the emoji that best matches the change: `✨` feature, `🐛` fix, `🎨` design or UI, `♻️` refactor or migration, `🧪` tests or atelier, `📝` documentation, `📚` data, `🔍` SEO, `🔒` security or visibility, `🚀` production enablement, `🔗` linking, `🧱` architecture, `🧹` cleanup.
- Check recent `git log` entries when the appropriate scope or emoji is unclear.

Example:

```text
[LRZ-CODEX] 🎨 guinguettes > align index filters with chateaux > 🤠 Julien
```
