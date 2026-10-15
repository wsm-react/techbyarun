import Link from 'next/link';
import { HeadingAccent } from '@/components/custom-ui/heading-accent';
import { getPublishedServices, getSettings } from '@/lib/site-content';
import type { PageHeaderContent } from '@/types/cms';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
    const settings = await getSettings();
    const services = await getPublishedServices();
    const header = settings['services.pageHeader'] as PageHeaderContent | undefined;

    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
                {header?.badge && (
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                        {header.badge}
                    </span>
                )}
                <h1 className="text-5xl font-extrabold tracking-tight">
                    {header ? (
                        <>
                            {header.headingPrefix} <HeadingAccent text={header.headingAccent} accent={header.headingAccent} />
                            {header.headingSuffix ? <> {header.headingSuffix}</> : null}
                        </>
                    ) : (
                        'Services'
                    )}
                </h1>
                {header?.intro && (
                    <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{header.intro}</p>
                )}
            </section>

            <section className="mx-auto max-w-5xl px-6 pb-24 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {services.map((service) => (
                    <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary hover:shadow-md"
                    >
                        <div>
                            {service.tag && <span className="text-xs font-medium text-primary">{service.tag}</span>}
                            <h2 className="mt-2 text-xl font-semibold group-hover:text-primary transition-colors">{service.title}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
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
