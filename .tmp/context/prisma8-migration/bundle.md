# Task Bundle: Prisma 6 → Prisma ORM 8 (MongoDB RC) call-site migration

## Mission
Rewrite all Prisma call sites in the listed files from the Prisma 6 client API (`appDB.<model>.<op>({ where, data, select })`) to the new **`@prisma/orm-mongo` 8.0.0-rc.17** API (`appDB.orm.<Model>.where(...).<op>()`).

**The runtime client already exists** at `src/config/database.ts` (default export `appDB`, module-level `mongo<Contract>` singleton). The generated contract lives at `prisma/contract.json` + `prisma/contract.d.ts` — **it is the source of truth for collection and field names**. Do NOT edit `src/config/database.ts`, `prisma.config.ts`, or `prisma/schema.prisma`.

## Ground rules
1. ONLY modify the files listed in "Files to change". Do not touch anything else.
2. **Use storage field names** (from contract.json) in every filter, create, and update payload — they are snake_case for mapped fields (e.g. `created_at`, `current_ctc`, `sub_title`).
3. Preserve every API response shape (status codes, `success`, `status`, `message`, `data`) except where explicitly told to adapt. BSON `ObjectId` instances must be converted with `String(...)` only for **included relation `_id`s**; own-document `_id` is already a hex string.
4. Existing `// @ts-ignore` / `// @ts-nocheck` comments around old `{ data: ... }` wrappers can be removed where the wrapper is removed.
5. No new dependencies. `crypto.randomUUID()` is available (Node built-in, global `crypto`).
6. Optional/nullable fields: if `tsc` complains that a field is required on create, pass `null` explicitly for absent values (the "write null for empty" rule). Never pass `undefined`.

## API mapping (v6 → v8)
| v6 | v8 rc.17 |
|---|---|
| `appDB.user.findUnique({ where: { email } })` | `appDB.orm.User.where({ email }).first()` |
| `appDB.career.findFirst({ where: { email } })` | `appDB.orm.Career.where({ email }).first()` |
| `appDB.user.create({ data: X, select: Y })` | `appDB.orm.User.create(X)` then map response fields manually |
| `appDB.career.update({ where: W, data: D })` | `appDB.orm.Career.where(W).update(D)` |
| `appDB.blogPost.findMany({ where, select, orderBy })` | `.where(...).orderBy({ created_at: -1 }).include('author').all()` — then map to old shape (see blog file) |
| `appDB.$disconnect()` | `await appDB.close()` (not used in these files) |

- `.where({...})` = plain equality only, implicit AND.
- `.first()` → row or null. `.all()` → awaitable array.
- `.update()` requires `.where()` first; returns the updated row or null.
- NO `select` on create. NO nested writes anywhere.
- Duplicate-key errors: `(error as any).code === 11000` (no P2002 anywhere).

## Storage-name maps (camelCase client → storage)
**Career**: `experience` → `experience_years`; `currentCTC` → `current_ctc`; `expectedCTC` → `expected_ctc`; `noticePeriod` → `notice_period`; `resumeUri` → `resume_uri`; `resumeType` → `resume_type`; `resumeName` → `resume_name`; `resumeSize` → `resume_size`; `createdAt` → `created_at`; `updatedAt` → `updated_at`. Unchanged: `id`→`_id`, `name`, `email`, `phone`, `title`, `slug`, `company`, `bio`, `portfolio`, `uuid`.
**ContectUs**: `firstName` → `first_name`; `lastName` → `last_name`; `dueDate` → `due_date`; `lookingFor` → `looking_for`; `createdAt` → `created_at`. Unchanged: `phone`, `email`, `subject`, `message`, `budget`, `address`.
**BlogPost**: `subTitle` → `sub_title`; `createdAt` → `created_at`; `updatedAt` → `updated_at`; `authorId` → `author_id`. Unchanged: `slug`, `title`, `body`, `published`.
**User**: `createdAt` → `created_at`; `updatedAt` → `updated_at`. Unchanged: `name`, `email`, `mobile`, `password`.
**Leads**: `loginTime` (unchanged); `userId` → `user_id`; `createdAt` → `created_at`.

Write a small local helper in each file where mapping is needed (e.g. `const toStorage = (d: CareerPayload) => ({...})`), or inline object literals — your choice, but keep it readable.

## Files to change (6)

### 1. `src/app/api/v1/register/route.ts`
- Replace `appDB.user.findUnique({ where: { email } })` → `appDB.orm.User.where({ email }).first()`.
- Replace the create block:
```ts
const newUser = await appDB.orm.User.create({
    name, email, mobile, password: hashedPassword,
});
```
Response `data` must stay the old shape: `{ id: newUser._id, name: newUser.name, email: newUser.email, mobile: newUser.mobile, createdAt: newUser.created_at }`.
- Keep the 409 pre-check and all status codes as-is.

### 2. `src/app/api/v1/leads/route.ts`
- `appDB.orm.User.where({ email: output.email }).first()` for the user lookup.
- Create: `appDB.orm.Leads.create({ name: output.name, email: output.email, mobile: output.mobile, user_id: user._id })` (add `loginTime: null` ONLY if tsc requires it).
- Response: `data: { id: newLead._id }`.

### 3. `src/app/api/v1/blog/route.ts`
- Replace the `findMany` with:
```ts
const posts = await appDB.orm.BlogPost
    .where({ published: true })
    .orderBy({ created_at: -1 })
    .include('author')
    .all();

const data = posts.map((p: any) => ({
    id: p._id,
    slug: p.slug,
    title: p.title,
    subTitle: p.sub_title,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    author: p.author ? { id: String(p.author._id), name: p.author.name } : null,
}));
```
Return `{ success: true, status: 200, data }`. (Old shape had `author: { id, name }` — nested `author._id` is an ObjectId instance, hence `String()`.)
- NOTE: do NOT use `.select()` (it doesn't change TS types). If `.include('author')` fails to typecheck, STOP and report — do not improvise a different join strategy.

### 4. `src/app/api/v1/contact-us/route.ts` (has `// @ts-nocheck`)
- `appDB.orm.ContectUs.where({ email: validOutput.email }).first()` for existing check; `existingEmail.createdAt` → `existingEmail.created_at`.
- Update (keep both branches): `appDB.orm.ContectUs.where({ email: validOutput.email }).update(toContectUsStorage(filterUndefinedAndNull(validOutput as ContectUsPayload)))` — write the storage-name mapping helper per the map above (`firstName→first_name`, `lastName→last_name`, `dueDate→due_date`, `lookingFor→looking_for`; drop `undefined` keys).
- Create: `appDB.orm.ContectUs.create(toContectUsStorage(newLeadData))`, where `newLeadData = filterUndefinedAndNull(validOutput)`.
- Create-branch response: keep `{ success: true, status: 201, ...newLead, id: newLead._id, message: 'New lead created for new user.' }` (adding `id` after the spread keeps the old `id` field for consumers).

### 5. `src/app/api/v1/career/route.ts`
- `findFirst` → `appDB.orm.Career.where({ email: validOutput.email }).first()`; `existingEmail.createdAt` → `existingEmail.created_at`.
- Both `update` branches: `appDB.orm.Career.where({ email: validOutput.email }).update(toCareerStorage(filterUndefinedAndNull(validOutput as CareerPayload)))`.
- Create branch: **MUST add `uuid: crypto.randomUUID()`** (the `@default(cuid())` was removed from the schema):
```ts
const newLead = await appDB.orm.Career.create({
    ...toCareerStorage(newLeadData),
    uuid: crypto.randomUUID(),
});
```
- `updatedLead.id` → `updatedLead._id` (both `dataId:` and spread usages); `updatedLead.title` stays.
- Write the `toCareerStorage` mapping helper per the map above (`experience→experience_years`, `currentCTC→current_ctc`, `expectedCTC→expected_ctc`, `noticePeriod→notice_period`, `resumeUri→resume_uri`, `resumeType→resume_type`, `resumeName→resume_name`, `resumeSize→resume_size`).

### 6. `src/app/api/v1/auth/[...nextauth]/auth-options.ts`
- `appDB.orm.User.where({ email: credentials.email }).first()`.
- In the returned object: `id: user._id` (was `user.id`). `user.email`, `user.name` unchanged.

### NOT to change
- `src/actions/career.ts` — the only `appDB.` reference there is commented out.
- `prisma/seed.ts` — handled separately by the orchestrator.

## Reference docs (read if unsure)
- `.tmp/external-context/prisma/orm-mongo-runtime-client-api-rc17.md` (full runtime API)
- `.tmp/external-context/prisma/prisma6schema-cli-seed-nextjs-rc17.md` (config/CLI/Next.js)
- `prisma/contract.json` (authoritative collection + field names; accessor `db.orm.<Model>` with PascalCase model names, no `@@map` on models)

## Verification (required)
1. Run `npx tsc --noEmit` from the repo root and iterate until clean for the files you touched (ignore pre-existing errors in files you didn't touch — report them instead).
2. Report: files changed, any conditional decisions (e.g. extra `null`s added), any escalation/uncertainty.
