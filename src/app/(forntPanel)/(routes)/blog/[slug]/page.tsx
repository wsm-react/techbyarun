import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Params) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const paragraphs = post.body
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const date = new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <main className="min-h-screen bg-background text-foreground">

            <article className="mx-auto max-w-3xl px-6 pt-24 pb-24">
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back to Blog</Link>

                <div className="mt-6 flex items-center gap-3 mb-4">
                    {post.tag && (
                        <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">{post.tag}</span>
                    )}
                    <span className="text-xs text-muted-foreground">{date}</span>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>

                {post.subTitle && (
                    <p className="mt-4 text-lg text-muted-foreground">{post.subTitle}</p>
                )}

                {post.author?.name && (
                    <p className="mt-6 text-sm text-muted-foreground">By {post.author.name}</p>
                )}

                <div className="mt-10 space-y-6 leading-relaxed text-muted-foreground">
                    {paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 64)}>{paragraph}</p>
                    ))}
                </div>

                <div className="mt-16 border-t border-border pt-8">
                    <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back to Blog</Link>
                </div>
            </article>

        </main>
    );
}
