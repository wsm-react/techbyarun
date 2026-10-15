import prisma from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';
import { assertAdmin, getSessionUser } from '@/lib/api-auth';
import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { apiBlogCreateSchema } from '@/validator/vine-schema';
import { filterUndefined } from '@/lib/function';
import { Prisma } from '@/generated/prisma/client';

// GET /api/v1/blog — public list (published only). Admins can pass ?includeDrafts=1.
export async function GET(req: NextRequest) {
    try {
        const includeDrafts = req.nextUrl.searchParams.get('includeDrafts') === '1';
        let where: Prisma.BlogPostWhereInput = { published: true };

        if (includeDrafts) {
            const user = await getSessionUser();
            if (user?.role !== 'admin') {
                return NextResponse.json(
                    { success: false, status: 403, message: 'Admin access required to include drafts.' },
                    { status: 403 }
                );
            }
            where = {};
        }

        const posts = await prisma.blogPost.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { author: { select: { id: true, name: true } } },
        });

        const data = posts.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            subTitle: p.subTitle,
            tag: p.tag,
            published: p.published,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            author: p.author ? { id: p.author.id, name: p.author.name } : null,
        }));

        return NextResponse.json({ success: true, status: 200, data }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}

// POST /api/v1/blog — admin only: create a post (author = the logged-in admin).
export async function POST(req: NextRequest) {
    try {
        const { user, error: authError } = await assertAdmin();
        if (authError) return authError;

        const payload = await req.json();

        const validator = vine.compile(apiBlogCreateSchema);
        const output = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter(),
        });

        const post = await prisma.blogPost.create({
            data: {
                ...filterUndefined(output),
                authorId: user.id as string,
                published: output.published ?? true,
            } as Prisma.BlogPostUncheckedCreateInput,
        });

        return NextResponse.json({ success: true, status: 201, data: post }, { status: 201 });

    } catch (error: any) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
                { success: false, status: error.status, message: error.messages },
                { status: error.status }
            );
        }
        if (error?.code === 'P2002') {
            return NextResponse.json(
                { success: false, status: 409, message: 'A post with this slug already exists.' },
                { status: 409 }
            );
        }
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}
