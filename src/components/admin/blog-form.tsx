"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Field, TextInput, TextArea, Checkbox } from '@/components/admin/fields';
import { apiSend } from '@/lib/admin-client';

export type BlogFormInitial = {
    slug: string;
    title: string;
    subTitle: string;
    tag: string;
    body: string;
    published: boolean;
};

const EMPTY: BlogFormInitial = {
    slug: '',
    title: '',
    subTitle: '',
    tag: '',
    body: '',
    published: true,
};

export default function BlogForm({
    mode,
    id,
    initial,
}: {
    mode: 'create' | 'edit';
    id?: string;
    initial?: BlogFormInitial;
}) {
    const router = useRouter();
    const [v, setV] = useState<BlogFormInitial>(initial ?? EMPTY);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = <K extends keyof BlogFormInitial>(key: K, value: BlogFormInitial[K]) =>
        setV((prev) => ({ ...prev, [key]: value }));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const payload = {
            slug: v.slug.trim(),
            title: v.title.trim(),
            subTitle: v.subTitle || undefined,
            tag: v.tag || undefined,
            body: v.body,
            published: v.published,
        };

        setSaving(true);
        const res = mode === 'create'
            ? await apiSend('/api/v1/blog', 'POST', payload)
            : await apiSend(`/api/v1/blog/${id}`, 'PUT', payload);
        setSaving(false);

        if (!res.ok) {
            setError(res.message);
            return;
        }

        router.push('/admin/blog');
        router.refresh();
    };

    return (
        <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Title">
                    <TextInput value={v.title} onChange={(val) => set('title', val)} required />
                </Field>
                <Field label="Slug" hint="Page URL: /blog/<slug>">
                    <TextInput value={v.slug} onChange={(val) => set('slug', val)} required placeholder="e.g. my-first-post" />
                </Field>
                <Field label="Tag" hint="e.g. Design · Development · Branding">
                    <TextInput value={v.tag} onChange={(val) => set('tag', val)} />
                </Field>
                <Field label="Subtitle" hint="Short excerpt shown in lists">
                    <TextInput value={v.subTitle} onChange={(val) => set('subTitle', val)} />
                </Field>
            </div>

            <Field label="Body" hint="Plain text — separate paragraphs with a blank line">
                <TextArea value={v.body} onChange={(val) => set('body', val)} rows={18} />
            </Field>

            <Checkbox checked={v.published} onChange={(val) => set('published', val)} label="Published (visible on the site)" />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex items-center gap-4 pt-2">
                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                >
                    {saving ? 'Saving…' : mode === 'create' ? 'Publish Post' : 'Save Changes'}
                </button>
                <Link href="/admin/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
