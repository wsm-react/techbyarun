import Link from 'next/link';
import prisma from '@/config/database';
import DeleteButton from '@/components/admin/delete-button';

export const dynamic = 'force-dynamic';

export default async function AdminCaseStudiesPage() {
    const studies = await prisma.caseStudy.findMany({ orderBy: { sortOrder: 'asc' } });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Case Studies</h1>
                <Link
                    href="/admin/case-studies/new"
                    className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                    + New Case Study
                </Link>
            </div>

            <div className="mt-6 space-y-3">
                {studies.map((study) => (
                    <div
                        key={study.id}
                        className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 shadow-sm"
                    >
                        <div>
                            <p className="font-semibold">
                                {study.title}
                                <span className="ml-2 text-xs font-normal text-muted-foreground">/case-study/{study.slug}</span>
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                {study.published ? 'Published' : 'Draft'} · Sort {study.sortOrder}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={`/admin/case-studies/${study.id}`} className="text-xs font-medium text-primary hover:underline">
                                Edit
                            </Link>
                            <DeleteButton url={`/api/v1/case-studies/${study.id}`} confirmText={`Delete case study "${study.title}"?`} />
                        </div>
                    </div>
                ))}
                {studies.length === 0 && (
                    <p className="text-sm text-muted-foreground">No case studies yet — create your first one.</p>
                )}
            </div>
        </div>
    );
}
