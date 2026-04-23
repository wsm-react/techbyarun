import Link from 'next/link';

const deliverables = [
    'UI Component Library',
    'Marketing Landing Pages',
    'Social Media Graphics',
    'Email Templates',
    'Presentation Design',
    'Iconography & Illustration',
];

export default function VisualDesignPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    Services · Visual Design
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Visual <span className="text-primary">Design</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    Beautiful, pixel-perfect visuals that communicate clearly and reinforce your brand at every touchpoint.
                </p>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-16 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>Good visual design is about clarity and emotion. I create interfaces, marketing assets, and digital graphics that stop the scroll and communicate the right message instantly.</p>
                    <p>Whether it is a product UI, a campaign landing page, or a social media kit — every pixel is intentional.</p>
                </div>
                <div>
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Deliverables</h2>
                    <ul className="space-y-2">
                        {deliverables.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Services</Link>
                    <Link href="/contact-us" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Start a Visual Design Project
                    </Link>
                </div>
            </section>

        </main>
    );
}
