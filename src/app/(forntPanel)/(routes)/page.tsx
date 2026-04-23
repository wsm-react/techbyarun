import Link from 'next/link';
import ThemeSwitch from '@/components/custom-ui/theme-switch';

const services = [
    { title: 'Branding', desc: 'Memorable identities that connect brands with their audience.', href: '/services/branding' },
    { title: 'Development', desc: 'Fast, accessible web applications built with modern technology.', href: '/services/development' },
    { title: 'UX Design', desc: 'User-centred experiences that are intuitive and delightful.', href: '/services/ux-design' },
    { title: 'Visual Design', desc: 'Beautiful interfaces and graphics that communicate clearly.', href: '/services/visual-design' },
];

export default function HomePage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    Design · Development · Branding
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                    Building Digital <br />
                    <span className="text-primary">Experiences</span> That Inspire
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    I design and build purposeful digital products — from brand identity and UX design to full-stack web development. Let&apos;s create something great together.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/contact-us"
                        className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                    >
                        Start a Project
                    </Link>
                    <Link
                        href="/case-study"
                        className="rounded-full border border-border px-8 py-3 text-sm font-semibold transition hover:bg-muted"
                    >
                        View Case Studies
                    </Link>
                </div>
            </section>

            {/* Services grid */}
            <section className="bg-muted/40 py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="text-center text-3xl font-bold tracking-tight mb-12">What I Do</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {services.map(({ title, desc, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary hover:shadow-md"
                            >
                                <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">{title}</h3>
                                <p className="text-sm text-muted-foreground">{desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA strip */}
            <section className="mx-auto max-w-7xl px-6 py-20 text-center">
                <h2 className="text-3xl font-bold tracking-tight">Ready to work together?</h2>
                <p className="mt-4 text-muted-foreground">
                    Check out my projects, read the blog, or get in touch directly.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link href="/projects" className="rounded-full border border-border px-7 py-3 text-sm font-medium transition hover:bg-muted">
                        View Projects
                    </Link>
                    <Link href="/about-me" className="rounded-full border border-border px-7 py-3 text-sm font-medium transition hover:bg-muted">
                        About Me
                    </Link>
                    <Link href="/contact-us" className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Contact Us
                    </Link>
                </div>
            </section>

        </main>
    );
}
