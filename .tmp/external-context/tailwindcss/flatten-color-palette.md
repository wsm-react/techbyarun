---
source: npm registry + unpkg + v4 source (compat/flatten-color-palette)
library: tailwindcss
package: tailwindcss
topic: flattenColorPalette deep import status in v4 + drop-in replacement (question #4)
fetched: 2026-10-14T12:00:00Z
tailwind_version: 4.3.3 (verified also in 4.0.0, 4.1.0, 4.3.0)
official_docs: https://tailwindcss.com/docs/functions-and-directives
---

# `tailwindcss/lib/util/flattenColorPalette` in v4 (question #4)

## Verdict: STILL WORKS in v4.3.x (compat export present since 4.0.0)

Verified directly against npm package metadata (2026-10-14):

`tailwindcss@4.3.3` `package.json` → `exports` includes an explicit backward-compat subpath:

```json
"./lib/util/flattenColorPalette": {
  "import": "./dist/flatten-color-palette.mjs",
  "require": "./dist/flatten-color-palette.js"
},
"./lib/util/flattenColorPalette.js": {
  "import": "./dist/flatten-color-palette.mjs",
  "require": "./dist/flatten-color-palette.js"
}
```

Checked both forms across `4.0.0`, `4.1.0`, `4.3.0`, `4.3.3` — present in ALL of them. The dist file exists (HTTP 200 on unpkg) and default-exports the flattening function.

→ Your line `require("tailwindcss/lib/util/flattenColorPalette")` (or the ESM `import` form) keeps resolving when `tailwind.config.ts` is loaded via `@config` — the v4 loader resolves Node subpath exports and uses jiti for TS configs.

Note: `tailwindcss/colors` is NOT a replacement for the helper (it only provides the raw palette object; still exported as `"./colors"`). Options:
1. Keep the deep import — it is deliberately shipped in v4 as a compat path (simplest).
2. Inline the helper as a local file (drop-in below) if you want zero reliance on internals.

## Minimal drop-in (readable transcription of the shipped v4.3.3 implementation)

Faithful port of `dist/flatten-color-palette.mjs` (same behavior, including v4's `__CSS_VALUES__` metadata branch — that metadata can appear on values returned by `theme('colors')` in v4's legacy plugin compat layer):

```ts
// src/lib/flatten-color-palette.ts
export default function flattenColorPalette(colors: Record<string, any> = {}) {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(colors ?? {})) {
    if (key === "__CSS_VALUES__") continue;
    if (typeof value === "object" && value !== null) {
      for (const [subKey, subValue] of Object.entries(flattenColorPalette(value))) {
        result[`${key}${subKey === "DEFAULT" ? "" : `-${subKey}`}`] = subValue;
      }
    } else {
      result[key] = value;
    }
  }

  // Mirrors shipped v4 implementation: apply raw values for entries whose
  // __CSS_VALUES__ flag does not include bit 4.
  if ("__CSS_VALUES__" in colors) {
    for (const [key, flag] of Object.entries(colors.__CSS_VALUES__ as Record<string, number>)) {
      if ((Number(flag) & 4) === 0) result[key] = colors[key];
    }
  }

  return result;
}
```

Usage in `tailwind.config.ts`:

```ts
// before
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");
// after (local copy) — path relative to the config file
import flattenColorPalette from "./src/lib/flatten-color-palette";
```

The v4 compat runner (jiti for TS) handles this import when the config is loaded through `@config`.

Sources:
- npm registry: `tailwindcss@4.3.3` exports map (verified 2026-10-14)
- https://unpkg.com/tailwindcss@4.3.3/dist/flatten-color-palette.mjs (HTTP 200, default export verified)
- https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/src/compat/flatten-color-palette.ts
