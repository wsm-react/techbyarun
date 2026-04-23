import Link from 'next/link';

const services = [
    {
        title: 'Branding',
        tag: 'Identity · Strategy · Design',
        desc: 'From naming and strategy to logo systems and brand guidelines — I help you build brands that stand out and stay consistent.',
        href: '/services/branding',
    },
    {
        title: 'Development',
        tag: 'Next.js · TypeScript · Full-Stack',
        desc: 'Performant, accessible web applications built with modern tooling. From landing pages to complex dashboards and APIs.',
        href: '/services/development',
    },
    {
        title: 'UX Design',
        tag: 'Research · Wireframes · Prototypes',
        desc: 'User-centred design grounded in research. I map journeys, build wireframes, and create prototypes that validate ideas fast.',
        href: '/services/ux-design',
    },
    {
        title: 'Visual Design',
        tag: 'UI · Motion · Graphics',
        desc: 'Polished interfaces, marketing assets, and visual systems that make your product look as good as it works.',
        href: '/services/visual-design',
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    Services
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    What I <span className="text-primary">Offer</span>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    End-to-end digital services — from brand strategy through design to production-ready code.
                </p>
            </section>

            <section className="mx-auto max-w-5xl px-6 pb-24 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {services.map(({ title, tag, desc, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary hover:shadow-md"
                    >
                        <div>
                            <span className="text-xs font-medium text-primary">{tag}</span>
                            <h2 className="mt-2 text-xl font-semibold group-hover:text-primary transition-colors">{title}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                        </div>
                        <span className="mt-6 inline-flex items-center text-sm font-medium text-primary">
                            Learn more →
                        </span>
                    </Link>
                ))}
            </section>

        </main>
    );
}
