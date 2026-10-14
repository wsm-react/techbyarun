---
source: shadcn/ui official docs + tw-animate-css repo (README) + npm registry
library: tailwindcss
package: tailwindcss-animate / tw-animate-css
topic: Animation plugin compatibility with v4 — tailwindcss-animate@1.0.7 vs tw-animate-css (question #5)
fetched: 2026-10-14T12:00:00Z
tailwind_version: 4.3.3 | tw-animate-css: 1.4.0 | tailwindcss-animate: 1.0.7
official_docs: https://ui.shadcn.com/docs/tailwind-v4
---

# tailwindcss-animate vs tw-animate-css in v4 (question #5)

## Status of `tailwindcss-animate@1.0.7`

- Still the latest published version; `peerDependencies: { "tailwindcss": ">=3.0.0 || insiders" }` — never updated for v4.
- It is a legacy JS plugin. v4 CAN still execute it through the legacy plugin compatibility layer — shadcn's early v4 templates used `@plugin "tailwindcss-animate";` in globals.css — so keeping it in `tailwind.config.ts` `plugins` under `@config` will mostly "work".
- BUT it is officially deprecated for v4. shadcn changelog (March 19, 2025): "We've deprecated `tailwindcss-animate` in favor of `tw-animate-css`. New projects will have `tw-animate-css` installed by default."

## Recommended replacement: `tw-animate-css`

- npm description: "TailwindCSS v4.0 compatible replacement for `tailwindcss-animate`." (pure CSS, no legacy JS plugin system)
- Current version: 1.4.0. Ships ready-to-use `accordion-down`, `accordion-up`, and `caret-blink` animations plus `animate-in` / `animate-out` and the full enter/exit utility set → shadcn/ui component classes keep working unchanged.

### Migration steps (shadcn's official steps)

```sh
npm uninstall tailwindcss-animate
npm install -D tw-animate-css
```

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";   /* add AFTER the tailwind import */
```

Diff from shadcn docs:

```diff
- @plugin 'tailwindcss-animate';
+ @import "tw-animate-css";
```

## Wiring for THIS project (@config + custom JS plugins)

1. In `tailwind.config.ts`: remove the `tailwindcss-animate` entry from `plugins` (keep your custom plugin functions — they still run via `@config`).
2. In `src/app/globals.css`: add `@import "tw-animate-css";` after `@import "tailwindcss";`.
3. If `@plugin 'tailwindcss-animate'` exists in CSS, remove it.
4. Optional: a prefixed variant ships as `tw-animate-css/prefix` (exports: `./dist/tw-animate.css` and `./dist/tw-animate-prefix.css`).

## Version note

tw-animate-css README warns the upcoming v2.0.0 will have breaking changes (with a migration script/guide). Pin `^1.4.0` for a stable migration.

Sources:
- https://ui.shadcn.com/docs/tailwind-v4 (changelog March 19, 2025)
- https://github.com/Wombosvideo/tw-animate-css (README)
- npm: `tailwindcss-animate@1.0.7`, `tw-animate-css@1.4.0` (verified 2026-10-14)
