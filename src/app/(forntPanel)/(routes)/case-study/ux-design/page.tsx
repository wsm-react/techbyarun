import Link from 'next/link';

const highlights = [
    { label: 'Scope', value: 'UX Design · Design System' },
    { label: 'Timeline', value: '6 weeks' },
    { label: 'Tools', value: 'Figma · FigJam' },
    { label: 'Outcome', value: 'Dev handoff time cut by 40%' },
];

export default function UxDesignCaseStudyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                <Link href="/case-study" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Case Studies</Link>
                <div className="mt-6 flex flex-wrap gap-2 mb-4">
                    {([
                        { label: 'UX Design', href: '/services/ux-design' },
                        { label: 'Design System', href: '/services/ux-design' },
                        { label: 'Figma', href: '/services/ux-design' },
                    ] as { label: string; href: string }[]).map(({ label, href }) => (
                        <Link key={label} href={href} className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{label}</Link>
                    ))}
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    UX Design <span className="text-primary">System</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    A comprehensive, token-based design system for a SaaS product — built to accelerate design and eliminate inconsistency across a growing product team.
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
                        A fast-growing SaaS team was designing and building the same components over and over — inconsistently. No shared language between designers and engineers led to costly rework.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-3">The Process</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        I audited the existing product, catalogued every component variant, and established a token system for colour, typography, and spacing. The resulting Figma library was documented and handed off with an interactive prototype.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-3">The Result</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Design-to-development handoff time decreased by 40%. The team now ships new features in a fraction of the previous time with full visual consistency.
                    </p>
                </div>
            </section>

            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/case-study" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Case Studies</Link>
                    <Link href="/contact-us" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Start a UX Project
                    </Link>
                </div>
            </section>

        </main>
    );
}
