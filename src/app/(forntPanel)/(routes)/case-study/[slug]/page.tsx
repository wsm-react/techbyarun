import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HeadingAccent } from '@/components/custom-ui/heading-accent';
import { getCaseStudyBySlug } from '@/lib/site-content';
import type { CaseStudyHighlight, CaseStudySection, CaseStudyServiceTag } from '@/types/cms';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ slug: string }> };

export default async function CaseStudyDetailPage({ params }: Params) {
    const { slug } = await params;
    const study = await getCaseStudyBySlug(slug);

    if (!study) {
        notFound();
    }

    const serviceTags = (study.serviceTags as CaseStudyServiceTag[] | null) ?? [];
    const highlights = (study.highlights as CaseStudyHighlight[] | null) ?? [];
    const sections = (study.sections as CaseStudySection[] | null) ?? [];

    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                <Link href="/case-study" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Case Studies</Link>
                {serviceTags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 mb-4">
                        {serviceTags.map((tag) => (
                            <Link key={tag.label} href={tag.href} className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{tag.label}</Link>
                        ))}
                    </div>
                )}
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
                <section className="mx-auto max-w-4xl px-6 pb-24 space-y-10">
                    {sections.map((section) => (
                        <div key={section.heading}>
                            <h2 className="text-xl font-bold mb-3">{section.heading}</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
                        </div>
                    ))}
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
