import Link from 'next/link';
import prisma from '@/config/database';
import DeleteButton from '@/components/admin/delete-button';

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
    const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Services</h1>
                <Link
                    href="/admin/services/new"
                    className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                    + New Service
                </Link>
            </div>

            <div className="mt-6 space-y-3">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 shadow-sm"
                    >
                        <div>
                            <p className="font-semibold">
                                {service.title}
                                <span className="ml-2 text-xs font-normal text-muted-foreground">/services/{service.slug}</span>
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                {service.published ? 'Published' : 'Draft'} · Sort {service.sortOrder}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={`/admin/services/${service.id}`} className="text-xs font-medium text-primary hover:underline">
                                Edit
                            </Link>
                            <DeleteButton url={`/api/v1/services/${service.id}`} confirmText={`Delete service "${service.title}"?`} />
                        </div>
                    </div>
                ))}
                {services.length === 0 && (
                    <p className="text-sm text-muted-foreground">No services yet — create your first one.</p>
                )}
            </div>
        </div>
    );
}
