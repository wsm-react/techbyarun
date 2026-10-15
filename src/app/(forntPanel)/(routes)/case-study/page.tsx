import Link from 'next/link';
import { HeadingAccent } from '@/components/custom-ui/heading-accent';
import { getPublishedCaseStudies, getSettings } from '@/lib/site-content';
import type { PageHeaderContent } from '@/types/cms';

export const dynamic = 'force-dynamic';

export default async function CaseStudyPage() {
    const settings = await getSettings();
    const studies = await getPublishedCaseStudies();
    const header = settings['caseStudy.pageHeader'] as PageHeaderContent | undefined;

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
                        'Case Studies'
                    )}
                </h1>
                {header?.intro && (
                    <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{header.intro}</p>
                )}
            </section>

            <section className="mx-auto max-w-5xl px-6 pb-24 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {studies.map((study) => {
                    const tags = (study.cardTags as string[] | null) ?? [];
                    return (
                        <Link
                            key={study.slug}
                            href={`/case-study/${study.slug}`}
                            className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary hover:shadow-md"
                        >
                            <div>
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {tags.map((tag) => (
                                            <span key={tag} className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{study.title}</h2>
                                <p className="mt-2 text-sm text-muted-foreground">{study.cardDescription}</p>
                            </div>
                            <span className="mt-6 inline-flex items-center text-sm font-medium text-primary">Read case study →</span>
                        </Link>
                    );
                })}
            </section>

        </main>
    );
}
