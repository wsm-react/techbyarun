import Link from 'next/link';
import { HeadingAccent } from '@/components/custom-ui/heading-accent';
import { getPublishedCaseStudies, getSettings } from '@/lib/site-content';
import type { PageHeaderContent } from '@/types/cms';

export const dynamic = 'force-dynamic';

type ProjectsCta = { heading: string; text: string; ctaLabel: string; ctaHref: string };

export default async function ProjectsPage() {
    const settings = await getSettings();
    const projects = await getPublishedCaseStudies();
    const header = settings['projects.pageHeader'] as PageHeaderContent | undefined;
    const cta = settings['projects.cta'] as ProjectsCta | undefined;

    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Header */}
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
                        'Projects'
                    )}
                </h1>
                {header?.intro && (
                    <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{header.intro}</p>
                )}
            </section>

            {/* Grid */}
            <section className="mx-auto max-w-5xl px-6 pb-24 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {projects.map((project) => (
                    <div
                        key={project.slug}
                        className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary hover:shadow-md"
                    >
                        <div>
                            {project.tag && <span className="text-xs font-medium text-primary">{project.tag}</span>}
                            <h2 className="mt-2 text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{project.projectDescription}</p>
                        </div>
                        <Link
                            href={`/case-study/${project.slug}`}
                            className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline"
                        >
                            View Case Study →
                        </Link>
                    </div>
                ))}
            </section>

            {/* CTA */}
            {cta && (
                <section className="border-t border-border">
                    <div className="mx-auto max-w-5xl px-6 py-16 text-center">
                        <h2 className="text-2xl font-bold">{cta.heading}</h2>
                        <p className="mt-2 text-muted-foreground">{cta.text}</p>
                        <Link href={cta.ctaHref} className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                            {cta.ctaLabel}
                        </Link>
                    </div>
                </section>
            )}

        </main>
    );
}
