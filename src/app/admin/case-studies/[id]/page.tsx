import { notFound } from 'next/navigation';
import prisma from '@/config/database';
import CaseStudyForm, { type CaseStudyFormInitial } from '@/components/admin/case-study-form';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

const json = (value: unknown) => (value ? JSON.stringify(value, null, 2) : '');

export default async function EditCaseStudyPage({ params }: Params) {
    const { id } = await params;
    const study = await prisma.caseStudy.findUnique({ where: { id } });

    if (!study) {
        notFound();
    }

    const initial: CaseStudyFormInitial = {
        slug: study.slug,
        title: study.title,
        headingAccent: study.headingAccent ?? '',
        tag: study.tag ?? '',
        projectDescription: study.projectDescription ?? '',
        cardDescription: study.cardDescription ?? '',
        intro: study.intro ?? '',
        cardTags: json(study.cardTags),
        serviceTags: json(study.serviceTags),
        highlights: json(study.highlights),
        sections: json(study.sections),
        ctaLabel: study.ctaLabel ?? '',
        sortOrder: String(study.sortOrder),
        published: study.published,
    };

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Case Study</h1>
            <p className="mt-1 text-sm text-muted-foreground">/case-study/{study.slug}</p>
            <div className="mt-8">
                <CaseStudyForm mode="edit" id={study.id} initial={initial} />
            </div>
        </div>
    );
}
