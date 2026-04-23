import Link from 'next/link';

const deliverables = [
    'Brand Strategy & Positioning',
    'Logo Design & Identity System',
    'Typography & Colour Palette',
    'Brand Guidelines Document',
    'Business Card & Stationery',
    'Social Media Kit',
];

export default function BrandingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    Services · Branding
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Brand <span className="text-primary">Identity</span> Design
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    A strong brand is your most valuable asset. I help businesses craft identities that are memorable, consistent, and built for growth.
                </p>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-16 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>Great branding starts with strategy. Before picking a colour or drawing a shape, I dive deep into your business — understanding your audience, market position, and values.</p>
                    <p>From there I create a visual identity that communicates your story clearly across every touchpoint: digital, print, and beyond.</p>
                </div>
                <div>
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">What You Get</h2>
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
                        Start a Branding Project
                    </Link>
                </div>
            </section>

        </main>
    );
}
