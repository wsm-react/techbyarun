import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/v1/auth/[...nextauth]/auth-options';
import AdminNav from '@/components/admin/admin-nav';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Admin · TechByArun',
    robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    const user = session?.user as { email?: string | null; role?: string } | undefined;

    if (!user || user.role !== 'admin') {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-muted/20 text-foreground">
            <header className="border-b border-border bg-background">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
                    <Link href="/admin" className="text-lg font-extrabold tracking-tight text-primary">
                        TechByArun Admin
                    </Link>
                    <AdminNav email={user.email} />
                    <Link href="/" target="_blank" className="text-xs text-muted-foreground hover:text-primary">
                        View site ↗
                    </Link>
                </div>
            </header>
            <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </div>
    );
}
