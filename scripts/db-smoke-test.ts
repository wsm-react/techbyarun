import 'dotenv/config';
import prisma from '../src/config/database';

// End-to-end smoke test for the database layer (run: npx tsx scripts/db-smoke-test.ts)
async function run() {
    console.log('--- DB smoke test ---');

    // 1. Seeded content counts
    const [users, services, studies, settings, posts] = await Promise.all([
        prisma.user.count(),
        prisma.service.count(),
        prisma.caseStudy.count(),
        prisma.siteSetting.count(),
        prisma.blogPost.count(),
    ]);
    console.log(`counts -> users: ${users}, services: ${services}, caseStudies: ${studies}, settings: ${settings}, posts: ${posts}`);

    // 2. Query shape used by the blog page
    const blog = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true } } },
        take: 2,
    });
    console.log('latest posts:', blog.map((p) => `${p.slug} by ${p.author?.name ?? 'unknown'}`).join(' | '));

    // 3. Data used by the case study tag pages
    const study = await prisma.caseStudy.findUnique({ where: { slug: 'getdownfitness' } });
    console.log('getdownfitness serviceTags:', JSON.stringify(study?.serviceTags));

    // 4. Full CRUD round-trip on a scratch record (create -> read -> update -> delete)
    const scratchSlug = `zz-smoke-test-${Date.now()}`;

    const created = await prisma.service.create({
        data: { slug: scratchSlug, title: 'Smoke Test Service', published: false },
    });
    console.log('create ok:', Boolean(created.id));

    const read = await prisma.service.findUnique({ where: { slug: scratchSlug } });
    console.log('read ok:', read?.id === created.id);

    const updated = await prisma.service.update({
        where: { id: created.id },
        data: { title: 'Smoke Test Service (updated)' },
    });
    console.log('update ok:', updated.title.endsWith('(updated)'));

    await prisma.service.delete({ where: { id: created.id } });
    const gone = await prisma.service.findUnique({ where: { slug: scratchSlug } });
    console.log('delete ok:', gone === null);

    console.log('--- SMOKE TEST PASSED ---');
}

run()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('SMOKE TEST FAILED:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
