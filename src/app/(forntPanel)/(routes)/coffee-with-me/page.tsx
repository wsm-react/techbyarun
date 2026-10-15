import Link from 'next/link';
import { HeadingAccent } from '@/components/custom-ui/heading-accent';
import { getSettings } from '@/lib/site-content';
import type { CtaLink, PageHeaderContent } from '@/types/cms';

export const dynamic = 'force-dynamic';

type CoffeeHeader = PageHeaderContent & { points?: string[] };

const FALLBACK_HEADER: CoffeeHeader = {
    badge: 'Coffee with me',
    headingPrefix: 'Let’s make something',
    headingAccent: 'astounding',
    headingSuffix: 'together.',
    intro: 'Grab a virtual coffee and tell me about your idea — a project, a collaboration, or just a good conversation about design, code, and everything in between.',
    points: ['30-minute virtual call', 'Design, code & ideas', 'Zero pressure, zero pitch'],
};

const FALLBACK_CTA: CtaLink = { label: '☕ Schedule a coffee chat', href: '/contact-us' };

export default async function CoffeeWithMePage() {
    const settings = await getSettings();
    const header = (settings['coffee.pageHeader'] as CoffeeHeader | undefined) ?? FALLBACK_HEADER;
    const cta = (settings['coffee.cta'] as CtaLink | undefined) ?? FALLBACK_CTA;

    const fullHeading = `${header.headingPrefix} ${header.headingAccent}${header.headingSuffix ? ` ${header.headingSuffix}` : ''}`.trim();

    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
                {header.badge && (
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                        {header.badge}
                    </span>
                )}
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                    <HeadingAccent text={fullHeading} accent={header.headingAccent} />
                </h1>
                {header.intro && (
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{header.intro}</p>
                )}

                {header.points && header.points.length > 0 && (
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {header.points.map((point) => (
                            <span key={point} className="rounded-full border border-border bg-muted px-4 py-1 text-xs font-medium">
                                {point}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href={cta.href}
                        className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                    >
                        {cta.label}
                    </Link>
                    <Link
                        href="/projects"
                        className="rounded-full border border-border px-8 py-3 text-sm font-semibold transition hover:bg-muted"
                    >
                        See my work
                    </Link>
                </div>
            </section>

            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        Prefer writing? Reach out anytime at{' '}
                        <a href="mailto:hello@techbyarun.com" className="text-primary hover:underline">hello@techbyarun.com</a>
                    </p>
                </div>
            </section>

        </main>
    );
}
