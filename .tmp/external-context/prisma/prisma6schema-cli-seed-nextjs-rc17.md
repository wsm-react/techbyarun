---
source: Prisma docs (prisma.io, live .md pages) + npm registry metadata + prisma/orm repo tag v8.0.0-rc.17
library: prisma
package: "prisma (CLI) + @prisma/orm-mongo"
version: CLI 8.0.0-rc.22 / orm-mongo 8.0.0-rc.17
topic: prisma6Schema shortcut, contract emit artifacts, CLI v8 command map (no generate/db push/db pull/studio), @prisma/client role, seeding, Next.js 16 integration, version compatibility
fetched: 2026-10-14T15:10:00Z
official_docs:
  - https://www.prisma.io/docs/cli/configuration#use-a-prisma-orm-6-mongodb-schema
  - https://www.prisma.io/docs/cli/contract-emit
  - https://www.prisma.io/docs/orm/coming-from-prisma-orm-7
  - https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb
  - https://www.prisma.io/docs/guides/database/multiple-databases
  - https://github.com/prisma/skills/tree/main/prisma-mongodb-upgrade
---

# prisma6Schema + CLI + seed + Next.js + compatibility (ORM 8 RC, MongoDB)

## 1. Exact `prisma.config.ts` for rc.17 (prisma6Schema)

From https://www.prisma.io/docs/cli/configuration#use-a-prisma-orm-6-mongodb-schema :

```ts
// prisma.config.ts
import 'dotenv/config';
import { definePrismaConfig } from 'prisma/config';
import { defineConfig as ormConfig, prisma6Schema } from '@prisma/orm-mongo/config';

export default definePrismaConfig({
  orm: ormConfig({
    contract: prisma6Schema('prisma/schema.prisma'),   // exact call from docs
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
});
```

- The v6 `schema.prisma` does NOT need the `// use prisma-8` first line when read through `prisma6Schema`.
- After config: `npx prisma contract emit` then `npx prisma db sign` ("which checks that the database Prisma ORM 6 built matches the contract").
- `prisma` must be a local dependency ("The import resolves from your project's `node_modules`, so `prisma` must be a local dependency").
- v6-project guard: a plain `orm init` in a v6 Mongo project stops with `CLI.INIT_PRISMA6_SCHEMA_FOUND` and prints the side-by-side setup (npm alias `"prisma6": "npm:prisma@<version>"` + its own config file; then install ORM 8, write `prisma.config.ts` with `prisma6Schema`, run `contract emit` and `db sign`). Passing `--target`/`--authoring` replaces the v6 CLI and breaks v6 commands until v6 gets its own config.

## 2. `npx prisma contract emit` — artifacts and WHERE

Source: https://www.prisma.io/docs/cli/contract-emit

- Emits exactly two files:
  - `contract.json` — canonical machine-readable contract (runtime reads it)
  - `contract.d.ts` — generated TypeScript declarations (`export`s the `Contract` type)
- Location: **next to the contract source** (for `prisma6Schema('prisma/schema.prisma')` → `prisma/contract.json` + `prisma/contract.d.ts`). The same rule is stated verbatim for schema sources ("writes `contract.json` and `contract.d.ts` into the directory that holds the schema"), overridable with `--output-path <dir>`. Command is offline (no DB needed).
- Commit both files ("they hold structure only, no data and no credentials"). Re-run after every contract change.
- rc.17 migrations-consent changes do not affect emit; but note emit-adjacent history: re-emit needed after upgrading past rc.12/rc.13/rc.15 formats (old contracts are refused).

Runtime file importing the artifacts (paths relative — docs: "These examples assume the file is beside `contract.json` in `src/prisma/`, so from anywhere else, change the relative paths. Write `./contract.d` exactly like that, with no extension"):

```ts
// e.g. prisma/db.ts if db.ts sits next to the emitted files, or src/prisma/db.ts with adjusted paths
import mongo from '@prisma/orm-mongo/runtime';
import type { Contract } from './contract.d';                 // resolves contract.d.ts
import contractJson from './contract.json' with { type: 'json' };

export const db = mongo<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
  dbName: 'my-app-db',
});
```

tsconfig / Node requirements for the JSON import attribute (transactions-and-runtime ref):
- `with { type: 'json' }` needs **Node.js 22.18+** and **TypeScript 5.9+**.
- `tsconfig.json` needs `resolveJsonModule: true` plus one of: `preserve`+`bundler`, `esnext`+`bundler`, or `nodenext`+`nodenext`. `node18`/`node20` also work with `moduleResolution` unset. `prisma orm init` writes `preserve` + `bundler`.
- Under `nodenext` + no `"type": "module"` (CJS output) the import is written **without** the `with` part: `import contractJson from './contract.json';`.

## 3. prisma6Schema caveats — how v6 types surface in TS

From config page + upgrade guide:

- Plain `Int` and `Int @db.Long` → `Int64Number`: **"a `number` in your code, written as a BSON long, as v6 writes it."** So `typeof x === 'number'` still holds. BUT a stored document whose `Int` field holds a **fraction** fails to read with `RUNTIME.DECODE_FAILED` — repair such documents before cutover.
- `Bytes @db.ObjectId` → reads as a **24-digit hex string**; accepts a hex string or an `ObjectId`, **not** a `Buffer`/`Uint8Array`.
- `DateTime @db.Timestamp` → **not readable**.
- Every other native type v6 accepts on MongoDB is read.
- `contract emit` **fails** on schema parts ORM 8 can't represent exactly, with codes starting `PSL.PRISMA6_MONGO_`. Full code list seen in the error reference: `COMPOSITE_ID_UNSUPPORTED`, `COMPOSITE_INDEX_PATH_UNSUPPORTED`, `COMPOSITE_MAP_UNSUPPORTED`, `CONTRACT_INVALID`, `DEFAULT_UNSUPPORTED`, `ID_NOT_OBJECTID`, `IGNORED_FIELD_REFERENCED`, `INDEX_ARGUMENT_UNSUPPORTED`, `LIST_RELATION_UNSUPPORTED`, `NATIVE_TYPE_UNSUPPORTED`, `OPTIONAL_GENERATED_FIELD_UNSUPPORTED`, `PROVIDER_MISMATCH`, `REFERENTIAL_ACTION_UNSUPPORTED`, `SCHEMA_READ_FAILED`, `SCHEMA_UNSUPPORTED`, `TEXT_INDEX_LIMIT`, `UNKNOWN_ATTRIBUTE`, `UNSUPPORTED_TYPE`, `UPDATED_AT_TYPE_UNSUPPORTED`, `VIEW_UNSUPPORTED`.
- `prisma6Schema` set the source format for you (`format: 'psl'` is implied) — relevant only if authoring custom sources (`CONFIG.VALIDATION_FAILED` otherwise).
- v6 scalar names in *contract* files (`Int`, `Float`, `Boolean`, `DateTime`) still work with a `PSL_DEPRECATED_SCALAR_NAME` warning ("a later release removes them") — but with `prisma6Schema` you don't port at all; port when you want polymorphism etc.

## 4. CLI v8 without driver adapters — what replaced what

The ORM 8 CLI command list (https://www.prisma.io/docs/llms/cli.txt): `orm init`, `contract emit|infer|print`, `db init|migrate|schema|sign|update|verify`, `migration new|plan|ref|show|status`, `skills` (+ platform commands). **No `generate`, no `db push`, no `db pull`, no `studio`.**

Official mapping (https://www.prisma.io/docs/orm/coming-from-prisma-orm-7):

| Prisma 6/7 command | Prisma ORM 8 |
|---|---|
| `prisma generate` | `prisma contract emit` — "It writes `contract.json` and `contract.d.ts`; commit both" |
| `prisma migrate dev` | `prisma db update`, or `prisma migration plan` then `prisma db migrate` |
| `prisma migrate deploy` | `prisma db migrate` |
| `prisma db push` | `prisma db init` first time (empty DB); `prisma db update` after that |
| `prisma db pull` | `prisma contract infer` — "writes a first draft of a contract from an existing database" |
| `prisma migrate reset` | none — drop/recreate with DB tools, then `prisma db init` |
| `prisma db seed` | **none** — see §5 |
| `prisma studio` | **none in the Prisma ORM 8 tool** — run ORM 7 Studio from outside the project: `cd /tmp && npx prisma@7 studio --url "<connection>"` (docs link: Studio is a Prisma Postgres tool; expect no Mongo workflow here) |
| `prisma format` | `prisma contract format` |
| `prisma validate` | none — `contract emit` fails if invalid; `db verify` checks against DB |

MongoDB migration lifecycle (upgrade guide §4) for an existing v6 database:

```bash
npx prisma contract emit
npx prisma db update --db "$DATABASE_URL" --dry-run       # preview delta
npx prisma db update --db "$DATABASE_URL" --advance-ref db # bootstrap + sign as `db` ref
# thereafter (checked-in history):
npx prisma contract emit
npx prisma migration plan --name add_posts_indexes
npx prisma db migrate --db "$DATABASE_URL" --advance-ref db
npx prisma db verify --db "$DATABASE_URL"
```

- Do NOT use `db init` on the populated v6 DB (refuses validator changes as destructive; `db update` is the path).
- rc.17 change: `migration plan` / `db update` now ask about each data-losing model/field — answer `--delete <subject>` or `--rename <old>:<new>`; `--confirm` no longer consents (see rc16-to-rc17 file). `--rename` is refused on MongoDB in rc.17. CI that used `--confirm` must change; unanswerable → `CLI.CONSENT_REQUIRED` with nextActions.
- rc.17 reclassifies Mongo `setValidation`/`dropIndex`/`collMod` as `widening` (no consent prompt) — the initial validator bootstrap is smoother than the older guide's "confirmation prompt" wording.
- Strict `$jsonSchema` validators are added by default; existing docs must pass before production writes.

## 5. Seeding — no command, no config field

From the official mapping table: `prisma db seed` → **none**:

> "there is no seed command. Write a script that imports `db` from `src/prisma/db.ts` and calls `.create(...)`, and run it the way you run any TypeScript file, for example `npx tsx src/prisma/seed.ts`"

So: seeding is a manual script (recommended `tsx`). The configuration page shows the `orm` section keys in use: `contract`, `db.connection`, `migrations` (`{ dir }`, used to scope multi-project repos), `extensions` — **no `seed` field documented for `definePrismaConfig`** at rc.17. (The `prisma.config.ts` also supports `parent`, `skills`, `composer` sections.)

```ts
// prisma/seed.ts
import { db } from '../src/prisma/db';

await db.orm.users.create({ name: 'Carol', email: 'carol@example.com', bio: null, role: 'reader', address: null });
await db.close();
```

## 6. `@prisma/client` role

- ORM 8's MongoDB path **never uses `@prisma/client`**. Install set (per coming-from guide pattern): `npm install --save-dev prisma` + `npm install @prisma/orm-mongo` (+ `mongodb@^7` peer, install for the driver types/sessions).
- The ORM 8 docs never list `@prisma/client`; the runtime reads `contract.json` via `@prisma/orm-mongo/runtime`.
- `prisma@8.0.0-rc.22` npm metadata has **no postinstall hook** (scripts: test/build/typecheck) — nothing is generated on install. (v6 `@prisma/client`'s postinstall-era generation is gone.)
- `@prisma/client@7.10.0` (or v6) can coexist in node_modules — it is simply unused by the v8 path; keep it only while some code still runs the v6/v7 client (the upgrade guide's pre-flight: "Don't delete the v6 client, schema, or dependencies until this checklist passes").
- If you run the side-by-side flow, the v6 CLI is aliased (`"prisma6": "npm:prisma@<v6>"`) with its own config file; ORM 8 commands run under the plain `prisma` binary.

## 7. Next.js 16 integration

- Docs pattern everywhere is a **module-level singleton** in `src/prisma/db.ts` ("Create `db` once per process, and close it with `await db.close()` when the process shuts down"; React-Router guide: "The client is created once per process and shared by every request; never close it in a loader or action").
- A documented Next.js 16.3.4 + **Turbopack** app (multiple-databases guide) imports the client with `with { type: 'json' }` and works with no extra Turbopack/webpack configuration shown; `prebuild` re-emits contracts before `next build`:

```json
{ "scripts": { "prebuild": "prisma contract emit", "build": "next build" } }
```

- The JSON import requirements are tsconfig-level (§2), not Next-specific. "Turbopack compiles the package's TypeScript source through the workspace symlink; no `transpilePackages` setting is needed" (monorepo case).
- **Hot reload / dev singleton:** the ORM 8 docs do NOT show a `globalThis` pattern for the v8 client (all `globalThis` hits in the docs are the v7 `PrismaClient` pattern). The v8-documented approach is the plain module-level `db` above. Flag: no explicit HMR guidance in ORM 8 docs as of rc.17 — if dev HMR duplicates instances, the docs give no sanctioned workaround; do not assume the old `globalForPrisma` snippet applies unchanged (the runtime is a Prisma `MongoClient`, not `PrismaClient`).

## 8. Version compatibility — CLI rc.22 ↔ orm-mongo rc.17

Verified from npm registry metadata (2026-10):

- `prisma@8.0.0-rc.22` engines: `node >=22.18.0`; dependencies include `@prisma/orm-toolchain@8.0.0-rc.17`.
- `@prisma/orm-mongo@8.0.0-rc.17` dependencies: `@prisma/orm-framework`, `@prisma/orm-toolchain`, `@prisma/orm-family-mongo`, `@prisma/orm-target-mongo` — **all pinned 8.0.0-rc.17**. Peer deps: `mongodb: ^7.0.0`, `typescript: >=5.9` (optional).
- The RC counters of CLI (`rc.22`) and the ORM packages (`rc.17`) are independent release trains; the **lockstep artifact is `@prisma/orm-toolchain`**, pinned to the same rc.17 in both. This pairing is compatible; docs instruct installing the `latest` `@prisma/orm-mongo`.
- Environment fit: Node 26.11.1 ✓ (docs: "26 or newer"); TS 5.9+ documented (project TS 7 is above the peer floor `>=5.9`, but docs were validated against TS 5.9.3 — **treat TS 7 as unverified**); `mongodb` 7.7.0 ✓ (`^7.0.0`); MongoDB server must be 8.0+.
- Early Access: "MongoDB support in Prisma ORM 8 still changes between release candidates" — pin exact versions; check `npm ls @prisma/orm-mongo`.

Sources: cli/configuration.md, cli/contract-emit.md, coming-from-prisma-orm-7.md, guides/upgrade-prisma-orm/mongodb.md, guides/database/multiple-databases.md, guides/frameworks/nextjs.md, quickstart/existing-app/mongodb.md, add-to-existing-project/mongodb.md, registry.npmjs.org metadata, prisma/skills prisma-mongodb-upgrade SKILL.md.
