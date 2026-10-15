"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Field, TextInput, TextArea, JsonArea, Checkbox } from '@/components/admin/fields';
import { apiSend } from '@/lib/admin-client';

export type ServiceFormInitial = {
    slug: string;
    title: string;
    tag: string;
    description: string;
    badge: string;
    heading: string;
    headingAccent: string;
    intro: string;
    sections: string;
    ctaLabel: string;
    sortOrder: string;
    published: boolean;
};

const EMPTY: ServiceFormInitial = {
    slug: '',
    title: '',
    tag: '',
    description: '',
    badge: '',
    heading: '',
    headingAccent: '',
    intro: '',
    sections: '',
    ctaLabel: '',
    sortOrder: '0',
    published: true,
};

export default function ServiceForm({
    mode,
    id,
    initial,
}: {
    mode: 'create' | 'edit';
    id?: string;
    initial?: ServiceFormInitial;
}) {
    const router = useRouter();
    const [v, setV] = useState<ServiceFormInitial>(initial ?? EMPTY);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = <K extends keyof ServiceFormInitial>(key: K, value: ServiceFormInitial[K]) =>
        setV((prev) => ({ ...prev, [key]: value }));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        let sections: unknown = undefined;
        if (v.sections.trim()) {
            try {
                sections = JSON.parse(v.sections);
            } catch {
                setError('Sections contains invalid JSON — fix it before saving.');
                return;
            }
        }

        const payload = {
            slug: v.slug.trim(),
            title: v.title.trim(),
            tag: v.tag.trim() || undefined,
            description: v.description || undefined,
            badge: v.badge || undefined,
            heading: v.heading || undefined,
            headingAccent: v.headingAccent || undefined,
            intro: v.intro || undefined,
            sections,
            ctaLabel: v.ctaLabel || undefined,
            sortOrder: Number(v.sortOrder) || 0,
            published: v.published,
        };

        setSaving(true);
        const res = mode === 'create'
            ? await apiSend('/api/v1/services', 'POST', payload)
            : await apiSend(`/api/v1/services/${id}`, 'PUT', payload);
        setSaving(false);

        if (!res.ok) {
            setError(res.message);
            return;
        }

        router.push('/admin/services');
        router.refresh();
    };

    return (
        <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Title">
                    <TextInput value={v.title} onChange={(val) => set('title', val)} required />
                </Field>
                <Field label="Slug" hint="Page URL: /services/<slug>">
                    <TextInput value={v.slug} onChange={(val) => set('slug', val)} required placeholder="e.g. branding" />
                </Field>
                <Field label="Card Tag" hint="Short line shown on cards">
                    <TextInput value={v.tag} onChange={(val) => set('tag', val)} />
                </Field>
                <Field label="Sort Order">
                    <TextInput type="number" value={v.sortOrder} onChange={(val) => set('sortOrder', val)} />
                </Field>
                <Field label="Badge" hint="Detail page pill (e.g. Services · Branding)">
                    <TextInput value={v.badge} onChange={(val) => set('badge', val)} />
                </Field>
                <Field label="Heading Accent" hint="Word inside the heading to highlight">
                    <TextInput value={v.headingAccent} onChange={(val) => set('headingAccent', val)} />
                </Field>
                <Field label="Heading" hint="Detail page H1">
                    <TextInput value={v.heading} onChange={(val) => set('heading', val)} />
                </Field>
                <Field label="CTA Label" hint="Button text on the detail page">
                    <TextInput value={v.ctaLabel} onChange={(val) => set('ctaLabel', val)} />
                </Field>
            </div>

            <Field label="Description" hint="Shown on cards (home + services list)">
                <TextArea value={v.description} onChange={(val) => set('description', val)} />
            </Field>

            <Field label="Intro" hint="Lead paragraph on the detail page">
                <TextArea value={v.intro} onChange={(val) => set('intro', val)} />
            </Field>

            <Field
                label="Sections (JSON)"
                hint='e.g. [{ "type": "paragraphs", "items": ["…"] }, { "type": "bullets", "title": "What You Get", "items": ["…"] }, { "type": "steps", "title": "My Process", "items": [{ "step": "01", "title": "…", "desc": "…" }] }]'
            >
                <JsonArea value={v.sections} onChange={(val) => set('sections', val)} rows={12} />
            </Field>

            <Checkbox checked={v.published} onChange={(val) => set('published', val)} label="Published (visible on the site)" />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex items-center gap-4 pt-2">
                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                >
                    {saving ? 'Saving…' : mode === 'create' ? 'Create Service' : 'Save Changes'}
                </button>
                <Link href="/admin/services" className="text-sm text-muted-foreground hover:text-foreground">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
