---
source: GitHub release notes — prisma/orm tags v8.0.0-rc.17 … v8.0.0-rc.12 + upgrade recipes (skills/prisma-8/upgrading) + npm dist
library: prisma
package: "@prisma/orm-mongo / prisma CLI (ORM 8 RC train)"
version: rc.16 → rc.17
topic: What changed between rc.16 and rc.17 (and recent Mongo-relevant RC history) — verify-before-implement notes
fetched: 2026-10-14T15:15:00Z
official_docs:
  - https://github.com/prisma/orm/releases/tag/v8.0.0-rc.17
  - https://github.com/prisma/orm/releases/tag/v8.0.0-rc.16
  - https://github.com/prisma/orm/tree/v8.0.0-rc.17/skills/prisma-8/upgrading/app/upgrades/8.0.0-rc.16-to-8.0.0-rc.17
  - https://github.com/prisma/orm/blob/v8.0.0-rc.17/CHANGELOG.md
  - https://www.prisma.io/docs/orm/release-status
---

# rc.16 → rc.17 differences (prisma/orm train; `@prisma/orm-mongo` rc.17 released 2026-10-08)

Upgrade recipes exist for every hop: app recipe `skills/prisma-8/upgrading/app/upgrades/8.0.0-rc.16-to-8.0.0-rc.17/instructions.md` (in the `prisma/orm` repo). Each change has an id you can grep for.

## Breaking changes (rc.17) — read before running migrations/CI

1. **`--confirm` no longer consents to data loss.** `prisma migration plan` and `prisma db update` ask one question per model/field/table a plan would drop, before writing/applying. Answer with `--delete <subject>` (let data go) or `--rename <old>:<new>` (keep rows). `db update` also asks `--allow <Model>` before widening row access (e.g. dropping an RLS policy). Unanswerable → `CLI.CONSENT_REQUIRED` (its `nextActions` list the flags). **Replace every `--confirm` in scripts/CI.**
   - Before: `prisma db update --confirm appdb` → After: `prisma db update --delete Legacy --rename User.name:User.fullName`
2. **`destructive` now means data loss.** Dropping an index/constraint/check/default/native enum, Postgres `setNotNull`, and value-preserving type changes are now `widening` — no consent. On Mongo specifically: `dropIndex`, `setValidation`, `collMod` + planner validator/change-stream image changes are `widening` (so the initial `$jsonSchema` bootstrap does not prompt for consent in rc.17). A not-yet-applied `migration.ts` re-run writes a different `ops.json` / `migrationHash`.
3. **`--rename` is refused on MongoDB in this release** (repeatable flag exists, but Mongo renames only).
4. **Control API:** `executeMigrationPlanCommand`, `executeDbUpdate`, control-client `dbUpdate` require an `answerQuestions` callback, lose `consent`; `acceptDataLoss: true` no longer covers access widening (`acceptAccessWidening: true`). Errors `MIGRATION.DESTRUCTIVE_CHANGES` and `MIGRATION.CONSENT_PLAN_MISMATCH` removed.
5. **SQL ORM client renames (not Mongo-scoped):** collection `apply` → `with`, `scope` → `fragment`; types `Scope`/`FieldScope`/`ScopeFacts` → `Fragment`/`FieldFragment`/`FragmentFacts`. Applies to the SQL ORM client only.
6. **`db.enums` now holds each member as a query returns it** (e.g. bigint member = `bigint`, date member = `Date`/Temporal, byte member = `Uint8Array`). Remove conversions applied to enum members; re-emit the contract. Custom Mongo ORM builds (`mongoOrm()`, `createMongoCollection()`) must pass enum accessors (`buildMongoEnums(contract, context.codecs)` from `@prisma/orm-mongo/family-runtime`); clients built with `mongo()` need no change.
7. **Enum codec refusals (Mongo):** enums can no longer use `mongo/json@1` or `mongo/bson@1` (no equality trait) → type with `mongo/string@1`; a Mongo PSL enum whose codec stores a non-JSON BSON type (`mongo/int64@1`, `mongo/int64Number@1`, `mongo/date@1`, `mongo/objectId@1`, `mongo/decimal128@1`, `mongo/binary@1`, `mongo/vector@1`) is refused at emit with `PSL_EXTENSION_INVALID_VALUE`, as is `mongo/double@1` written `"NaN"/"Infinity"`. Hand-edited `contract.json` values like `"007"`/`"-0"` on `mongo/int64@1`/`mongo/int64Number@1` now fail `RUNTIME.DECODE_FAILED`.
8. **MongoDB PSL index sort syntax changed: `sort(field, direction)`.** Old `@@index([createdAt(sort: Desc), authorId])` no longer accepted → `@@index([sort(createdAt, Desc), authorId])`; also in `@@unique` / `@@textIndex`. Database index unchanged. (Only affects hand-authored contracts — a v6 schema read via `prisma6Schema` uses v6 syntax unchanged.)
9. **Postgres-focused (for awareness):** `prisma7Schema()` contracts now state Prisma-7 constraint names; foreign keys in `contract.json` name their backing index (every SQL contract with an FK gets a new storage hash — re-emit + plan/sign); enum list CHECK constraints compare in the column's type.

## Features / fixes (rc.17)

- `--rename <old>:<new>` for `migration plan` / `db update` (repeatable; not Mongo). Postgres row locks via `forUpdate()`/`forNoKeyUpdate()`/`forShare()`/`forKeyShare()`. `autoincrement` default now plans a sequence past the current max. Relations can name their backing index (`index: "<name>"`); emit warns `PN_INDEX_DUPLICATE` / `PN_INDEX_REDUNDANT`.
- **The MongoDB ORM accepts writes of enum values whose stored form is not the value** (e.g. bigint/date members). Fix: "When a contract change needs no database change, `migration plan` explains why and names the next command."

## rc.16 (previous hop) — for context

- Toolchain moved to `@prisma/cli-engine@0.6.3` (shares one ArkType copy; fixes fresh Bun installs where `orm init` / `contract emit` failed on a valid contract). Projects pinning `@prisma/cli-engine` themselves must move the pin 0.6.2 → 0.6.3.
- `@default` diagnostics now point at the written value and say what to write instead (`PSL_VALUE_TYPE_INCOMPATIBLE`, `PSL_INVALID_LITERAL`; schemas/contracts unchanged — only code asserting diagnostic text needs updating).
- Extension-author API changes (`dataTypes: DataTypeSupport` etc.).

## Mongo-relevant RC history (things that arrived recently — do not use older guides blindly)

- **rc.13**: `prisma6Schema` for MongoDB first landed ("a Prisma 6 MongoDB project can use its existing `schema.prisma` as the contract source"); Mongo schemas gained `Int64`, `Decimal128`, `Binary`, `Json`, `Bson` + automatic timestamps; `prisma contract print` added.
- **rc.14**: "The Mongo ORM passes every value it writes, reads or filters on through its field's codec."
- **rc.12**: `prisma.config.ts` must import `definePrismaConfig` (engine 0.6.1 no longer exports `defineConfig`); config files are merged parent→child (nearest wins; use `parent: false` to isolate); relative paths resolve from the config file's directory.
- **rc.10**: env vars dropped the `NEXT_` infix (e.g. `PRISMA_DISABLE_TELEMETRY`); schema header is `// use prisma-8` (old form still works); contract emit rejects `?`-nullability mismatches between relation field and FK.
- Docs note: each `contract emit` after upgrading past rc.12 / rc.13 / rc.15 is required (artifact key/format changes; old contracts are refused by the client).

## "May change before GA" flags (MongoDB Early Access)

- MongoDB support in Prisma ORM 8 is **Early Access** and "still changes between release candidates" (upgrade guide + official `prisma-mongodb-upgrade` skill, checked against rc.13 sources). Pin exact versions and re-read these release notes before each upgrade; the official skill itself says: before acting on any claim, check `npm ls @prisma/orm-mongo` and the synced `prisma-8` skill.
- The upgrade guide is written as of **rc.16**; live docs may lag the very latest rc. Defaults called out as still-evolving in docs: `mongo()` options table omits `verifyMarker` (documented for Postgres); no HMR/`globalThis` guidance for the v8 client; `--rename` unsupported on Mongo "in this release".
- GA timing: release-status page referenced a GA expectation (cited in prior cache as "expected October 2026") — treat as the project's stated target, not a guarantee; MongoDB Early Access status is the operative fact today.

Sources: https://github.com/prisma/orm/releases/tag/v8.0.0-rc.17 (full body at time of fetch), /v8.0.0-rc.16, /v8.0.0-rc.14, /v8.0.0-rc.13, /v8.0.0-rc.12; recipe listing `skills/prisma-8/upgrading/app/upgrades` at tag `v8.0.0-rc.17`; https://github.com/prisma/skills/tree/main/prisma-mongodb-upgrade.
