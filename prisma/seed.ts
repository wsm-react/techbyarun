import 'dotenv/config';
import bcrypt from 'bcrypt';
import prisma from '../src/config/database';
import { Prisma } from '../src/generated/prisma/client';

// ---------------------------------------------------------------------------
// Users (admin + demo authors). Passwords are stored as bcrypt hashes.
// ---------------------------------------------------------------------------
const ADMIN = { email: 'arun99178@gmail.com', name: 'Arun Kumar Gupta', password: 'password123' };

async function upsertUser(user: { email: string; name: string; password: string; role?: string }) {
    const passwordHash = await bcrypt.hash(user.password, 12);
    return prisma.user.upsert({
        where: { email: user.email },
        create: {
            email: user.email,
            name: user.name,
            password: passwordHash,
            mobile: null,
            role: user.role ?? 'user',
        },
        update: {}, // Keep existing users untouched on re-run (including password + role)
    });
}

// ---------------------------------------------------------------------------
// Site settings — the "admin preferences". Edit at runtime via:
//   PUT /api/v1/site-settings/[key]   (admin session required)
// ---------------------------------------------------------------------------
const siteSettings: { key: string; value: Prisma.InputJsonValue }[] = [
    {
        key: 'home.hero',
        value: {
            badge: 'Design · Development · Branding',
            headingPrefix: 'Building Digital',
            headingAccent: 'Experiences',
            headingSuffix: 'That Inspire',
            subtitle: 'I design and build purposeful digital products — from brand identity and UX design to full-stack web development. Let’s create something great together.',
            primaryCta: { label: 'Start a Project', href: '/contact-us' },
            secondaryCta: { label: 'View Case Studies', href: '/case-study' },
        },
    },
    {
        key: 'home.servicesHeading',
        value: { title: 'What I Do' },
    },
    {
        key: 'home.ctaStrip',
        value: {
            heading: 'Ready to work together?',
            text: 'Check out my projects, read the blog, or get in touch directly.',
            links: [
                { label: 'View Projects', href: '/projects' },
                { label: 'About Me', href: '/about-me' },
                { label: 'Contact Us', href: '/contact-us', primary: true },
            ],
        },
    },
    {
        key: 'services.pageHeader',
        value: {
            badge: 'Services',
            headingPrefix: 'What I',
            headingAccent: 'Offer',
            headingSuffix: '',
            intro: 'End-to-end digital services — from brand strategy through design to production-ready code.',
        },
    },
    {
        key: 'projects.pageHeader',
        value: {
            badge: 'Projects',
            headingPrefix: 'Selected',
            headingAccent: 'Work',
            headingSuffix: '',
            intro: 'A curated collection of projects spanning branding, design systems, and full-stack web development.',
        },
    },
    {
        key: 'projects.cta',
        value: {
            heading: 'Have a project in mind?',
            text: 'Let’s talk about how I can help bring it to life.',
            ctaLabel: 'Start a Conversation',
            ctaHref: '/contact-us',
        },
    },
    {
        key: 'caseStudy.pageHeader',
        value: {
            badge: 'Case Studies',
            headingPrefix: 'Work in',
            headingAccent: 'Detail',
            headingSuffix: '',
            intro: 'A deeper look at selected projects — the problem, process, and outcome.',
        },
    },
    {
        key: 'blog.pageHeader',
        value: {
            badge: 'Blog',
            headingPrefix: 'Thoughts &',
            headingAccent: 'Insights',
            headingSuffix: '',
            intro: 'Articles on design, development, branding, and building digital products.',
        },
    },
    {
        key: 'about.profile',
        value: {
            badge: 'About Me',
            headingPrefix: 'Hi, I’m',
            headingAccent: 'Arun',
            headingSuffix: '',
            intro: 'A full-stack developer and designer passionate about building clean, performant digital products. I work across the full spectrum — from branding and UX to code and deployment.',
            bio: [
                'With years of experience crafting web applications and digital brands, I help businesses and individuals turn ideas into products that people love to use.',
                'My work spans across startup MVPs, enterprise dashboards, e-commerce platforms, and brand identity systems. I care deeply about the details — both in design and in code.',
                'When I’m not building, I write about design, development, and the intersection of creativity and technology on my blog.',
            ],
            skillsTitle: 'Skills & Tools',
            skills: [
                'React / Next.js', 'TypeScript', 'Node.js', 'Prisma & MySQL',
                'Figma & UX Design', 'Tailwind CSS', 'Firebase', 'REST APIs',
            ],
            cta: {
                heading: 'Want to collaborate?',
                text: 'Let’s build something meaningful together.',
                primaryLabel: 'Get in Touch',
                primaryHref: '/contact-us',
                secondaryLabel: 'View Projects',
                secondaryHref: '/projects',
            },
        },
    },
    {
        key: 'coffee.pageHeader',
        value: {
            badge: 'Coffee with me',
            headingPrefix: 'Let’s make something',
            headingAccent: 'astounding',
            headingSuffix: 'together.',
            intro: 'Grab a virtual coffee and tell me about your idea — a project, a collaboration, or just a good conversation about design, code, and everything in between.',
            points: [
                '30-minute virtual call',
                'Design, code & ideas',
                'Zero pressure, zero pitch',
            ],
        },
    },
    {
        key: 'coffee.cta',
        value: { label: '☕ Schedule a coffee chat', href: '/contact-us' },
    },
];

// ---------------------------------------------------------------------------
// Services (list cards + full detail pages)
// ---------------------------------------------------------------------------
const services: Prisma.ServiceCreateInput[] = [
    {
        slug: 'branding',
        title: 'Branding',
        tag: 'Identity · Strategy · Design',
        description: 'From naming and strategy to logo systems and brand guidelines — I help you build brands that stand out and stay consistent.',
        badge: 'Services · Branding',
        heading: 'Brand Identity Design',
        headingAccent: 'Identity',
        intro: 'A strong brand is your most valuable asset. I help businesses craft identities that are memorable, consistent, and built for growth.',
        sections: [
            {
                type: 'paragraphs',
                items: [
                    'Great branding starts with strategy. Before picking a colour or drawing a shape, I dive deep into your business — understanding your audience, market position, and values.',
                    'From there I create a visual identity that communicates your story clearly across every touchpoint: digital, print, and beyond.',
                ],
            },
            {
                type: 'bullets',
                title: 'What You Get',
                items: [
                    'Brand Strategy & Positioning',
                    'Logo Design & Identity System',
                    'Typography & Colour Palette',
                    'Brand Guidelines Document',
                    'Business Card & Stationery',
                    'Social Media Kit',
                ],
            },
        ],
        ctaLabel: 'Start a Branding Project',
        sortOrder: 1,
        published: true,
    },
    {
        slug: 'development',
        title: 'Development',
        tag: 'Next.js · TypeScript · Full-Stack',
        description: 'Performant, accessible web applications built with modern tooling. From landing pages to complex dashboards and APIs.',
        badge: 'Services · Development',
        heading: 'Web Development',
        headingAccent: 'Development',
        intro: 'Fast, accessible, and scalable web applications — from marketing sites to full-stack SaaS products — built with modern technology.',
        sections: [
            {
                type: 'paragraphs',
                items: [
                    'I specialise in building with the Next.js App Router, TypeScript, and Prisma. Whether you need a landing page, a complex dashboard, or a full API backend, I deliver clean, maintainable code.',
                    'Every project is built with performance, accessibility, and SEO best practices in mind — and deployed to production with CI/CD pipelines on Vercel.',
                ],
            },
            {
                type: 'chips',
                title: 'Tech Stack',
                items: [
                    'Next.js & React', 'TypeScript', 'Tailwind CSS', 'Prisma & MySQL',
                    'Firebase', 'REST & API Design', 'NextAuth', 'Vercel Deployment',
                ],
            },
        ],
        ctaLabel: 'Start a Dev Project',
        sortOrder: 2,
        published: true,
    },
    {
        slug: 'ux-design',
        title: 'UX Design',
        tag: 'Research · Wireframes · Prototypes',
        description: 'User-centred design grounded in research. I map journeys, build wireframes, and create prototypes that validate ideas fast.',
        badge: 'Services · UX Design',
        heading: 'UX Design',
        headingAccent: 'Design',
        intro: 'Products that work beautifully for the people who use them. I design experiences grounded in research, not assumptions.',
        sections: [
            {
                type: 'steps',
                title: 'My Process',
                items: [
                    { step: '01', title: 'Discovery', desc: 'Understanding your users, goals, and business constraints through research and stakeholder interviews.' },
                    { step: '02', title: 'Mapping', desc: 'User journey mapping, information architecture, and flow diagrams to align the team.' },
                    { step: '03', title: 'Wireframing', desc: 'Low-fidelity wireframes to validate structure and interactions before visual design.' },
                    { step: '04', title: 'Prototyping', desc: 'High-fidelity prototypes in Figma that feel real enough to test with actual users.' },
                ],
            },
        ],
        ctaLabel: 'Start a UX Project',
        sortOrder: 3,
        published: true,
    },
    {
        slug: 'visual-design',
        title: 'Visual Design',
        tag: 'UI · Motion · Graphics',
        description: 'Polished interfaces, marketing assets, and visual systems that make your product look as good as it works.',
        badge: 'Services · Visual Design',
        heading: 'Visual Design',
        headingAccent: 'Design',
        intro: 'Beautiful, pixel-perfect visuals that communicate clearly and reinforce your brand at every touchpoint.',
        sections: [
            {
                type: 'paragraphs',
                items: [
                    'Good visual design is about clarity and emotion. I create interfaces, marketing assets, and digital graphics that stop the scroll and communicate the right message instantly.',
                    'Whether it is a product UI, a campaign landing page, or a social media kit — every pixel is intentional.',
                ],
            },
            {
                type: 'bullets',
                title: 'Deliverables',
                items: [
                    'UI Component Library',
                    'Marketing Landing Pages',
                    'Social Media Graphics',
                    'Email Templates',
                    'Presentation Design',
                    'Iconography & Illustration',
                ],
            },
        ],
        ctaLabel: 'Start a Visual Design Project',
        sortOrder: 4,
        published: true,
    },
];

// ---------------------------------------------------------------------------
// Case studies (cards on /projects + /case-study and full detail pages)
// ---------------------------------------------------------------------------
const caseStudies: Prisma.CaseStudyCreateInput[] = [
    {
        slug: 'getdownfitness',
        title: 'Get Down Fitness',
        headingAccent: 'Fitness',
        tag: 'Branding · UX · Development',
        cardTags: ['Branding', 'UX Design', 'Development'],
        projectDescription: 'A complete digital overhaul for a fitness brand — identity system, mobile-first website, and an online booking platform.',
        cardDescription: 'A complete digital transformation for a fitness studio — brand identity, mobile-first website, and an online class booking system.',
        intro: 'A full digital transformation for a boutique fitness studio — new brand identity, a mobile-first website, and an integrated class booking system.',
        serviceTags: [
            { label: 'Branding', href: '/case-study/getdownfitness/branding' },
            { label: 'UX Design', href: '/case-study/getdownfitness/ux-design' },
            { label: 'Development', href: '/case-study/getdownfitness/development' },
        ],
        highlights: [
            { label: 'Scope', value: 'Branding · UX Design · Development' },
            { label: 'Timeline', value: '8 weeks' },
            { label: 'Platform', value: 'Web (Next.js)' },
            { label: 'Outcome', value: '+220% online bookings in 60 days' },
        ],
        sections: [
            {
                heading: 'The Challenge',
                body: 'Get Down Fitness had no online presence. New members were sourced entirely through word of mouth, and class bookings were managed by phone — creating friction and lost revenue.',
            },
            {
                heading: 'The Process',
                body: 'We started with a brand workshop to define their voice and values. From there I developed a visual identity, designed the full user experience in Figma, and built the website with Next.js and a custom booking API.',
            },
            {
                heading: 'The Result',
                body: 'Within 60 days of launch, online bookings increased by 220%. The brand now has a consistent identity across web, social media, and in-studio materials.',
            },
        ],
        ctaLabel: 'Start a Similar Project',
        sortOrder: 1,
        published: true,
    },
    {
        slug: 'schoolinfotech',
        title: 'School Info Tech',
        headingAccent: 'Info Tech',
        tag: 'Web Design · Development',
        cardTags: ['Web Design', 'Development'],
        projectDescription: 'An information portal and management system for a network of educational institutions across multiple campuses.',
        cardDescription: 'A multi-campus educational portal with admin dashboards, student records, and announcement management.',
        intro: 'A multi-campus educational information system — student records, staff dashboards, announcements, and a public-facing portal.',
        serviceTags: [
            { label: 'Web Design', href: '/case-study/schoolinfotech/web-design' },
            { label: 'Development', href: '/case-study/schoolinfotech/development' },
        ],
        highlights: [
            { label: 'Scope', value: 'Web Design · Development' },
            { label: 'Timeline', value: '12 weeks' },
            { label: 'Platform', value: 'Web App (Next.js)' },
            { label: 'Outcome', value: 'Serving 5 campuses, 3k+ users' },
        ],
        sections: [
            {
                heading: 'The Challenge',
                body: 'The institution was managing student data across spreadsheets and paper forms across five campuses. Communication was inconsistent and there was no centralised record system.',
            },
            {
                heading: 'The Process',
                body: 'I conducted stakeholder interviews across campuses to map the existing workflows, then designed a unified data model in Prisma. The admin UI was built with Next.js and role-based access control.',
            },
            {
                heading: 'The Result',
                body: 'A centralised platform now serves all five campuses, with over 3,000 active users. Admin workload for data entry dropped by over 60%.',
            },
        ],
        ctaLabel: 'Start a Similar Project',
        sortOrder: 2,
        published: true,
    },
    {
        slug: 'ux-design',
        title: 'UX Design System',
        headingAccent: 'System',
        tag: 'UX Design',
        cardTags: ['UX Design', 'Figma'],
        projectDescription: 'A comprehensive design system and component library built for a SaaS product, improving design-to-development handoff.',
        cardDescription: 'A scalable design system built for a SaaS product — components, tokens, guidelines, and Figma libraries.',
        intro: 'A comprehensive, token-based design system for a SaaS product — built to accelerate design and eliminate inconsistency across a growing product team.',
        serviceTags: [
            { label: 'UX Design', href: '/case-study/ux-design/ux-design' },
            { label: 'Design System', href: '/case-study/ux-design/design-system' },
            { label: 'Figma', href: '/case-study/ux-design/figma' },
        ],
        highlights: [
            { label: 'Scope', value: 'UX Design · Design System' },
            { label: 'Timeline', value: '6 weeks' },
            { label: 'Tools', value: 'Figma · FigJam' },
            { label: 'Outcome', value: 'Dev handoff time cut by 40%' },
        ],
        sections: [
            {
                heading: 'The Challenge',
                body: 'A fast-growing SaaS team was designing and building the same components over and over — inconsistently. No shared language between designers and engineers led to costly rework.',
            },
            {
                heading: 'The Process',
                body: 'I audited the existing product, catalogued every component variant, and established a token system for colour, typography, and spacing. The resulting Figma library was documented and handed off with an interactive prototype.',
            },
            {
                heading: 'The Result',
                body: 'Design-to-development handoff time decreased by 40%. The team now ships new features in a fraction of the previous time with full visual consistency.',
            },
        ],
        ctaLabel: 'Start a UX Project',
        sortOrder: 3,
        published: true,
    },
    {
        slug: 'visual-design',
        title: 'Visual Design Campaign',
        headingAccent: 'Campaign',
        tag: 'Visual Design',
        cardTags: ['Visual Design', 'Branding'],
        projectDescription: 'Marketing materials, social assets, and brand collateral created for a product launch campaign.',
        cardDescription: 'Marketing collateral and digital assets for a product launch — social, email, and landing pages.',
        intro: 'A full suite of marketing and launch assets for a product go-to-market — social graphics, email templates, landing pages, and print collateral.',
        serviceTags: [
            { label: 'Visual Design', href: '/case-study/visual-design/visual-design' },
            { label: 'Branding', href: '/case-study/visual-design/branding' },
            { label: 'Campaign', href: '/case-study/visual-design/campaign' },
        ],
        highlights: [
            { label: 'Scope', value: 'Visual Design · Branding' },
            { label: 'Timeline', value: '4 weeks' },
            { label: 'Deliverables', value: '80+ assets' },
            { label: 'Outcome', value: 'Product launch on schedule' },
        ],
        sections: [
            {
                heading: 'The Challenge',
                body: 'A product team had a tight launch window with no design resources. They needed 80+ production-ready assets across multiple channels — in four weeks.',
            },
            {
                heading: 'The Process',
                body: 'I established a visual language from their brand guide and then systematically produced assets in Figma — starting with the highest-impact items (landing page, hero email) and working outward to social and print.',
            },
            {
                heading: 'The Result',
                body: 'The product launched on schedule with a cohesive, professional visual presence across all channels. The landing page converted at 3.4% from paid traffic.',
            },
        ],
        ctaLabel: 'Start a Visual Design Project',
        sortOrder: 4,
        published: true,
    },
];

// ---------------------------------------------------------------------------
// Blog posts — the four featured articles + legacy demo posts
// ---------------------------------------------------------------------------
type SeedPost = {
    slug: string;
    title: string;
    subTitle: string;
    tag: string;
    body: string;
    published: boolean;
    createdAt?: Date;
    authorEmail: string;
};

const featuredPosts: SeedPost[] = [
    {
        slug: 'why-ux-matters',
        title: 'Why UX Matters More Than Ever',
        subTitle: 'Great products are built around the people who use them. Here is why investing in UX is the highest-ROI decision you can make.',
        tag: 'Design',
        published: true,
        createdAt: new Date('2026-04-10T10:00:00.000Z'),
        authorEmail: 'arun99178@gmail.com',
        body: `Great products are built around the people who use them. When you invest in UX, you invest in clarity: fewer support tickets, higher conversion, and customers who come back.

Good UX starts with research. Talk to real users, observe where they struggle, and map their journey before you open a design tool. Assumptions are expensive; evidence is cheap.

The highest-ROI UX work is rarely the prettiest. It is the clear navigation, the obvious next step, the error message that actually helps. Those details compound — and your users feel them immediately.`,
    },
    {
        slug: 'nextjs-app-router',
        title: 'Mastering the Next.js App Router',
        subTitle: 'A deep dive into layouts, route groups, server components, and data fetching patterns in the Next.js App Router.',
        tag: 'Development',
        published: true,
        createdAt: new Date('2026-03-28T10:00:00.000Z'),
        authorEmail: 'arun99178@gmail.com',
        body: `The App Router changed how we structure Next.js applications. Layouts, route groups, and nested segments let you express the shape of your product directly in the file system.

Server Components are the biggest shift. Data fetching moves closer to where the data is rendered, and the client bundle only carries what truly needs interactivity. Start server-first, and reach for client components deliberately.

A practical workflow: group routes by shared chrome with route groups, fetch data in server components, and push interactive islands to the leaves of the tree. Combined with caching and streaming, this architecture scales from a landing page to a full application.`,
    },
    {
        slug: 'branding-for-startups',
        title: 'Branding for Startups: Where to Start',
        subTitle: 'Building a brand is more than a logo. Learn the fundamentals of brand strategy, voice, and visual identity for early-stage teams.',
        tag: 'Branding',
        published: true,
        createdAt: new Date('2026-03-14T10:00:00.000Z'),
        authorEmail: 'arun99178@gmail.com',
        body: `Building a brand is more than a logo. It is the answer to three questions: who you are for, what you believe, and why anyone should care.

Start with positioning, not visuals. Write down the one-sentence promise you make to customers. Everything else — the voice, the palette, the type — should reinforce that sentence.

Only then design the identity: a clear system of logo, colour, and typography with rules for how they behave across touchpoints. A small, consistent system beats a big, inconsistent one every time.`,
    },
    {
        slug: 'prisma-mongodb',
        title: 'Using Prisma with MongoDB in Next.js',
        subTitle: 'A practical guide to setting up Prisma with a MongoDB Atlas database inside a Next.js project — including schema design and CRUD operations.',
        tag: 'Development',
        published: true,
        createdAt: new Date('2026-02-20T10:00:00.000Z'),
        authorEmail: 'arun99178@gmail.com',
        body: `A practical guide to setting up Prisma with a MongoDB Atlas database inside a Next.js project — including schema design and CRUD operations.

Start with the schema: model your documents close to how your API returns them. Prisma gives you type-safe queries and a single client to reuse across route handlers and server components.

From there, CRUD operations map cleanly to your route handlers: read with filtered queries, create with validated payloads, update with scoped writes, and delete with guarded permissions. A single client, a single source of truth.`,
    },
];

const legacyPosts: SeedPost[] = [
    {
        slug: 'is-normal-blog',
        title: 'This is blog title 1',
        subTitle: 'This is blog subtitle 1',
        tag: 'General',
        body: 'This is blog body 1',
        published: true,
        authorEmail: 'arun99178@gmail.com',
    },
    {
        slug: 'this-is-another-blog',
        title: 'This is blog title 2',
        subTitle: 'This is blog subtitle 2',
        tag: 'General',
        body: 'This is blog body 2',
        published: true,
        authorEmail: 'john@example.com',
    },
    {
        slug: 'this-is-yet-another-blog',
        title: 'This is blog title 3',
        subTitle: 'This is blog subtitle 3',
        tag: 'General',
        body: 'This is blog body 3',
        published: true,
        authorEmail: 'alice@example.com',
    },
];

// ---------------------------------------------------------------------------
// Seeding
// ---------------------------------------------------------------------------
async function seedSiteSettings() {
    console.log('Seeding site settings ...');
    for (const setting of siteSettings) {
        await prisma.siteSetting.upsert({
            where: { key: setting.key },
            create: { key: setting.key, value: setting.value },
            update: {}, // Keep admin edits on re-run
        });
    }
    console.log(`  ${siteSettings.length} settings ready`);
}

async function seedServices() {
    console.log('Seeding services ...');
    for (const service of services) {
        const row = await prisma.service.upsert({
            where: { slug: service.slug },
            create: service,
            update: {}, // Keep admin edits on re-run
        });
        console.log(`  service: ${row.slug}`);
    }
}

async function seedCaseStudies() {
    console.log('Seeding case studies ...');
    for (const caseStudy of caseStudies) {
        const row = await prisma.caseStudy.upsert({
            where: { slug: caseStudy.slug },
            create: caseStudy,
            update: {}, // Keep admin edits on re-run
        });
        console.log(`  case study: ${row.slug}`);
    }
}

async function seedPosts(authorsByEmail: Record<string, string>) {
    console.log('Seeding blog posts ...');
    for (const post of [...featuredPosts, ...legacyPosts]) {
        const authorId = authorsByEmail[post.authorEmail];
        if (!authorId) {
            console.warn(`  skipping ${post.slug}: no author for ${post.authorEmail}`);
            continue;
        }

        const row = await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: {}, // Keep admin edits on re-run
            create: {
                slug: post.slug,
                title: post.title,
                subTitle: post.subTitle,
                tag: post.tag,
                body: post.body,
                published: post.published,
                authorId,
                ...(post.createdAt ? { createdAt: post.createdAt } : {}),
            },
        });
        console.log(`  post: ${row.slug}`);
    }
}

async function seedingPrismaData() {
    console.log('Start Seeding .... ');

    console.log('Seeding users ...');
    const admin = await upsertUser({ ...ADMIN, role: 'admin' });
    console.log(`  admin: ${admin.email}`);
    const john = await upsertUser({ email: 'john@example.com', name: 'John Doe', password: 'securePassword' });
    const alice = await upsertUser({ email: 'alice@example.com', name: 'Alice Smith', password: 'password321' });

    await seedSiteSettings();
    await seedServices();
    await seedCaseStudies();
    await seedPosts({
        [ADMIN.email]: admin.id,
        [john.email]: john.id,
        [alice.email]: alice.id,
    });

    console.log('End Seeding .... ');
}

seedingPrismaData()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
