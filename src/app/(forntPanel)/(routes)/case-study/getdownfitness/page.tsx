import Link from 'next/link';

const highlights = [
    { label: 'Scope', value: 'Branding · UX Design · Development' },
    { label: 'Timeline', value: '8 weeks' },
    { label: 'Platform', value: 'Web (Next.js)' },
    { label: 'Outcome', value: '+220% online bookings in 60 days' },
];

export default function GetDownFitnessPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                <Link href="/case-study" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Case Studies</Link>
                <div className="mt-6 flex flex-wrap gap-2 mb-4">
                    {([
                        { label: 'Branding', href: '/services/branding' },
                        { label: 'UX Design', href: '/services/ux-design' },
                        { label: 'Development', href: '/services/development' },
                    ] as { label: string; href: string }[]).map(({ label, href }) => (
                        <Link key={label} href={href} className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{label}</Link>
                    ))}
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Get Down <span className="text-primary">Fitness</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    A full digital transformation for a boutique fitness studio — new brand identity, a mobile-first website, and an integrated class booking system.
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
                        Get Down Fitness had no online presence. New members were sourced entirely through word of mouth, and class bookings were managed by phone — creating friction and lost revenue.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-3">The Process</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        We started with a brand workshop to define their voice and values. From there I developed a visual identity, designed the full user experience in Figma, and built the website with Next.js and a custom booking API.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-3">The Result</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Within 60 days of launch, online bookings increased by 220%. The brand now has a consistent identity across web, social media, and in-studio materials.
                    </p>
                </div>
            </section>

            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/case-study" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Case Studies</Link>
                    <Link href="/contact-us" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Start a Similar Project
                    </Link>
                </div>
            </section>

        </main>
    );
}
