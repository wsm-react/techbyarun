import Link from 'next/link';

const process = [
    { step: '01', title: 'Discovery', desc: 'Understanding your users, goals, and business constraints through research and stakeholder interviews.' },
    { step: '02', title: 'Mapping', desc: 'User journey mapping, information architecture, and flow diagrams to align the team.' },
    { step: '03', title: 'Wireframing', desc: 'Low-fidelity wireframes to validate structure and interactions before visual design.' },
    { step: '04', title: 'Prototyping', desc: 'High-fidelity prototypes in Figma that feel real enough to test with actual users.' },
];

export default function UxDesignPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    Services · UX Design
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    UX <span className="text-primary">Design</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    Products that work beautifully for the people who use them. I design experiences grounded in research, not assumptions.
                </p>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-24">
                <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider">My Process</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {process.map(({ step, title, desc }) => (
                        <div key={step} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                            <span className="text-3xl font-black text-primary/20">{step}</span>
                            <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Services</Link>
                    <Link href="/contact-us" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Start a UX Project
                    </Link>
                </div>
            </section>

        </main>
    );
}
