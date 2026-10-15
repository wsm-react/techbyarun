import Link from 'next/link';
import { HeadingAccent } from '@/components/custom-ui/heading-accent';
import { getSettings } from '@/lib/site-content';
import type { AboutProfileContent } from '@/types/cms';

export const dynamic = 'force-dynamic';

export default async function AboutMePage() {
    const settings = await getSettings();
    const profile = settings['about.profile'] as AboutProfileContent | undefined;

    const fullHeading = profile
        ? `${profile.headingPrefix} ${profile.headingAccent}${profile.headingSuffix ? ` ${profile.headingSuffix}` : ''}`.trim()
        : 'About Me';

    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Hero */}
            <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
                {profile?.badge && (
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                        {profile.badge}
                    </span>
                )}
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                    <HeadingAccent text={fullHeading} accent={profile?.headingAccent} />
                </h1>
                {profile?.intro && (
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{profile.intro}</p>
                )}
            </section>

            {/* Bio + skills */}
            {profile && (
                <section className="mx-auto max-w-4xl px-6 pb-16 grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                        {profile.bio.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                    <div>
                        {profile.skillsTitle && (
                            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{profile.skillsTitle}</h2>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full border border-border bg-muted px-4 py-1 text-xs font-medium text-foreground"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            {profile?.cta && (
                <section className="border-t border-border">
                    <div className="mx-auto max-w-4xl px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-xl font-semibold">{profile.cta.heading}</h2>
                            <p className="text-sm text-muted-foreground mt-1">{profile.cta.text}</p>
                        </div>
                        <div className="flex gap-4">
                            <Link href={profile.cta.primaryHref} className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                                {profile.cta.primaryLabel}
                            </Link>
                            <Link href={profile.cta.secondaryHref} className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition hover:bg-muted">
                                {profile.cta.secondaryLabel}
                            </Link>
                        </div>
                    </div>
                </section>
            )}

        </main>
    );
}
