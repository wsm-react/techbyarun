import Link from 'next/link';

const highlights = [
    { label: 'Scope', value: 'Visual Design · Branding' },
    { label: 'Timeline', value: '4 weeks' },
    { label: 'Deliverables', value: '80+ assets' },
    { label: 'Outcome', value: 'Product launch on schedule' },
];

export default function VisualDesignCaseStudyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                <Link href="/case-study" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Case Studies</Link>
                <div className="mt-6 flex flex-wrap gap-2 mb-4">
                    {([
                        { label: 'Visual Design', href: '/services/visual-design' },
                        { label: 'Branding', href: '/services/branding' },
                        { label: 'Campaign', href: '/services/visual-design' },
                    ] as { label: string; href: string }[]).map(({ label, href }) => (
                        <Link key={label} href={href} className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{label}</Link>
                    ))}
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Visual Design <span className="text-primary">Campaign</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    A full suite of marketing and launch assets for a product go-to-market — social graphics, email templates, landing pages, and print collateral.
                </p>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {highlights.map(({ label, value }) => (
                    <div key={label} className="rounded-xl border border-border bg-muted/30 p-4">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="mt-1 text-sm font-semibold">{value}</p>
                    </div>
                ))}
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-24 space-y-10">
                <div>
                    <h2 className="text-xl font-bold mb-3">The Challenge</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        A product team had a tight launch window with no design resources. They needed 80+ production-ready assets across multiple channels — in four weeks.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-3">The Process</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        I established a visual language from their brand guide and then systematically produced assets in Figma — starting with the highest-impact items (landing page, hero email) and working outward to social and print.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-3">The Result</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        The product launched on schedule with a cohesive, professional visual presence across all channels. The landing page converted at 3.4% from paid traffic.
                    </p>
                </div>
            </section>

            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/case-study" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Case Studies</Link>
                    <Link href="/contact-us" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Start a Visual Design Project
                    </Link>
                </div>
            </section>

        </main>
    );
}
