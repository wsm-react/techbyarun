import Link from 'next/link';

const posts = [
    {
        slug: 'why-ux-matters',
        title: 'Why UX Matters More Than Ever',
        date: 'April 10, 2026',
        tag: 'Design',
        excerpt: 'Great products are built around the people who use them. Here is why investing in UX is the highest-ROI decision you can make.',
    },
    {
        slug: 'nextjs-app-router',
        title: 'Mastering the Next.js App Router',
        date: 'March 28, 2026',
        tag: 'Development',
        excerpt: 'A deep dive into layouts, route groups, server components, and data fetching patterns in the Next.js App Router.',
    },
    {
        slug: 'branding-for-startups',
        title: 'Branding for Startups: Where to Start',
        date: 'March 14, 2026',
        tag: 'Branding',
        excerpt: 'Building a brand is more than a logo. Learn the fundamentals of brand strategy, voice, and visual identity for early-stage teams.',
    },
    {
        slug: 'prisma-mongodb',
        title: 'Using Prisma with MongoDB in Next.js',
        date: 'February 20, 2026',
        tag: 'Development',
        excerpt: 'A practical guide to setting up Prisma with a MongoDB Atlas database inside a Next.js project — including schema design and CRUD operations.',
    },
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Header */}
            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    Blog
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Thoughts & <span className="text-primary">Insights</span>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    Articles on design, development, branding, and building digital products.
                </p>
            </section>

            {/* Post list */}
            <section className="mx-auto max-w-4xl px-6 pb-24 space-y-6">
                {posts.map(({ slug, title, date, tag, excerpt }) => (
                    <Link
                        key={slug}
                        href={`/blog/${slug}`}
                        className="group block rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary hover:shadow-md"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">{tag}</span>
                            <span className="text-xs text-muted-foreground">{date}</span>
                        </div>
                        <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">{title}</h2>
                        <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
                    </Link>
                ))}
            </section>

        </main>
    );
}
