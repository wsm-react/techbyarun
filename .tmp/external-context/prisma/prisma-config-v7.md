---
source: Official Prisma docs — Config API (Prisma ORM v7), https://www.prisma.io/docs/orm/v7/reference/prisma-config-reference
library: prisma
package: prisma
topic: prisma.config.ts format for Prisma ORM v7 (imports, fields, env loading, seed)
fetched: 2026-10-14T12:00:00Z
official_docs: https://www.prisma.io/docs/orm/v7/reference/prisma-config-reference
---

# `prisma.config.ts` in Prisma ORM v7 — exact reference

> Note: For a **MongoDB** project this is not usable on v7 (no MongoDB connector — see `mongodb-prisma7-support-status.md`). Kept here as the exact v7 config reference.

## Exact import (NOT `@prisma/config`)

`defineConfig` and `env` come from **`prisma/config`** (the CLI package). `PrismaConfig` type comes from `prisma`.

```ts
// prisma.config.ts — defineConfig form
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

```ts
// prisma.config.ts — satisfies PrismaConfig form
import "dotenv/config";
import type { PrismaConfig } from "prisma";
import { env } from "prisma/config";

export default {
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
  datasource: { url: env("DATABASE_URL") },
} satisfies PrismaConfig;
```

## Fields (v7 simplified `PrismaConfig` type, verbatim)

```ts
export declare type PrismaConfig = {
  experimental: { externalTables: boolean };
  schema?: string;                    // file or folder (recursive *.prisma)
  migrations?: {
    path: string;                     // migration history dir
    seed: string;                     // command for `npx prisma db seed`
    initShadowDb: string;             // SQL for shadow DB before migrations
  };
  views?: { path: string };
  typedSql?: { path: string };
  datasource?: {
    url: string;                      // Required: connection URL for CLI (migrate/db push/etc.)
    shadowDatabaseUrl?: string;
  };
};
```

Key facts:
- `datasource.url` (required, default `''`) is the **CLI** connection (Migrate, `db push`, `db pull`, Studio).
- `schema` default: `./prisma/schema.prisma` and `./schema.prisma`. Paths resolve **relative to the config file**, not CWD.
- File can be `prisma.config.ts` or `.config/prisma.ts` with extensions js/ts/mjs/cjs/mts/cts.

## Removed in v7 (do not use in `prisma.config.ts`)

- `datasource.directUrl` — **removed**; use `url` (v6 docs kept for reference only).
- `adapter` — **removed**; migrations with driver adapters work automatically in v7.
- `engine` — **removed**.
- `studio` — **removed**; Studio now uses `datasource` automatically: `npx prisma studio --config ./prisma.config.ts`.

## `.env` loading: NOT automatic — `dotenv` required

Environment variables from `.env` must be loaded **explicitly**. `prisma init` generates `import "dotenv/config"` at the top of the config. So:

- Add dependency: `npm install dotenv` (required, since v7 CLI no longer auto-loads `.env`).
- Add `import "dotenv/config";` as the first line of `prisma.config.ts`.
- Alternatives: `tsx --env-file=.env`, Node 20+ `--env-file` flag; Bun auto-loads `.env` (no dotenv import needed).

### `env()` caveats

- `env("DATABASE_URL")` from `prisma/config` **throws** (`PrismaConfigEnvError: Missing required environment variable`) if unset — and every CLI command loads the config, even `prisma generate` which doesn't need a URL.
- If the variable may be optional (e.g. CI runs `prisma generate` only), use `process.env.DATABASE_URL!` (or `?? ''`) instead of `env()`.

## Seed config (replaces package.json block)

`migrations.seed` replaces the old `"prisma": { "seed": ... }` block in package.json:

```ts
migrations: { seed: "tsx prisma/seed.ts" }
```

Triggered only via `npx prisma db seed`. (Old `"prisma"` key in package.json is superseded by `prisma.config.ts` in v7.)

## Path resolution gotchas

- With `npx prisma`/`bunx prisma`, the config is only detected when run from the **project root**; from a subdirectory pass `--config ../prisma.config.ts`.
- With `pnpm prisma`, detection works from subdirectories too (local install).
- `prisma validate --config ./path/to/myconfig.ts` for custom locations.

## Accelerate and prisma.config.ts

`accelerateUrl` is **NOT** configured in `prisma.config.ts`. The CLI gets the **direct** database URL via `datasource.url`; the client gets `accelerateUrl` in the `PrismaClient` constructor (see `accelerate-v7-client.md`).

Source: https://www.prisma.io/docs/orm/v7/reference/prisma-config-reference
