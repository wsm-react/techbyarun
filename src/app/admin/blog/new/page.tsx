import BlogForm from '@/components/admin/blog-form';

export default function NewBlogPostPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">New Blog Post</h1>
            <p className="mt-1 text-sm text-muted-foreground">Write a new article for your blog.</p>
            <div className="mt-8">
                <BlogForm mode="create" />
            </div>
        </div>
    );
}
