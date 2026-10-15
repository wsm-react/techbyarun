import Link from 'next/link';
import prisma from '@/config/database';
import DeleteButton from '@/components/admin/delete-button';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true } } },
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
                <Link
                    href="/admin/blog/new"
                    className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                    + New Post
                </Link>
            </div>

            <div className="mt-6 space-y-3">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 shadow-sm"
                    >
                        <div>
                            <p className="font-semibold">
                                {post.title}
                                <span className="ml-2 text-xs font-normal text-muted-foreground">/blog/{post.slug}</span>
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                {post.published ? 'Published' : 'Draft'}
                                {post.tag ? ` · ${post.tag}` : ''}
                                {post.author?.name ? ` · by ${post.author.name}` : ''}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={`/admin/blog/${post.id}`} className="text-xs font-medium text-primary hover:underline">
                                Edit
                            </Link>
                            <DeleteButton url={`/api/v1/blog/${post.id}`} confirmText={`Delete post "${post.title}"?`} />
                        </div>
                    </div>
                ))}
                {posts.length === 0 && (
                    <p className="text-sm text-muted-foreground">No posts yet — write your first one.</p>
                )}
            </div>
        </div>
    );
}
