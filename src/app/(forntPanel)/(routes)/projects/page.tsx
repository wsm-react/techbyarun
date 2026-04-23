import Link from 'next/link';

const projects = [
    {
        title: 'Get Down Fitness',
        tag: 'Branding · UX · Development',
        desc: 'A complete digital overhaul for a fitness brand — identity system, mobile-first website, and an online booking platform.',
        href: '/case-study/getdownfitness',
        cta: 'View Case Study',
    },
    {
        title: 'School Info Tech',
        tag: 'Web Design · Development',
        desc: 'An information portal and management system for a network of educational institutions across multiple campuses.',
        href: '/case-study/schoolinfotech',
        cta: 'View Case Study',
    },
    {
        title: 'UX Design System',
        tag: 'UX Design',
        desc: 'A comprehensive design system and component library built for a SaaS product, improving design-to-development handoff.',
        href: '/case-study/ux-design',
        cta: 'View Case Study',
    },
    {
        title: 'Visual Design Suite',
        tag: 'Visual Design',
        desc: 'Marketing materials, social assets, and brand collateral created for a product launch campaign.',
        href: '/case-study/visual-design',
        cta: 'View Case Study',
    },
];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Header */}
            <section className="mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    Projects
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Selected <span className="text-primary">Work</span>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    A curated collection of projects spanning branding, design systems, and full-stack web development.
                </p>
            </section>

            {/* Grid */}
            <section className="mx-auto max-w-5xl px-6 pb-24 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {projects.map(({ title, tag, desc, href, cta }) => (
                    <div
                        key={title}
                        className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary hover:shadow-md"
                    >
                        <div>
                            <span className="text-xs font-medium text-primary">{tag}</span>
                            <h2 className="mt-2 text-xl font-semibold group-hover:text-primary transition-colors">{title}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                        </div>
                        <Link
                            href={href}
                            className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline"
                        >
                            {cta} →
                        </Link>
                    </div>
                ))}
            </section>

            {/* CTA */}
            <section className="border-t border-border">
                <div className="mx-auto max-w-5xl px-6 py-16 text-center">
                    <h2 className="text-2xl font-bold">Have a project in mind?</h2>
                    <p className="mt-2 text-muted-foreground">Let&apos;s talk about how I can help bring it to life.</p>
                    <Link href="/contact-us" className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Start a Conversation
                    </Link>
                </div>
            </section>

        </main>
    );
}
