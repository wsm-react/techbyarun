import Link from 'next/link';
import prisma from '@/config/database';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const [services, studies, posts, settings, leads, contacts] = await Promise.all([
        prisma.service.count(),
        prisma.caseStudy.count(),
        prisma.blogPost.count(),
        prisma.siteSetting.count(),
        prisma.leads.count(),
        prisma.contactUs.count(),
    ]);

    const cards: { label: string; value: number; href: string | null }[] = [
        { label: 'Services', value: services, href: '/admin/services' },
        { label: 'Case Studies', value: studies, href: '/admin/case-studies' },
        { label: 'Blog Posts', value: posts, href: '/admin/blog' },
        { label: 'Site Settings', value: settings, href: '/admin/settings' },
        { label: 'Leads', value: leads, href: null },
        { label: 'Contact Requests', value: contacts, href: null },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
                Manage everything on your site — changes appear immediately on the live pages.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
                {cards.map((card) => (
                    <div key={card.label} className="rounded-2xl border border-border bg-background p-5 shadow-sm">
                        <p className="text-sm text-muted-foreground">{card.label}</p>
                        <p className="mt-2 text-3xl font-extrabold">{card.value}</p>
                        {card.href ? (
                            <Link href={card.href} className="mt-3 inline-block text-xs font-medium text-primary hover:underline">
                                Manage →
                            </Link>
                        ) : (
                            <p className="mt-3 text-xs text-muted-foreground">Received via your forms</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
