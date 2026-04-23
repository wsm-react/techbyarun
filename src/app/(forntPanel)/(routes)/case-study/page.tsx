import Link from 'next/link';

const studies = [
    {
        href: '/case-study/getdownfitness',
        title: 'Get Down Fitness',
        tags: ['Branding', 'UX Design', 'Development'],
        desc: 'A complete digital transformation for a fitness studio — brand identity, mobile-first website, and an online class booking system.',
    },
    {
        href: '/case-study/schoolinfotech',
        title: 'School Info Tech',
        tags: ['Web Design', 'Development'],
        desc: 'A multi-campus educational portal with admin dashboards, student records, and announcement management.',
    },
    {
        href: '/case-study/ux-design',
        title: 'UX Design System',
        tags: ['UX Design', 'Figma'],
        desc: 'A scalable design system built for a SaaS product — components, tokens, guidelines, and Figma libraries.',
    },
    {
        href: '/case-study/visual-design',
        title: 'Visual Design Campaign',
        tags: ['Visual Design', 'Branding'],
        desc: 'Marketing collateral and digital assets for a product launch — social, email, and landing pages.',
    },
];

export default function CaseStudyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    Case Studies
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Work in <span className="text-primary">Detail</span>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    A deeper look at selected projects — the problem, process, and outcome.
                </p>
            </section>

            <section className="mx-auto max-w-5xl px-6 pb-24 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {studies.map(({ href, title, tags, desc }) => (
                    <Link
                        key={href}
                        href={href}
                        className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary hover:shadow-md"
                    >
                        <div>
                            <div className="flex flex-wrap gap-1 mb-3">
                                {tags.map((tag) => (
                                    <span key={tag} className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">{tag}</span>
                                ))}
                            </div>
                            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{title}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                        </div>
                        <span className="mt-6 inline-flex items-center text-sm font-medium text-primary">Read case study →</span>
                    </Link>
                ))}
            </section>

        </main>
    );
}
