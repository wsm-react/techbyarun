import prisma from '@/config/database';
import SettingsEditor from '@/components/admin/settings-editor';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
    const rows = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } });

    const settings = rows.map((row) => ({
        key: row.key,
        value: JSON.stringify(row.value, null, 2),
    }));

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
                Text everywhere on the site — hero, page headers, about, coffee page. Changes are live immediately.
            </p>
            <div className="mt-8">
                <SettingsEditor settings={settings} />
            </div>
        </div>
    );
}
