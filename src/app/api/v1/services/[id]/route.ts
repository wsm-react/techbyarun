import prisma from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';
import { assertAdmin, getSessionUser } from '@/lib/api-auth';
import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { apiServiceUpdateSchema } from '@/validator/vine-schema';
import { filterUndefined } from '@/lib/function';
import { Prisma } from '@/generated/prisma/client';

type Params = { params: Promise<{ id: string }> };

async function findService(idOrSlug: string) {
    return prisma.service.findFirst({ where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] } });
}

// GET /api/v1/services/[id] — fetch one service by id or slug (drafts visible to admins only).
export async function GET(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const service = await findService(id);

        if (!service) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Service not found.' },
                { status: 404 }
            );
        }

        if (!service.published) {
            const user = await getSessionUser();
            if (user?.role !== 'admin') {
                return NextResponse.json(
                    { success: false, status: 404, message: 'Service not found.' },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json({ success: true, status: 200, data: service }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}

// PUT /api/v1/services/[id] — admin only: update a service (partial).
export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const { error: authError } = await assertAdmin();
        if (authError) return authError;

        const { id } = await params;
        const existing = await findService(id);
        if (!existing) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Service not found.' },
                { status: 404 }
            );
        }

        const payload = await req.json();

        const validator = vine.compile(apiServiceUpdateSchema);
        const output = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter(),
        });

        const service = await prisma.service.update({
            where: { id: existing.id },
            data: filterUndefined(output) as Prisma.ServiceUpdateInput,
        });

        return NextResponse.json({ success: true, status: 200, data: service }, { status: 200 });

    } catch (error: any) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
                { success: false, status: error.status, message: error.messages },
                { status: error.status }
            );
        }
        if (error?.code === 'P2002') {
            return NextResponse.json(
                { success: false, status: 409, message: 'A service with this slug already exists.' },
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

// DELETE /api/v1/services/[id] — admin only: delete a service by id or slug.
export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        const { error: authError } = await assertAdmin();
        if (authError) return authError;

        const { id } = await params;
        const existing = await findService(id);
        if (!existing) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Service not found.' },
                { status: 404 }
            );
        }

        await prisma.service.delete({ where: { id: existing.id } });

        return NextResponse.json(
            { success: true, status: 200, message: `Service "${existing.slug}" deleted.` },
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
