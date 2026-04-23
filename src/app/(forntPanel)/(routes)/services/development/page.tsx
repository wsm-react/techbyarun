import Link from 'next/link';

const stack = [
    'Next.js & React', 'TypeScript', 'Tailwind CSS', 'Prisma & MongoDB',
    'Firebase', 'REST & API Design', 'NextAuth', 'Vercel Deployment',
];

export default function DevelopmentPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    Services · Development
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Web <span className="text-primary">Development</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    Fast, accessible, and scalable web applications — from marketing sites to full-stack SaaS products — built with modern technology.
                </p>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-16 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>I specialise in building with the Next.js App Router, TypeScript, and Prisma. Whether you need a landing page, a complex dashboard, or a full API backend, I deliver clean, maintainable code.</p>
                    <p>Every project is built with performance, accessibility, and SEO best practices in mind — and deployed to production with CI/CD pipelines on Vercel.</p>
                </div>
                <div>
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {stack.map((tech) => (
                            <span key={tech} className="rounded-full border border-border bg-muted px-4 py-1 text-xs font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Services</Link>
                    <Link href="/contact-us" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Start a Dev Project
                    </Link>
                </div>
            </section>

        </main>
    );
}
