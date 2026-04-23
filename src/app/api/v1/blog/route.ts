import appDB from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    try {
        const posts = await appDB.blogPost.findMany({
            where: { published: true },
            select: {
                id: true,
                slug: true,
                title: true,
                subTitle: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            success: true,
            status: 200,
            data: posts,
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}
