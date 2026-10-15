import { notFound } from 'next/navigation';
import prisma from '@/config/database';
import ServiceForm, { type ServiceFormInitial } from '@/components/admin/service-form';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Params) {
    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id } });

    if (!service) {
        notFound();
    }

    const initial: ServiceFormInitial = {
        slug: service.slug,
        title: service.title,
        tag: service.tag ?? '',
        description: service.description ?? '',
        badge: service.badge ?? '',
        heading: service.heading ?? '',
        headingAccent: service.headingAccent ?? '',
        intro: service.intro ?? '',
        sections: service.sections ? JSON.stringify(service.sections, null, 2) : '',
        ctaLabel: service.ctaLabel ?? '',
        sortOrder: String(service.sortOrder),
        published: service.published,
    };

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Service</h1>
            <p className="mt-1 text-sm text-muted-foreground">/services/{service.slug}</p>
            <div className="mt-8">
                <ServiceForm mode="edit" id={service.id} initial={initial} />
            </div>
        </div>
    );
}
