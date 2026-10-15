import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HeadingAccent } from '@/components/custom-ui/heading-accent';
import { getCaseStudyBySlug, getServiceBySlug } from '@/lib/site-content';
import { Slugify } from '@/lib/function';
import type { CaseStudyHighlight, CaseStudySection, CaseStudyServiceTag } from '@/types/cms';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ slug: string; tag: string }> };

export default async function CaseStudyTagPage({ params }: Params) {
    const { slug, tag } = await params;
    const study = await getCaseStudyBySlug(slug);

    if (!study) {
        notFound();
    }

    const serviceTags = (study.serviceTags as CaseStudyServiceTag[] | null) ?? [];
    const activeTag = serviceTags.find((t) => Slugify(t.label) === tag);

    if (!activeTag) {
        notFound();
    }

    const highlights = (study.highlights as CaseStudyHighlight[] | null) ?? [];
    const sections = (study.sections as CaseStudySection[] | null) ?? [];

    // When this tag matches one of the offered services, surface a link to it.
    const relatedService = await getServiceBySlug(tag);

    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                <Link href={`/case-study/${study.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">← {study.title}</Link>
                <div className="mt-6 flex flex-wrap gap-2 mb-4">
                    {serviceTags.map((serviceTag) => {
                        const isActive = serviceTag.label === activeTag.label;
                        return (
                            <Link
                                key={serviceTag.label}
                                href={`/case-study/${study.slug}/${Slugify(serviceTag.label)}`}
                                className={isActive
                                    ? 'rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground'
                                    : 'rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground'}
                            >
                                {serviceTag.label}
                            </Link>
                        );
                    })}
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                    Case Study · {activeTag.label}
                </p>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    <HeadingAccent text={study.title} accent={study.headingAccent} />
                </h1>
                {study.intro && (
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{study.intro}</p>
                )}
            </section>

            {highlights.length > 0 && (
                <section className="mx-auto max-w-4xl px-6 pb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {highlights.map((highlight) => (
                        <div key={highlight.label} className="rounded-xl border border-border bg-muted/30 p-4">
                            <p className="text-xs text-muted-foreground">{highlight.label}</p>
                            <p className="mt-1 text-sm font-semibold">{highlight.value}</p>
                        </div>
                    ))}
                </section>
            )}

            {sections.length > 0 && (
                <section className="mx-auto max-w-4xl px-6 pb-16 space-y-10">
                    {sections.map((section) => (
                        <div key={section.heading}>
                            <h2 className="text-xl font-bold mb-3">{section.heading}</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
                        </div>
                    ))}
                </section>
            )}

            {relatedService && (
                <section className="mx-auto max-w-4xl px-6 pb-20">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-border bg-muted/30 p-8">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                                {activeTag.label} service
                            </p>
                            <h2 className="mt-2 text-xl font-bold">{relatedService.title}</h2>
                            {relatedService.intro && (
                                <p className="mt-2 max-w-xl text-sm text-muted-foreground">{relatedService.intro}</p>
                            )}
                        </div>
                        <Link
                            href={`/services/${relatedService.slug}`}
                            className="whitespace-nowrap rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            Explore the service →
                        </Link>
                    </div>
                </section>
            )}

            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/case-study" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Case Studies</Link>
                    <Link href="/contact-us" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        {study.ctaLabel ?? 'Start a Similar Project'}
                    </Link>
                </div>
            </section>

        </main>
    );
}
