import prisma from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';
import { assertAdmin, getSessionUser } from '@/lib/api-auth';
import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { apiBlogUpdateSchema } from '@/validator/vine-schema';
import { filterUndefined } from '@/lib/function';
import { Prisma } from '@/generated/prisma/client';

type Params = { params: Promise<{ id: string }> };

async function findPost(idOrSlug: string) {
    return prisma.blogPost.findFirst({
        where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
        include: { author: { select: { id: true, name: true } } },
    });
}

// GET /api/v1/blog/[id] — fetch one post by id or slug (drafts visible to admins only).
export async function GET(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const post = await findPost(id);

        if (!post) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Post not found.' },
                { status: 404 }
            );
        }

        if (!post.published) {
            const user = await getSessionUser();
            if (user?.role !== 'admin') {
                return NextResponse.json(
                    { success: false, status: 404, message: 'Post not found.' },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json({ success: true, status: 200, data: post }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}

// PUT /api/v1/blog/[id] — admin only: update a post (partial).
export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const { error: authError } = await assertAdmin();
        if (authError) return authError;

        const { id } = await params;
        const existing = await findPost(id);
        if (!existing) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Post not found.' },
                { status: 404 }
            );
        }

        const payload = await req.json();

        const validator = vine.compile(apiBlogUpdateSchema);
        const output = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter(),
        });

        const post = await prisma.blogPost.update({
            where: { id: existing.id },
            data: filterUndefined(output) as Prisma.BlogPostUpdateInput,
        });

        return NextResponse.json({ success: true, status: 200, data: post }, { status: 200 });

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

// DELETE /api/v1/blog/[id] — admin only: delete a post by id or slug.
export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        const { error: authError } = await assertAdmin();
        if (authError) return authError;

        const { id } = await params;
        const existing = await findPost(id);
        if (!existing) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Post not found.' },
                { status: 404 }
            );
        }

        await prisma.blogPost.delete({ where: { id: existing.id } });

        return NextResponse.json(
            { success: true, status: 200, message: `Post "${existing.slug}" deleted.` },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}
