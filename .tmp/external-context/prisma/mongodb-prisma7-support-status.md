---
source: Official Prisma docs (prisma.io), fetched via webfetch + Context7 API
library: prisma
package: prisma
topic: MongoDB support status in Prisma ORM 7 (v7.10.0) + version pinning guidance
fetched: 2026-10-14T12:00:00Z
official_docs: https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/mongodb
---

# MongoDB + Prisma ORM v7: support status (verified 2026-10-14)

## TL;DR

**Prisma ORM 7.x has NO MongoDB connector. A MongoDB project cannot run on Prisma ORM 7.10.0 (or any 7.x release).** The `P1012` error is a generic v7 config error; fixing it does not make MongoDB work on v7. Official guidance:
- v7 MongoDB docs page: use **Prisma ORM v6.19** in the meantime.
- v6→v8 upgrade guide: **Prisma ORM 8 is the successor path** for MongoDB.

## Official quotes

> **MongoDB support for Prisma ORM v7 — coming in the near future.** In the meantime, please use **Prisma ORM v6.19** (the latest v6 release) when working with MongoDB.
> — https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/mongodb

> This guide is for developers moving a Prisma ORM 6 MongoDB project to **Prisma ORM 8**. Prisma ORM 7 has **no MongoDB connector**, so Prisma ORM 8 is the successor path.
> — https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb

## Version / release status (from https://www.prisma.io/docs/orm/release-status)

- `npm install prisma` today installs **Prisma ORM 8 RC** (`8.0.0-rc.22`) — it does NOT read `schema.prisma` and has no `generate`, `migrate dev`, or `db push` commands.
- `@prisma/client` `latest` remains **7.10.0** (v7 line; not part of v8).
- `@prisma/orm-mongo` (MongoDB library for ORM 8, early access): `8.0.0-rc.17`.
- Prisma ORM 8 GA expected **October 2026**. MongoDB is **early access**.
- Prisma ORM 7 gets fixes for 18 months after v8 GA (docs at `/orm/v7`).
- **Prisma ORM 6 receives security patches only, until 19 November 2026** (that's ~5 weeks after this fetch).
- To stay on v7 (non-Mongo projects): pin in package.json:
  ```json
  { "devDependencies": { "prisma": "^7" }, "dependencies": { "@prisma/client": "^7" } }
  ```
  `npm install --save-dev prisma@7` downgrades an accidentally installed v8. In CI use `npx prisma@7`.

## Options for a MongoDB project today

### Option A — Stay on Prisma ORM 6.19.x (official interim recommendation)
```bash
npm uninstall prisma @prisma/client
npm install prisma@6.19.3 @prisma/client@6.19.3
```
Then in `package.json` (lock to avoid npm `latest` = v8 RC):
```json
{ "devDependencies": { "prisma": "^6.19" }, "dependencies": { "@prisma/client": "^6.19" } }
```
- v6 keeps everything the project already has: `url` in the schema datasource, `generator client { provider = "prisma-client-js" }`, `new PrismaClient()`, `prisma db push` / `db pull` / `studio`, seed via package.json `"prisma": { "seed": ... }`.
- Caveat: security patches end **19 Nov 2026**; this is a stopgap.

### Option B — Prisma ORM 8 RC (`@prisma/orm-mongo`, MongoDB early access)
```bash
npm install --save-dev prisma
npm install @prisma/orm-mongo
npm install mongodb@7
npx prisma@latest orm init --yes --target mongodb --authoring psl
```
Full path documented in `mongodb-v6-to-v8-upgrade-path.md` (this directory).

## No MongoDB driver adapter exists for v7

v7 driver adapters (https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/database-drivers):
`pg` (PostgreSQL), `@prisma/adapter-ppg`, `mariadb`, `better-sqlite3`, `libsql`, `node-mssql`. **No MongoDB adapter.** MongoDB never needed an adapter in v6 (built-in connector); in v8 the path is the `@prisma/orm-mongo` database library, not a driver adapter.

## Note on `accelerateUrl` + MongoDB

Accelerate itself does support MongoDB connections (see `accelerate-v7-client.md`), but since **v7 has no MongoDB connector**, Accelerate + MongoDB can only run on **v6** — and Accelerate is being **retired on December 1, 2026**. Do not build a new MongoDB migration on Accelerate.

## Related fetched files

- `prisma-config-v7.md` — v7 `prisma.config.ts` reference (for non-Mongo v7 projects / general knowledge)
- `accelerate-v7-client.md` — Accelerate: client constructor, URL formats, retirement notice
- `generator-and-breaking-changes-v7.md` — v7 generator + breaking changes
- `mongodb-v6-to-v8-upgrade-path.md` — the actual viable MongoDB upgrade route (v6 → v8 RC)
