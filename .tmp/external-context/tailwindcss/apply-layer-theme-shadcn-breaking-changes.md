---
source: Context7 API + official Tailwind docs (upgrade-guide.mdx, theme.mdx) + shadcn/ui docs
library: tailwindcss
package: tailwindcss
topic: Breaking changes — @apply, @layer, custom utilities, hsl(var()) themes, renamed utilities (question #6)
fetched: 2026-10-14T12:00:00Z
tailwind_version: 4.3.3
official_docs: https://tailwindcss.com/docs/upgrade-guide
---

# v4 breaking changes relevant to this migration (question #6)

## 1. `@layer` is now native CSS cascade layers (biggest @layer change)

- v3: classes in `@layer utilities` / `@layer components` were registered as real utility classes (worked with variants like `hover:` and with `@apply`).
- v4: no longer hijacks `@layer` → those classes are plain CSS. Custom utilities must use `@utility`:

```css
/* v3 */
@layer utilities { .tab-4 { tab-size: 4; } }
/* v4 */
@utility tab-4 { tab-size: 4; }
```

```css
/* v3 */
@layer components { .btn { border-radius: .5rem; padding: .5rem 1rem; } }
/* v4 */
@utility btn { border-radius: .5rem; padding: .5rem 1rem; }
```

- `@utility` names support variants when used in HTML (`hover:content-auto`, `lg:content-auto`) and are auto-sorted by property count.
- `@layer base { ... }` still works for base/override styles (the docs themselves use it for preflight tweaks).
- Consequence: you can no longer rely on `@apply`-ing classes you defined in `@layer components/utilities` — move those definitions to `@utility`.

## 2. `@apply` changes

- Works exactly as before in the main stylesheet (your `globals.css`).
- **Separately bundled stylesheets** (CSS modules `*.module.css`, Vue/Svelte/Astro `<style>`) no longer see theme variables/custom utilities/custom variants from other files → use `@reference`:

```css
/* e.g. Component.module.css or a <style> block */
@reference "../../app/globals.css";

h1 {
  @apply text-2xl font-bold text-red-500;
}
```

- Or skip `@apply` there and use theme CSS vars directly: `color: var(--text-red-500);` (faster, Tailwind doesn't process these styles).
- shadcn-style `@layer base { * { @apply border-border; } }` still works in the main sheet — just ensure `--color-border` etc. are defined in `@theme` (see #4).

## 3. `theme()` function deprecated

```css
/* v3 */ background-color: theme(colors.red.500);
/* v4 */ background-color: var(--color-red-500);
```

In media queries (CSS vars can't be used in media features) use the CSS variable NAME form:

```css
/* v3 */ @media (width >= theme(screens.xl)) {}
/* v4 */ @media (width >= theme(--breakpoint-xl)) {}
```

## 4. shadcn-style `hsl(var(--x))` themes → `@theme inline`

shadcn's official v3→v4 variable migration:

1. Move `:root` and `.dark` OUT of `@layer base`.
2. Wrap color values in `hsl()` inside `:root` / `.dark`.
3. Add the `inline` option: `@theme inline`.
4. Remove the `hsl()` wrappers inside `@theme`.

```css
/* intermediate state (codemod output; shadcn: "This works") */
@layer base {
  :root { --background: 0 0% 100%; --foreground: 0 0% 3.9%; }
  .dark { --background: 0 0% 3.9%; --foreground: 0 0% 98%; }
}
@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
}

/* recommended v4 final state */
:root {
  --background: hsl(0 0% 100%);        /* <-- wrap in hsl() */
  --foreground: hsl(0 0% 3.9%);
}
.dark {
  --background: hsl(0 0% 3.9%) ;       /* <-- wrap in hsl() */
  --foreground: hsl(0 0% 98%);
}
@theme inline {
  --color-background: var(--background);   /* <-- no hsl() wrapper */
  --color-foreground: var(--foreground);
}
```

Why `inline` (Tailwind theme docs, "Referencing other variables"):

> "When defining theme variables that reference other variables, use the `inline` option... Using the `inline` option, the utility class will use the theme variable _value_ instead of referencing the actual theme variable... Without using `inline`, your utility classes might resolve to unexpected values because of how variables are resolved in CSS."

Interpretation for this project: any `--color-x: var(--y)` / `hsl(var(--y))` pattern is a candidate for `@theme inline`; the old `hsl(var(--x))` class names (`bg-background` etc.) keep working as long as `--color-*` tokens are exposed.
- Chart configs: `color: "hsl(var(--chart-1))"` → `color: "var(--chart-1)"` (shadcn step 3) — only if you migrate to hsl()-wrapped values.
- OKLCH conversion of the palette is optional in shadcn (non-breaking); hsl() form is fine.

## 5. Renamed utilities (search/replace list in your app code)

| v3 | v4 |
|---|---|
| `shadow-sm` | `shadow-xs` |
| `shadow` | `shadow-sm` |
| `drop-shadow-sm` | `drop-shadow-xs` |
| `drop-shadow` | `drop-shadow-sm` |
| `blur-sm` | `blur-xs` |
| `blur` | `blur-sm` |
| `backdrop-blur-sm` | `backdrop-blur-xs` |
| `backdrop-blur` | `backdrop-blur-sm` |
| `rounded-sm` | `rounded-xs` |
| `rounded` | `rounded-sm` |
| `outline-none` | `outline-hidden` |
| `ring` | `ring-3` (v4 `ring` is now 1px) |

Notes:
- New `outline-none` actually sets `outline-style: none` (different semantics); old invisible-outline behavior = `outline-hidden`.
- `ring` default width 3px → 1px; default color `blue-500` → `currentColor`. To preserve v3 defaults:

```css
@theme {
  --default-ring-width: 3px;
  --default-ring-color: var(--color-blue-500);
}
```

## 6. Preflight / other changes that commonly bite shadcn-style apps

- Default border color: `gray-200` → `currentColor`. Preserve v3 behavior:

```css
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
```

- Buttons now use `cursor: default` (was `pointer`); docs snippet to restore:
  `@layer base { button:not(:disabled), [role="button"]:not(:disabled) { cursor: pointer; } }`
- `space-x-*`/`space-y-*` selector changed to `> :not(:last-child)` with margin-bottom/top — use flex/gap if affected.
- Placeholder color simplified (current text color at 50%); dialog margins reset; `hidden` attribute now beats `display` classes.
- Hover styles only apply on hover-capable devices; stacked variants now apply left-to-right; `bg-[--brand]` → `bg-(--brand)` for CSS-var shorthand.
- Removed long-deprecated utilities: `bg-opacity-*`/`text-opacity-*` (use `/50` modifiers), `flex-shrink-*`/`flex-grow-*` (use `shrink-*`/`grow-*`).

Sources:
- https://tailwindcss.com/docs/upgrade-guide (Changes from v3)
- https://tailwindcss.com/docs/theme ("Referencing other variables")
- https://ui.shadcn.com/docs/tailwind-v4 (upgrade steps 2–3)
- https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/upgrade-guide.mdx
