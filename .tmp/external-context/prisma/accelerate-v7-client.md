---
source: Official Prisma docs — Accelerate (getting started, known limitations, FAQ), fetched 2026-10-14
library: prisma
package: prisma
topic: Accelerate client constructor (accelerateUrl), URL formats, MongoDB support, retirement notice
fetched: 2026-10-14T12:00:00Z
official_docs: https://www.prisma.io/docs/accelerate/getting-started
---

# Prisma Accelerate — client setup, URLs, MongoDB, retirement

## ⚠️ Accelerate retirement (critical)

> **Prisma Accelerate, including hosted Accelerate connections for Prisma Postgres, will be retired on December 1, 2026.**
> — https://www.prisma.io/docs/accelerate/getting-started

Paths listed by Prisma for the retirement:
- Migrate a PostgreSQL database to Prisma Postgres: https://www.prisma.io/docs/prisma-postgres/import-from-existing-database-postgresql
- Keep your existing database and remove Accelerate: https://www.prisma.io/docs/accelerate/keep-your-database
- Connect to Prisma Postgres without Accelerate: https://www.prisma.io/docs/postgres/database/switch-from-accelerate

**Implication: do not adopt Accelerate for new migrations.**

## Supported databases

Docs list a hosted **PostgreSQL, MySQL/MariaDB, PlanetScale, CockroachDB, or MongoDB** database as prerequisites — so yes, Accelerate has supported MongoDB connections. But combined with "v7 has no MongoDB connector", Accelerate+MongoDB is only possible on Prisma ORM **v6** (requires Prisma Client ≥ `4.16.1`), and is being retired.

MongoDB-specific limitation: Accelerate does not support direct IPv4 addresses in MongoDB connection strings — use a DNS record instead of a raw IP (e.g. `mongodb://user:pass@my-database.example.com:27017/db`). Source: https://www.prisma.io/docs/accelerate/more/known-limitations

## Connection string formats

- Accelerate: `prisma://accelerate.prisma-data.net/?api_key=__API_KEY__`
- Prisma Postgres (different product): `prisma+postgres://accelerate.prisma-data.net/?api_key=__API_KEY__`

Where to get it: Prisma Data Platform console (https://console.prisma.io) → your project → environment → enable Accelerate by providing the database connection string + region → generate the connection string/API key.

## `.env` layout (Accelerate + CLI)

```bash
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=__API_KEY__"   # runtime client
DIRECT_DATABASE_URL="mongodb://user:password@host/db_name"                # CLI: Migrate/Introspection
```

> Prisma Client reads the `prisma://` URL from `DATABASE_URL` at runtime, while Prisma CLI commands use the connection string defined in `prisma.config.ts`. **Prisma Migrate and Introspection do not work with a `prisma://` connection string.**

```ts
// prisma.config.ts (point CLI at the direct URL)
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: { url: env("DIRECT_DATABASE_URL") },
});
```

## Client constructor — `accelerateUrl`

Server (long-running):

```ts
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());
```

Edge runtime:

```ts
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());
```

Notes:
- The **`@prisma/extension-accelerate` package is still required** (it provides `cacheStrategy` per query and `$accelerate.invalidate`); `accelerateUrl` in the constructor is the v7-era connection mechanism — the v7 `P1012` error text itself says: "pass either **adapter** or **accelerateUrl** to the `PrismaClient` constructor."
- Version floors: Prisma Client ≥ 4.16.1, `@prisma/extension-accelerate` ≥ 1.0.0 (≥ 2.0.0 needs Node 18+).
- For **Prisma ORM v7**, `PrismaClient` must come from the **generated client output path** (e.g. `import { PrismaClient } from "./generated/prisma/client"`), not `@prisma/client` — the snippets above show the older/legacy import; see `generator-and-breaking-changes-v7.md`.
- Cache usage example: `cacheStrategy: { ttl, swr, tags }` on queries; `await prisma.$accelerate.invalidate({ tags: [...] })`; `P6003` = cache invalidation rate limit.
- `prisma generate --no-engine` is no longer required in v7 (it was for serverless/edge Accelerate on v6 and earlier).

## Relevant to MongoDB plan

Accelerate+MongoDB only exists on Prisma ORM 6.x. Since Accelerate retires 2026-12-01 and v6 security patches end 2026-11-19, this is a dead-end architecture for the user's migration. See `mongodb-prisma7-support-status.md`.

Sources: https://www.prisma.io/docs/accelerate/getting-started | https://www.prisma.io/docs/accelerate/more/known-limitations | https://www.prisma.io/docs/accelerate/more/faq
