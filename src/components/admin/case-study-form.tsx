"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Field, TextInput, TextArea, JsonArea, Checkbox } from '@/components/admin/fields';
import { apiSend } from '@/lib/admin-client';

export type CaseStudyFormInitial = {
    slug: string;
    title: string;
    headingAccent: string;
    tag: string;
    projectDescription: string;
    cardDescription: string;
    intro: string;
    cardTags: string;
    serviceTags: string;
    highlights: string;
    sections: string;
    ctaLabel: string;
    sortOrder: string;
    published: boolean;
};

const EMPTY: CaseStudyFormInitial = {
    slug: '',
    title: '',
    headingAccent: '',
    tag: '',
    projectDescription: '',
    cardDescription: '',
    intro: '',
    cardTags: '',
    serviceTags: '',
    highlights: '',
    sections: '',
    ctaLabel: '',
    sortOrder: '0',
    published: true,
};

export default function CaseStudyForm({
    mode,
    id,
    initial,
}: {
    mode: 'create' | 'edit';
    id?: string;
    initial?: CaseStudyFormInitial;
}) {
    const router = useRouter();
    const [v, setV] = useState<CaseStudyFormInitial>(initial ?? EMPTY);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = <K extends keyof CaseStudyFormInitial>(key: K, value: CaseStudyFormInitial[K]) =>
        setV((prev) => ({ ...prev, [key]: value }));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const jsonFields: [string, string][] = [
            ['cardTags', v.cardTags],
            ['serviceTags', v.serviceTags],
            ['highlights', v.highlights],
            ['sections', v.sections],
        ];

        const parsed: Record<string, unknown> = {};
        for (const [key, raw] of jsonFields) {
            if (raw.trim() === '') {
                parsed[key] = undefined;
                continue;
            }
            try {
                parsed[key] = JSON.parse(raw);
            } catch {
                setError(`${key} contains invalid JSON — fix it before saving.`);
                return;
            }
        }

        const payload = {
            slug: v.slug.trim(),
            title: v.title.trim(),
            headingAccent: v.headingAccent || undefined,
            tag: v.tag || undefined,
            projectDescription: v.projectDescription || undefined,
            cardDescription: v.cardDescription || undefined,
            intro: v.intro || undefined,
            cardTags: parsed.cardTags,
            serviceTags: parsed.serviceTags,
            highlights: parsed.highlights,
            sections: parsed.sections,
            ctaLabel: v.ctaLabel || undefined,
            sortOrder: Number(v.sortOrder) || 0,
            published: v.published,
        };

        setSaving(true);
        const res = mode === 'create'
            ? await apiSend('/api/v1/case-studies', 'POST', payload)
            : await apiSend(`/api/v1/case-studies/${id}`, 'PUT', payload);
        setSaving(false);

        if (!res.ok) {
            setError(res.message);
            return;
        }

        router.push('/admin/case-studies');
        router.refresh();
    };

    return (
        <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Title">
                    <TextInput value={v.title} onChange={(val) => set('title', val)} required />
                </Field>
                <Field label="Slug" hint="Page URL: /case-study/<slug>">
                    <TextInput value={v.slug} onChange={(val) => set('slug', val)} required placeholder="e.g. getdownfitness" />
                </Field>
                <Field label="Heading Accent" hint="Word inside the title to highlight">
                    <TextInput value={v.headingAccent} onChange={(val) => set('headingAccent', val)} />
                </Field>
                <Field label="Card Tag" hint="Tag line on the projects page">
                    <TextInput value={v.tag} onChange={(val) => set('tag', val)} />
                </Field>
                <Field label="CTA Label" hint="Button text on the detail page">
                    <TextInput value={v.ctaLabel} onChange={(val) => set('ctaLabel', val)} />
                </Field>
                <Field label="Sort Order">
                    <TextInput type="number" value={v.sortOrder} onChange={(val) => set('sortOrder', val)} />
                </Field>
            </div>

            <Field label="Project Description" hint="Shown on the /projects page">
                <TextArea value={v.projectDescription} onChange={(val) => set('projectDescription', val)} />
            </Field>
            <Field label="Card Description" hint="Shown on the /case-study page">
                <TextArea value={v.cardDescription} onChange={(val) => set('cardDescription', val)} />
            </Field>
            <Field label="Intro" hint="Lead paragraph on the detail page">
                <TextArea value={v.intro} onChange={(val) => set('intro', val)} />
            </Field>

            <Field label="Card Tags (JSON)" hint='e.g. ["Branding", "UX Design", "Development"]'>
                <JsonArea value={v.cardTags} onChange={(val) => set('cardTags', val)} rows={4} />
            </Field>

            <Field
                label="Service Tags (JSON)"
                hint='Tag buttons on the detail page, e.g. [{ "label": "Branding", "href": "/case-study/getdownfitness/branding" }]'
            >
                <JsonArea value={v.serviceTags} onChange={(val) => set('serviceTags', val)} rows={8} />
            </Field>

            <Field label="Highlights (JSON)" hint='e.g. [{ "label": "Scope", "value": "Branding · UX Design" }, { "label": "Timeline", "value": "8 weeks" }]'>
                <JsonArea value={v.highlights} onChange={(val) => set('highlights', val)} rows={8} />
            </Field>

            <Field label="Sections (JSON)" hint='e.g. [{ "heading": "The Challenge", "body": "…" }, { "heading": "The Process", "body": "…" }]'>
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
                    {saving ? 'Saving…' : mode === 'create' ? 'Create Case Study' : 'Save Changes'}
                </button>
                <Link href="/admin/case-studies" className="text-sm text-muted-foreground hover:text-foreground">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
