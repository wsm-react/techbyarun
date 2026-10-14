import appDB from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    try {
        const posts = await appDB.orm.BlogPost
            .where({ published: true })
            .orderBy({ created_at: -1 })
            .include('author')
            .all();

        const data = posts.map((p: any) => ({
            id: p._id,
            slug: p.slug,
            title: p.title,
            subTitle: p.sub_title,
            createdAt: p.created_at,
            updatedAt: p.updated_at,
            author: p.author ? { id: String(p.author._id), name: p.author.name } : null,
        }));

        return NextResponse.json({
            success: true,
            status: 200,
            data,
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}
