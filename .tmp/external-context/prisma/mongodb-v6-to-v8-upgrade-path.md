---
source: Official Prisma docs — "Prisma ORM 6 to 8 (MongoDB)" upgrade guide, https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb
library: prisma
package: prisma
topic: MongoDB upgrade path (v6 → Prisma ORM 8 RC with @prisma/orm-mongo)
fetched: 2026-10-14T12:00:00Z
official_docs: https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb
---

# MongoDB: the actual supported upgrade path (v6 → Prisma ORM 8 RC)

> Official: "This guide is for developers moving a Prisma ORM 6 MongoDB project to **Prisma ORM 8**. Prisma ORM 7 has **no MongoDB connector**, so Prisma ORM 8 is the successor path. This is a code and workflow migration against the same database: your data never moves."

## Prerequisites (v8 MongoDB early access)

- Node.js 22.18+ (22 line), 24.11+ (24 line), or 26+; Node 24 recommended
- TypeScript 5.9+
- MongoDB 8.0+
- `mongodb` node driver **7.x** (peer dependency)
- A replica set if the app uses transactions
- Guide written as of `8.0.0-rc.16` (`@prisma/orm-mongo` latest `8.0.0-rc.17` as of 2026-10-12); MongoDB support is **early access** and changes between RCs.
- Companion AI skill: `npx skills add prisma/skills` → `prisma-mongodb-upgrade`

## 1. Setup

```bash
npx prisma@latest orm init --yes --target mongodb --authoring psl
```

`prisma.config.ts` (v8 Mongo format — note different API from v7):

```ts
// prisma.config.ts
import 'dotenv/config';
import { definePrismaConfig } from 'prisma/config';
import { defineConfig as ormConfig } from '@prisma/orm-mongo/config';

export default definePrismaConfig({
  orm: ormConfig({
    contract: './src/prisma/contract.prisma',
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
});
```

Runtime client:

```ts
// src/prisma/db.ts
import mongo from '@prisma/orm-mongo/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

const db = mongo<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
  dbName: 'my-app-db',   // omit if URL carries the db name
});

export { db };
```

Shortcut — read the old v6 schema directly instead of porting to a contract:

```ts
import { defineConfig as ormConfig, prisma6Schema } from '@prisma/orm-mongo/config';
contract: prisma6Schema('prisma/schema.prisma'),
```
Caveats: plain `Int` and `Int @db.Long` read as `Int64Number` (repair fractional docs); `Bytes @db.ObjectId` reads as 24-digit hex string; `DateTime @db.Timestamp` not readable.

## 2. Contract basics (contract.prisma)

- First line must be `// use prisma-8` (else `contract emit` fails with `CONTRACT.SOURCE_LOAD_FAILED`).
- No `datasource`/`provider` in the contract — configured in `prisma.config.ts`.
- Key mappings: `id String @id @default(auto()) @map("_id") @db.ObjectId` → `id ObjectId @id @map("_id")`; `Int`→`Int64Number`, `Float`→`Double`, `Boolean`→`Bool`, `DateTime`→`Date`; `@default(now())`→`temporal.createdAt()`, `@updatedAt`→`temporal.updatedAt()`; `BigInt`/`Decimal`/`Bytes`/`Json` → `Int64`/`Decimal128`/`Binary`/`Json`.
- Generate: `npx prisma contract emit` → produces `contract.json` (re-run on every contract change).

## 3. Client API changes (cheat sheet)

| v6 | Prisma ORM 8 |
| --- | --- |
| `prisma.user.findMany(...)` | `db.orm.users.where({...}).all()` (collection = `@@map` name) |
| `prisma.user.findFirst(...)` | `db.orm.users.where({...}).first()` |
| `create`/`update`/`delete`/`upsert` | same names on `db.orm.<collection>` (mutations need `.where(...)` first) |
| `updateMany`/`deleteMany` | `updateAll`/`deleteAll` |
| `aggregate`/`groupBy` | `db.query.from(...).group(...).build()` → `(await db.runtime()).query(plan)` |
| `findRaw`/`aggregateRaw` | `db.raw.collection(...).aggregate(...).build()` → same runtime query, or `db.query.rawCommand(...)` |
| `$runCommandRaw` | share a `MongoClient` with the binding, then `mongoClient.db(...).command(...)` |
| `$transaction(...)` | no wrapper yet — use driver sessions (replica set required) |
| `$connect`/`$disconnect` | connects lazily; `db.close()` to disconnect |

Gotchas: address by storage name (`db.orm.users`, not `db.orm.User`); `.where()` takes plain equality objects; enums use storage values; ObjectId filters in the pipeline builder need `new MongoParamRef(new ObjectId(id))`.

## 4. Migration lifecycle (replaces `db push`)

```bash
npx prisma contract emit
npx prisma db update --db "$DATABASE_URL" --dry-run    # preview delta
npx prisma db update --db "$DATABASE_URL" --advance-ref db  # bootstrap existing DB
# afterwards:
npx prisma contract emit
npx prisma migration plan --name add_posts_indexes
npx prisma db migrate --db "$DATABASE_URL" --advance-ref db
npx prisma db verify --db "$DATABASE_URL"
```

- v8 adds strict `$jsonSchema` validators by default — existing documents must pass them.
- Do NOT use `db init` on a populated database (refuses validator changes).

## Known v8 gaps (from https://www.prisma.io/docs/orm/release-status)

Not available yet in ORM 8: `$extends`, filtering inside JSON columns, atomic `increment`, most nested writes, transaction isolation levels, `P2002`-style error codes. MongoDB is early access; RC API may change before GA (expected October 2026).

## Recommendation for the user's repo

1. Unbreak today: downgrade to `prisma@6.19.3` + `@prisma/client@6.19.3` (see `mongodb-prisma7-support-status.md`).
2. Plan the v8 Mongo migration using this guide now, ship after GA if possible.
3. Do not use Accelerate (retires 2026-12-01).
