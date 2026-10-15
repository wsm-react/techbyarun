import prisma from '@/config/database';
import { NextResponse } from 'next/server';

// GET /api/v1/site-settings — public: all settings as a { key: value } map.
export async function GET() {
    try {
        const rows = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } });
        const data = Object.fromEntries(rows.map((row) => [row.key, row.value]));

        return NextResponse.json({ success: true, status: 200, data }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}
