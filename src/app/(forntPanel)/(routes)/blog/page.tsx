import Link from 'next/link';
import { HeadingAccent } from '@/components/custom-ui/heading-accent';
import { getPublishedPosts, getSettings } from '@/lib/site-content';
import type { PageHeaderContent } from '@/types/cms';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const settings = await getSettings();
    const posts = await getPublishedPosts();
    const header = settings['blog.pageHeader'] as PageHeaderContent | undefined;

    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Header */}
            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center">
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
                        'Blog'
                    )}
                </h1>
                {header?.intro && (
                    <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{header.intro}</p>
                )}
            </section>

            {/* Post list */}
            <section className="mx-auto max-w-4xl px-6 pb-24 space-y-6">
                {posts.map((post) => {
                    const date = new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    return (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary hover:shadow-md"
                        >
                            <div className="flex items-center justify-between mb-3">
                                {post.tag ? (
                                    <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">{post.tag}</span>
                                ) : <span />}
                                <span className="text-xs text-muted-foreground">{date}</span>
                            </div>
                            <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h2>
                            {post.subTitle && (
                                <p className="mt-2 text-sm text-muted-foreground">{post.subTitle}</p>
                            )}
                        </Link>
                    );
                })}
            </section>

        </main>
    );
}
