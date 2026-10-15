import { notFound } from 'next/navigation';
import prisma from '@/config/database';
import BlogForm, { type BlogFormInitial } from '@/components/admin/blog-form';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Params) {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({ where: { id } });

    if (!post) {
        notFound();
    }

    const initial: BlogFormInitial = {
        slug: post.slug,
        title: post.title,
        subTitle: post.subTitle ?? '',
        tag: post.tag ?? '',
        body: post.body,
        published: post.published,
    };

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
            <p className="mt-1 text-sm text-muted-foreground">/blog/{post.slug}</p>
            <div className="mt-8">
                <BlogForm mode="edit" id={post.id} initial={initial} />
            </div>
        </div>
    );
}
