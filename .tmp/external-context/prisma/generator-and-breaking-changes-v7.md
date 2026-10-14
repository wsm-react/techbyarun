---
source: Official Prisma docs v7 (driver adapters page, AI prompts, quickstarts) + Context7 API
library: prisma
package: prisma
topic: v7 generator block (prisma-client vs prisma-client-js) + v7 breaking changes
fetched: 2026-10-14T12:00:00Z
official_docs: https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/database-drivers
---

# Prisma ORM v7 — generator block + breaking changes

> For MongoDB: N/A on v7 (no connector). Kept as exact v7 reference.

## Generator block in v7

`prisma-client-js` is **deprecated/broken in v7** — official prompts say it "BREAKS APPLICATION" / "CLIENT GENERATION FAILS". The v7 generator is **`prisma-client`** with a **mandatory `output`**:

```prisma
// ✅ Prisma v7 generator: provider + mandatory output
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

- Default output path: `../generated/prisma` (docs: "the recommended approach is to use a custom output path").
- Optional `runtime` for edge targets, e.g. `runtime = "vercel-edge"`, `runtime = "workerd"`.
- It generates **into your project** (not `node_modules/@prisma/client`). There is no more generation into `node_modules/@prisma/client` for this provider.

## Import changes

```ts
// ❌ v6 style (BREAKS on v7)
import { PrismaClient } from "@prisma/client";

// ✅ v7: import from the generated output path — note the trailing /client
import { PrismaClient } from "./generated/prisma/client";
```

- "Wrong import path (missing `/client`) → MODULE NOT FOUND ERROR."
- Same applies to the `Prisma` namespace and other exports the user may import (`Prisma`, error classes, enums): import them from the generated client path, e.g. `import { Prisma, PrismaClient } from "@/generated/prisma/client"` (adjust relative path to the `output` above).
- Relative path example from docs: with `output = "../src/generated/prisma"`, app code imports `import { PrismaClient } from "./generated/prisma/client"`. You can also alias via package.json: `npm add db@./generated/prisma` then `import { PrismaClient } from "db"`.

## Breaking changes checklist (v7, affects the user's setup)

1. **`url` removed from `schema.prisma` datasource** → moved to `prisma.config.ts` (`datasource.url`). Error: `P1012 The datasource property url is no longer supported in schema files. Move connection URLs for Migrate to prisma.config.ts and pass either adapter or accelerateUrl to the PrismaClient constructor.`
   - v7 datasource block:
     ```prisma
     datasource db {
       provider = "postgresql"
       // no url here in v7
     }
     ```
2. **`.env` is no longer auto-loaded by the CLI** → install `dotenv` + `import "dotenv/config"` in `prisma.config.ts` (or `--env-file`; Bun auto-loads). Missing import → "DATABASE_URL NOT FOUND ERROR".
3. **`prisma.config.ts` properties removed in v7**: `engine`, `adapter`, `datasource.directUrl`, `studio` (see `prisma-config-v7.md`).
4. **`prisma generate --no-engine` no longer required** (v7 clients are engine-free by default).
5. **Client requires `adapter` or `accelerateUrl`** in the constructor for databases connected via driver adapters/Accelerate; `new PrismaClient()` with implicit schema URL no longer works for SQL databases in v7.
6. **Requirements (v7)**: Node.js 20.19+ and TypeScript 5.4.0+ (per docs AI prompt). (Prisma ORM 8 needs Node 22.18+/24.11+, TS 5.9+.)
7. **npm `latest` landscape**: `npm install prisma` now pulls v8 RC; `@prisma/client` stays on the v7 line (7.10.0). Pin versions to avoid accidental upgrades (`prisma: "^7"`, `@prisma/client: "^7"`).

## Not changed in v7 that still works

- `prisma db push`, `prisma db pull`, `prisma studio` still exist in the v7 CLI (for supported databases).
- `prisma migrate dev` still exists for supported SQL databases.

## For MongoDB specifically

All of the above is moot: **v7 has no MongoDB connector** (see `mongodb-prisma7-support-status.md`). A MongoDB schema with `provider = "mongodb"` will not work on 7.10.0 even after fixing `P1012`.

Sources:
- https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/database-drivers
- https://www.prisma.io/docs/ai/prompts/nextjs, /ai/prompts/turborepo, /ai/prompts/nuxt, /ai/prompts/prisma-7
- https://www.prisma.io/docs/orm/release-status
