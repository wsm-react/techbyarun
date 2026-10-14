---
source: Context7 API + official Tailwind docs (upgrade-guide.mdx, blog/tailwindcss-v4)
library: tailwindcss
package: tailwindcss
topic: Next.js/PostCSS migration from v3.4 to v4.x + autoprefixer removal
fetched: 2026-10-14T12:00:00Z
tailwind_version: 4.3.3 (latest on npm as of 2026-10-14)
official_docs: https://tailwindcss.com/docs/upgrade-guide
---

# PostCSS setup for Tailwind v4 (Next.js 16)

## 1. Required postcss.config.mjs change

v3 (current project state):

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

v4 — exact replacement (remove `tailwindcss` and `autoprefixer` keys, add `@tailwindcss/postcss`):

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

> "In v3, the `tailwindcss` package was a PostCSS plugin, but in v4 the PostCSS plugin lives in a dedicated `@tailwindcss/postcss` package."
> — official upgrade guide

Array form is also valid (from v4 blog post): `export default { plugins: ["@tailwindcss/postcss"] }`.

## 2. Dependencies

```sh
npm install tailwindcss@latest @tailwindcss/postcss
npm uninstall autoprefixer
```

Remove `postcss-import` too if it is in the project — v4 handles `@import` bundling internally.

## 3. Autoprefixer is redundant — remove it (question #7)

> "Additionally, in v4 imports and vendor prefixing is now handled for you automatically, so you can remove `postcss-import` and `autoprefixer` if they are in your project"
> — official upgrade guide

- Vendor prefixing is done internally by Lightning CSS; keeping autoprefixer is unnecessary.
- v4 targets modern browsers only: Safari 16.4+, Chrome 111+, Firefox 128+. No browserslist config is used or required.

## 4. Optional: automated upgrade tool

```sh
npx @tailwindcss/upgrade   # requires Node.js 20+, run in project root
```

Automates: dependency updates, JS config → CSS migration, template class renames. Useful given this project's legacy `tailwind.config.ts` + JS plugins, though a manual path is fully documented (see `legacy-config-at-config.md`).

## 5. Next.js notes

- Next.js picks up `postcss.config.mjs` automatically; there is no Next-specific Tailwind plugin — PostCSS is the supported path for Next.js, webpack or Turbopack.
- No changes needed in `next.config.*` for this migration.

Sources:
- https://tailwindcss.com/docs/upgrade-guide
- https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/upgrade-guide.mdx
- https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4/index.mdx
- npm registry `tailwindcss@4.3.3` (verified 2026-10-14)
