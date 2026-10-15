import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HeadingAccent } from '@/components/custom-ui/heading-accent';
import { getServiceBySlug } from '@/lib/site-content';
import type { ServiceSection, ServiceStep } from '@/types/cms';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ slug: string }> };

export default async function ServiceDetailPage({ params }: Params) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const sections = (service.sections as ServiceSection[] | null) ?? [];
    const textSections = sections.filter((s) => s.type === 'paragraphs');
    const sideSections = sections.filter((s) => s.type === 'bullets' || s.type === 'chips');
    const stepSections = sections.filter((s) => s.type === 'steps');

    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                {service.badge && (
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                        {service.badge}
                    </span>
                )}
                <h1 className="text-5xl font-extrabold tracking-tight">
                    <HeadingAccent text={service.heading ?? service.title} accent={service.headingAccent} />
                </h1>
                {service.intro && (
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{service.intro}</p>
                )}
            </section>

            {(textSections.length > 0 || sideSections.length > 0) && (
                <section className="mx-auto max-w-4xl px-6 pb-16 grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                        {textSections.map((section, i) => (
                            <div key={i} className="space-y-4">
                                {(section.items as string[]).map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="space-y-10">
                        {sideSections.map((section, i) => (
                            <div key={i}>
                                {section.title && (
                                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">{section.title}</h2>
                                )}
                                {section.type === 'bullets' ? (
                                    <ul className="space-y-2">
                                        {(section.items as string[]).map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {(section.items as string[]).map((item) => (
                                            <span key={item} className="rounded-full border border-border bg-muted px-4 py-1 text-xs font-medium">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {stepSections.map((section, i) => (
                <section key={i} className="mx-auto max-w-4xl px-6 pb-24">
                    {section.title && (
                        <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider">{section.title}</h2>
                    )}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {(section.items as ServiceStep[]).map((step) => (
                            <div key={step.step} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                                <span className="text-3xl font-black text-primary/20">{step.step}</span>
                                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Services</Link>
                    <Link href="/contact-us" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        {service.ctaLabel ?? 'Start a Project'}
                    </Link>
                </div>
            </section>

        </main>
    );
}
