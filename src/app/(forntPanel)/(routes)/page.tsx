import Link from 'next/link';
import { HeadingAccent } from '@/components/custom-ui/heading-accent';
import { getPublishedServices, getSettings } from '@/lib/site-content';
import type { CtaStripContent, HeroContent } from '@/types/cms';

export const dynamic = 'force-dynamic';

const FALLBACK_HERO: HeroContent = {
    badge: 'Design · Development · Branding',
    headingPrefix: 'Building Digital',
    headingAccent: 'Experiences',
    headingSuffix: 'That Inspire',
    subtitle: '',
    primaryCta: { label: 'Start a Project', href: '/contact-us' },
    secondaryCta: { label: 'View Case Studies', href: '/case-study' },
};

export default async function HomePage() {
    const settings = await getSettings();
    const services = await getPublishedServices();

    const hero = (settings['home.hero'] as HeroContent | undefined) ?? FALLBACK_HERO;
    const servicesHeading = (settings['home.servicesHeading'] as { title?: string } | undefined)?.title ?? 'What I Do';
    const ctaStrip = settings['home.ctaStrip'] as CtaStripContent | undefined;

    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    {hero.badge}
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                    {hero.headingPrefix} <br />
                    <span className="text-primary">{hero.headingAccent}</span>
                    {hero.headingSuffix ? <> {hero.headingSuffix}</> : null}
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    {hero.subtitle}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href={hero.primaryCta.href}
                        className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                    >
                        {hero.primaryCta.label}
                    </Link>
                    <Link
                        href={hero.secondaryCta.href}
                        className="rounded-full border border-border px-8 py-3 text-sm font-semibold transition hover:bg-muted"
                    >
                        {hero.secondaryCta.label}
                    </Link>
                </div>
            </section>

            {/* Services grid */}
            <section className="bg-muted/40 py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="text-center text-3xl font-bold tracking-tight mb-12">{servicesHeading}</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary hover:shadow-md"
                            >
                                <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA strip */}
            {ctaStrip && (
                <section className="mx-auto max-w-7xl px-6 py-20 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">{ctaStrip.heading}</h2>
                    <p className="mt-4 text-muted-foreground">{ctaStrip.text}</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {ctaStrip.links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={link.primary
                                    ? 'rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90'
                                    : 'rounded-full border border-border px-7 py-3 text-sm font-medium transition hover:bg-muted'}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </section>
            )}

        </main>
    );
}
