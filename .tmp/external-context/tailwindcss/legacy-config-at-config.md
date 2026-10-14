---
source: Context7 API + official Tailwind docs (functions-and-directives.mdx, upgrade-guide.mdx) + v4 source
library: tailwindcss
package: tailwindcss
topic: Keeping tailwind.config.ts via @config directive — syntax, constraints, limitations
fetched: 2026-10-14T12:00:00Z
tailwind_version: 4.3.3
official_docs: https://tailwindcss.com/docs/functions-and-directives#config-directive
---

# Keeping the legacy tailwind.config.ts in v4 (@config) (question #3)

## Exact syntax

```css
/* src/app/globals.css — path is relative to THIS CSS file */
@import "tailwindcss";
@config "../tailwind.config.ts";
```

Official docs example: `@config "../../tailwind.config.js";`

- JS/TS config files are **no longer auto-detected** in v4 — you MUST load them explicitly with `@config`.
- TypeScript configs are supported: the v4 loader resolves configs/plugins with Node `import()`, with a fallback to jiti for TypeScript/JSX (from `@tailwindcss/node` dist source).
- Relative paths also support Node subpath imports (`#app/config`) via package.json `"imports"`.

## What IS supported from the JS config (verified against v4 docs + source)

- `theme` (extend, colors, keyframes, etc.) — merged into the CSS theme.
- `content` globs — honored (config `content.files` pushed into the v4 scanner; `content: [{ raw: ... }]` throws "This feature is not currently supported"). Verified in `compat/apply-compat-hooks.ts`.
- `blocklist` — honored (added to `designSystem.invalidCandidates`).
- `darkMode` — honored by the compat layer (`compat/dark-mode.ts`), e.g. `["class"]` → variant `&:is(.dark *)`.
- `plugins: [...]` — legacy JS plugins still run, including custom plugin functions using `addBase`, `addUtilities`, `matchUtilities`, `addVariant`, `addComponents`. The compat layer ships `plugin-api.ts` and `plugin-functions.ts` for this. `require("tailwindcss/plugin")` resolves in v4.
- `require("tailwindcss/lib/util/flattenColorPalette")` — still resolves in all v4.x (see `flatten-color-palette.md`).
- `presets` — loaded as part of the config through the same compat path.

## What is NOT supported

| v3 option | Status in v4 | Replacement |
|---|---|---|
| `corePlugins` | not supported | — (no direct equivalent) |
| `safelist` | not supported | `@source inline("...")` in CSS |
| `separator` | not supported | — |
| `content: [{ raw: ... }]` | throws error | use real files / `@source` |
| `resolveConfig` (JS export) | removed | CSS vars (`var(--color-*)`) or `getComputedStyle(document.documentElement).getPropertyValue("--x")` |

## Mixing @config with CSS-first features (recommended incremental path)

> "The `@config` and `@plugin` directives may be used in conjunction with `@theme`, `@utility`, and other CSS-driven features. This can be used to incrementally move over your theme, custom configuration, utilities, variants, and presets to CSS. Things defined in CSS will be merged where possible and otherwise take precedence over those defined in configs, presets, and plugins."
> — functions-and-directives docs, Compatibility section

So: keep `@config "../tailwind.config.ts"` for now; migrate pieces (theme tokens → `@theme`, dark mode → `@custom-variant`, custom classes → `@utility`) at your own pace without breaking the JS config.

## Related directive: @plugin

Legacy plugins (or a local JS/TS plugin file) can also be loaded directly:

```css
/* package name */
@plugin "@tailwindcss/typography";
/* or a local file (relative path, TS supported via jiti) */
@plugin "./src/plugins/my-plugin.ts";
```

Note: if a plugin is referenced BOTH in the config `plugins` array and via `@plugin`, it would load twice — use one or the other.

Sources:
- https://tailwindcss.com/docs/functions-and-directives#config-directive
- https://tailwindcss.com/docs/upgrade-guide#using-a-javascript-config-file
- https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/functions-and-directives.mdx
- https://github.com/tailwindlabs/tailwindcss/tree/main/packages/tailwindcss/src/compat
