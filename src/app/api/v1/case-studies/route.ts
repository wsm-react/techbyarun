import prisma from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';
import { assertAdmin, getSessionUser } from '@/lib/api-auth';
import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { apiCaseStudyCreateSchema } from '@/validator/vine-schema';
import { filterUndefined } from '@/lib/function';
import { Prisma } from '@/generated/prisma/client';

// GET /api/v1/case-studies — public list (published only). Admins can pass ?includeDrafts=1.
export async function GET(req: NextRequest) {
    try {
        const includeDrafts = req.nextUrl.searchParams.get('includeDrafts') === '1';
        let where: Prisma.CaseStudyWhereInput = { published: true };

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

        const caseStudies = await prisma.caseStudy.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
        });

        return NextResponse.json({ success: true, status: 200, data: caseStudies }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}

// POST /api/v1/case-studies — admin only: create a case study.
export async function POST(req: NextRequest) {
    try {
        const { error: authError } = await assertAdmin();
        if (authError) return authError;

        const payload = await req.json();

        const validator = vine.compile(apiCaseStudyCreateSchema);
        const output = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter(),
        });

        const caseStudy = await prisma.caseStudy.create({
            data: {
                ...filterUndefined(output),
                sortOrder: output.sortOrder ?? 0,
                published: output.published ?? true,
            } as Prisma.CaseStudyCreateInput,
        });

        return NextResponse.json({ success: true, status: 201, data: caseStudy }, { status: 201 });

    } catch (error: any) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
                { success: false, status: error.status, message: error.messages },
                { status: error.status }
            );
        }
        if (error?.code === 'P2002') {
            return NextResponse.json(
                { success: false, status: 409, message: 'A case study with this slug already exists.' },
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
