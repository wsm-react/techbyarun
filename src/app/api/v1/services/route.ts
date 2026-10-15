import prisma from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';
import { assertAdmin, getSessionUser } from '@/lib/api-auth';
import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { apiServiceCreateSchema } from '@/validator/vine-schema';
import { filterUndefined } from '@/lib/function';
import { Prisma } from '@/generated/prisma/client';

// GET /api/v1/services — public list (published only). Admins can pass ?includeDrafts=1.
export async function GET(req: NextRequest) {
    try {
        const includeDrafts = req.nextUrl.searchParams.get('includeDrafts') === '1';
        let where: Prisma.ServiceWhereInput = { published: true };

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

        const services = await prisma.service.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
        });

        return NextResponse.json({ success: true, status: 200, data: services }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}

// POST /api/v1/services — admin only: create a service.
export async function POST(req: NextRequest) {
    try {
        const { error: authError } = await assertAdmin();
        if (authError) return authError;

        const payload = await req.json();

        const validator = vine.compile(apiServiceCreateSchema);
        const output = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter(),
        });

        const service = await prisma.service.create({
            data: {
                ...filterUndefined(output),
                sortOrder: output.sortOrder ?? 0,
                published: output.published ?? true,
            } as Prisma.ServiceCreateInput,
        });

        return NextResponse.json({ success: true, status: 201, data: service }, { status: 201 });

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
