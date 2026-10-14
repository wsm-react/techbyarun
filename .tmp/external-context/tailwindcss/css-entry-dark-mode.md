---
source: Context7 API + official Tailwind docs (dark-mode.mdx, upgrade-guide.mdx) + v4 source
library: tailwindcss
package: tailwindcss
topic: globals.css entry (@import) + class-based dark mode (@custom-variant)
fetched: 2026-10-14T12:00:00Z
tailwind_version: 4.3.3
official_docs: https://tailwindcss.com/docs/dark-mode
---

# globals.css for v4 + class-based dark mode (question #2)

## 1. Replace @tailwind directives

v3 (current project state):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

v4 — one import brings in theme + preflight + utilities:

```css
@import "tailwindcss";
```

## 2. Class-based dark mode (`darkMode: ["class"]` replacement)

v4 default `dark:` follows `prefers-color-scheme`. To key `dark:*` utilities off a `.dark` class (your current behavior), add `@custom-variant` right after the import:

```css
/* src/app/globals.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

Keep putting `class="dark"` on `<html>`; dark utilities apply whenever `.dark` is on an ancestor.

Data-attribute alternative:

```css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

## 3. Nuance: legacy `darkMode` under `@config`

Verified in v4 source (`packages/tailwindcss/src/compat/dark-mode.ts`): a legacy `darkMode: ["class"]` in a `@config`-loaded JS config still registers the dark variant, as `&:is(.dark *)` ("old behavior"). `darkMode: "selector"` maps to the new preferred `&:where(.dark, .dark *)`.

Practical guidance:
- Both work for `<html class="dark">` usage, but the documented v4 approach is the CSS `@custom-variant` override.
- Prefer the `@custom-variant` line so dark mode does not depend on JS-config compatibility; the `darkMode` key in `tailwind.config.ts` can then be removed (or left; CSS-defined variants take precedence / merge).

## 4. Content scanning

- v4 auto-detects source files (respects `.gitignore`). No `content` array needed in CSS.
- Because this project keeps `@config`, note: `content` globs in the JS config ARE still honored in v4 (verified in `apply-compat-hooks.ts` — config `content.files` are pushed into the v4 scanner). Only `content: [{ raw: ... }]` entries are unsupported and throw an error.
- For files that are gitignored but contain classes, use `@source "../path"` in CSS.

Sources:
- https://tailwindcss.com/docs/dark-mode
- https://tailwindcss.com/docs/upgrade-guide
- https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/src/compat/dark-mode.ts
- https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/src/compat/apply-compat-hooks.ts
