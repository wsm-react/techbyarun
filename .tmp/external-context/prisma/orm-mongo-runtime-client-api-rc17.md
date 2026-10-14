---
source: Prisma docs (prisma.io, live .md pages) + Context7-style extraction, verified against prisma/orm tag v8.0.0-rc.17
library: prisma
package: "@prisma/orm-mongo"
version: 8.0.0-rc.17
topic: Runtime client API — mongo(), where/filters, reads, writes, upsert, db.close/db.raw, ObjectId returns, duplicate-key errors, batching
fetched: 2026-10-14T15:00:00Z
official_docs:
  - https://www.prisma.io/docs/orm/reference/orm-client
  - https://www.prisma.io/docs/orm/reference/transactions-and-runtime
  - https://www.prisma.io/docs/orm/reference/raw-queries
  - https://www.prisma.io/docs/orm/fundamentals/writing-data
  - https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb
  - https://github.com/prisma/orm/releases/tag/v8.0.0-rc.17
---

# @prisma/orm-mongo 8.0.0-rc.17 — runtime client API (MongoDB, Early Access)

Docs note: "MongoDB support in Prisma ORM 8 still changes between release candidates" — guide written as of rc.16, package latest rc.17 (2026-10-08). Re-check `npm ls @prisma/orm-mongo` before acting.

## 1. `mongo<Contract>(options)` — exact signature

```ts
// src/prisma/db.ts (scaffolded by `orm init`)
import 'dotenv/config';
import mongo from '@prisma/orm-mongo/runtime';
import type { Contract } from './contract.d';        // resolves to contract.d.ts — write WITHOUT extension
import contractJson from './contract.json' with { type: 'json' };

export const db = mongo<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
  dbName: 'my-app-db',        // optional when the URL path carries the db name
});
```

Options (source: https://www.prisma.io/docs/orm/reference/transactions-and-runtime#mongooptions):

| Option | Type | Notes |
|---|---|---|
| `contractJson` / `contract` | JSON contract or contract value | Yes — supply exactly one. `<Contract>` type arg is required when passing contractJson (TS can't read types from JSON). |
| `url` | `string` | `mongodb://` or `mongodb+srv://`, db name in the path. ORM creates + closes the underlying driver `MongoClient`. |
| `uri` + `dbName` | `string` + `string` | Same string kind, but `dbName` is required here. ORM owns/closes the client. |
| `mongoClient` + `dbName` | driver `MongoClient` + `string` | You own the client — `db.close()` does NOT close it. Same pool powers typed ORM + raw driver calls. |
| `binding` | `{ kind: 'url', url, dbName? } \| { kind: 'mongoClient', client, dbName }` | Same choices in one object (runtime selection). |
| `middleware` | Array of middleware | Runs around every query. |
| `mode` | `'strict' \| 'permissive'` (default `'strict'`) | "Prisma ORM ignores this value. It is passed through to your middleware so your own code can branch on it." |

- Pass exactly one of `url` / `uri` / `mongoClient` / `binding`, or none and pass one to `connect()` later.
- Return type: Prisma ORM's own `MongoClient` type (NOT the driver's class — rename one import when both appear). Members: `.orm` (models by **collection name**: `db.orm.users`), `.query` (pipeline builder), `.raw`, `.enums`, `.contract`, `connect()` / `runtime()` / `close()` and `Symbol.asyncDispose`.
- NOTE: `verifyMarker` is documented on the Postgres options table; the Mongo options table at rc-time lists only `middleware` and `mode`. The client warns by default on `CONTRACT.MARKER_MISMATCH`; docs say `verifyMarker: false` skips the check (flag: not listed in the Mongo table as of rc.17 — may change).

## 2. Lifecycle

- Lazy: "`mongo(options)` does not open a connection. The runtime is built on first use, or explicitly via `connect()`."
- `await db.runtime()` — **async on MongoDB** (Postgres' is sync). Returns `MongoRuntime` with `query`, `execute`, `close` only (no `connection()`/`prepare()`/`telemetry()`).
- `connect()` optional; calling it after first query (or twice) rejects `DRIVER.ALREADY_CONNECTED`.
- `db.close()`: returns `Promise<void>`; safe anytime; in-flight queries finish; afterwards every use (`db.runtime()`, `db.orm.users.first()`) rejects `DRIVER.NOT_CONNECTED` ("Mongo client is closed").
- Always call `db.close()` — "`runtime.close()` leaves the client looking open, and later calls fail."
- `await using db = mongo(...)` works (`Symbol.asyncDispose`).

## 3. `.where()` — accepted shapes + operators (rc.17)

- Object form: **plain equality only**: `.where({ email: 'x' })`. Multiple keys = implicit AND; `undefined` key is skipped; `null` matches null AND missing fields.
- Anything else (lt/gt/in/...) → `MongoFieldFilter` from `@prisma/orm-mongo/query-ast/execution`:

```ts
import { MongoFieldFilter } from '@prisma/orm-mongo/query-ast/execution';

await db.orm.users.where(MongoFieldFilter.eq('name', 'Alice')).first();
const recentPosts = await db.orm.posts
  .where(MongoFieldFilter.gte('createdAt', new Date('2024-01-02T00:00:00.000Z')))
  .all();
const inKinds  = await db.orm.posts.where(MongoFieldFilter.in('kind', ['article', 'tutorial'])).all();
const notIn    = await db.orm.posts.where(MongoFieldFilter.nin('kind', ['article'])).all();
const noBio    = await db.orm.users.where(MongoFieldFilter.isNull('bio')).all();
const grep     = await db.orm.posts.where(MongoFieldFilter.of('title', '$regex', '^Hello')).all(); // any $operator; not validated until run
```

- Helpers: `of(field, operator, value)`, `eq`, `neq` (there is **no `ne`**), `gt`, `lt`, `gte`, `lte`, `in`, `nin`, `isNull`, `isNotNull`. **No** `regex`/`elemMatch`/`all`/`size` helpers — use `.of()`. `MongoExistsExpr.exists(field)` / `.notExists(field)` (same module).
- Values pass through the field's codec → pass what a read gives you (hex string or `ObjectId` for ObjectId fields; `bigint` for Int64; `Int32` in range). Bad value → `RUNTIME.ENCODE_FAILED` before the query runs. `bigint`/`ObjectId` literals must be wrapped: `MongoFieldFilter.gt('views', new MongoParamRef(5n))` (`MongoParamRef` from `@prisma/orm-mongo/value`).
- Combinators: `.and(other)` (one condition at a time, or `MongoAndExpr.of([a,b,c])`), `.not()`; OR via `MongoOrExpr.of([...])` (no `.or()`).
- Dot notation: `MongoFieldFilter.eq('address.city', 'San Francisco')` (typed); `.where({ 'address.city': 'x' })` runs but does not type-check.
- Chaining `.where(a).where(b)` = AND.

## 4. Reads: `first()`, `all()`, count, options

Source: https://www.prisma.io/docs/orm/reference/orm-client (Read methods)

- `.first()` — **no argument on MongoDB**. Filter with `where()` first. Returns `Row | null`; does not check uniqueness. `all().firstOrThrow()` reads all rows and throws `RUNTIME.NO_ROWS` on no match.
- `.all()` — no required args; returns `AsyncIterableResult<Row>`: `await` → `Row[]`, or `for await` to stream rows. Re-awaiting is safe (same array); switching await→for-await throws `RUNTIME.ITERATOR_CONSUMED`; detect via `isRuntimeError` from `@prisma/orm-mongo/components/runtime`.
- Options are **chained**, not arguments to `all()`:
  - `.orderBy({ createdAt: -1 })` (1 asc / -1 desc)
  - `.limit(n)`, `.offset(n)`
  - `.select('name', 'email')` — changes the DB projection but "not the TypeScript type. … Read a field you did not name and you get `undefined`."
  - `.include('author')` — reference relations only, no callback on Mongo; a related doc's `_id` comes back as an `ObjectId` **object** (wrap in `String(...)` to compare).
  - `.variant('article')` — polymorphic discriminator narrowing.
- **No `count()` method.** Count is a two-step pipeline:

```ts
const built = db.query.from('posts').count('total').build();
const runtime = await db.runtime();
const [counted] = await runtime.query(built); // counted.total
```

- Aggregations/groupBy: `db.query.from('posts').group((f) => ({ _id: f.kind, postCount: acc.count(), latest: acc.max(f.createdAt) })).sort({ postCount: -1 }).build()` → `(await db.runtime()).query(plan).toArray()` (`acc` from `@prisma/orm-mongo/query-builder`). ObjectId filters in the pipeline builder need `.match((f) => f.authorId.eq(new MongoParamRef(new ObjectId(id))))` or a raw command — a plain string silently matches nothing.

## 5. Writes — exact behaviors (rc.17)

Source: https://www.prisma.io/docs/orm/reference/orm-client (Write methods). All mutations except `create` require a `.where()` first; without one they throw `ORM.WHERE_MISSING`. `.where({})` does NOT satisfy it — to change everything, pass `MongoFieldFilter.isNotNull('_id')`. On MongoDB a write chain rejects `orderBy()`/`limit()`/`offset()`, and every write except `updateAll()`/`deleteAll()` rejects `include()` (`ORM.OPERATION_UNSUPPORTED`).

| Method | Signature → return | Mongo notes |
|---|---|---|
| `create(obj)` | `Row` | Single doc. `_id` is the only field you may omit; write `null` for empty. Returns the document as stored, server-assigned `_id` included, **not** re-queried. Bad value → `RUNTIME.ENCODE_FAILED` before writing. **Nested `create()`/`connect()` are not available on MongoDB** ("Nested `create()` and `connect()` are not available on MongoDB"). |
| `createAll(rows)` | `AsyncIterableResult<Row>` | Bulk insert. Mongo takes **only** the rows (no `onConflict`; a second arg is a type error). |
| `createAndCount(rows)` | `number` | v6 `createMany` equivalent (returns count, not `{count}`). |
| `update(obj \| (u) => [ops])` | `Row \| null` | Needs `.where()` first. `null` if none matched. Variant-declared fields need `// @ts-expect-error` on the line above. |
| `updateAll(obj \| (u) => [ops])` | `AsyncIterableResult<Row>` | Not a single op: a doc that starts matching mid-run is updated but not returned; concurrent changes give you their version back. |
| `updateAndCount(...)` | `number` | On Mongo, counts only docs actually changed (already-equal docs are not counted). |
| `delete()` | `Row \| null` | Needs `.where()`. |
| `deleteAll()` | `AsyncIterableResult<Row>` | Deletes all matching before yielding the first row. |
| `deleteAndCount()` | `number` | Returns `0` when none match. |
| `upsert({ create, update })` | `Row` | **Call `.where()` first on Mongo** — the filter picks the doc to update. On insert, a field present in both `create` and `update` takes the **`update`** value. Returned `_id` is a hex string, not an ObjectId. `conflictOn` is PostgreSQL-only. |

Field-update operations callback (Mongo only) — exactly **eight** ops exist: `set`, `unset`, `inc`, `mul`, `push`, `pull`, `addToSet`, `pop`. No `min`/`max`/`rename`/`currentDate`. Dot path inside embedded objects via `u('address.city').set(...)` (not usable in `upsert`'s update callback — set the whole embedded object instead).

```ts
const updated = await db.orm.users
  .where({ _id: userId })
  .update((u) => [u.bio.set('Now with a bio'), u.name.set('Bob R.')]);
const incremented = await db.orm.posts.variant('tutorial')
  .where({ _id: tutorialId })
  // @ts-expect-error duration is a Tutorial field, not a Post field
  .update((u) => [u.duration.inc(10)]);
```

Related-write pattern on Mongo (**no `connectOrCreate` in ORM 8 anywhere**; confirmed unavailable in "Not available yet"). Manual two-step / read-then-write:

```ts
// 1) create/lookup the related doc
const author = await db.orm.users.create({
  name: 'Carol', email: 'carol@example.com', bio: null, role: 'reader', address: null,
});
// or: const author = await db.orm.users.where({ email }).upsert({ create: {...}, update: {} });

// 2) write the child with the FK yourself (author._id is a hex string; it is accepted for ObjectId fields)
const post = await db.orm.posts.create({
  title: 'Hello', content: 'body', kind: 'article',
  authorId: author._id,
  createdAt: new Date(),
});
// For updates: db.orm.posts.where({ authorId }).updateAll({ ... })  — not atomic; use driver sessions if it must be.
```

## 6. `id` / `@db.ObjectId` values — string or ObjectId instance?

- A document's **own `_id`** comes back as a **hex string** (`create`, reads, `upsert`; e.g. `'6abca6a1e7a9bb8d8c716f65'`).
- A related doc's `_id` loaded via `include()` comes back as an **`ObjectId` instance** → compare with `String(posts[0].author._id)`.
- Raw queries (`db.raw.*`) return **native BSON**: `_id` is a real `ObjectId` (driver instance); filters take real `ObjectId`s as built by the `mongodb` package.
- ORM filters accept "a hex string or an `ObjectId` for an `ObjectId` field".
- `prisma6Schema` read of a v6 `Bytes @db.ObjectId` field: reads as a 24-digit hex string; takes a hex string or `ObjectId`, **not** a `Buffer`/`Uint8Array`.

## 7. Duplicate-key detection (no P2002 in ORM 8)

From https://www.prisma.io/docs/orm/fundamentals/writing-data (error handling):

> "On MongoDB the driver throws its own error, and a duplicate key gives you an error whose `error.code` is `11000`."

```ts
try {
  await db.orm.users.create({ email: 'x@y.com', /* ... */ });
} catch (error) {
  if ((error as { code?: number }).code === 11000) {
    // duplicate key (unique index violation)
  }
}
```

- No `P2002`-style codes exist. Prisma ORM's own errors use string codes (`RUNTIME.*`, `ORM.*`); driver errors pass through unchanged (numeric `code`). Postgres analog is `error.sqlState === '23505'`.

## 8. `db.raw` + raw commands

- `db.raw.collection('posts').aggregate<Row>([...]).build()` → `(await db.runtime()).query(plan)`; writes return a one-element array (`const [result] = ...`).
- Nine raw collection methods: `aggregate`, `insertOne`, `insertMany`, `updateOne`, `updateMany` (doc or pipeline form), `deleteOne`, `deleteMany`, `findOneAndUpdate({ upsert })`, `findOneAndDelete`.
- Write results use driver key names: `{ insertedId }`, `{ insertedCount, insertedIds }`, `{ matchedCount, modifiedCount, upsertedCount, upsertedId }`, `{ deletedCount }`.
- Need sort / returnDocument on findOneAndUpdate → `new RawFindOneAndUpdateCommand(collection, filter, update, upsert?, sort?, returnDocument?)` from `@prisma/orm-mongo/query-ast/execution`, run via `db.query.rawCommand(command)`. Manual counter upsert pattern documented (findOneAndUpdate returns pre-update doc).
- `$runCommandRaw` replacement: share a `MongoClient` (`mongoClient` option) and call `mongoClient.db(name).command(...)` — one pool for typed ORM + arbitrary commands.
- Raw reads/writes scoped to one collection can also go through `db.query.rawCommand(...)`.

## 9. Batching

- Writes: `createAll` / `updateAll` / `deleteAll` (AsyncIterableResult of rows) and `createAndCount` / `updateAndCount` / `deleteAndCount` (number). Raw `insertMany` for driver-level bulk.
- Reads: `AsyncIterableResult` supports `for await` streaming; there is **no** Postgres-style `cursor: { batchSize }` option on Mongo.
- `updateAll()` is explicitly NOT one operation on Mongo (see table) — for atomicity use the driver's `session.withTransaction(...)` with a shared `mongoClient` (no `db.transaction()` for MongoDB in Prisma ORM; every op in the session must get `{ session }`).

Sources: orm-client.md, transactions-and-runtime.md (MongoDB sections), raw-queries.md (MongoDB raw commands), writing-data.md, upgrade guide mongodb.md, prisma/orm v8.0.0-rc.17 release notes.
