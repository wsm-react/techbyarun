import prisma from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';
import { assertAdmin, getSessionUser } from '@/lib/api-auth';
import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { apiCaseStudyUpdateSchema } from '@/validator/vine-schema';
import { filterUndefined } from '@/lib/function';
import { Prisma } from '@/generated/prisma/client';

type Params = { params: Promise<{ id: string }> };

async function findCaseStudy(idOrSlug: string) {
    return prisma.caseStudy.findFirst({ where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] } });
}

// GET /api/v1/case-studies/[id] — fetch one case study by id or slug (drafts visible to admins only).
export async function GET(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const caseStudy = await findCaseStudy(id);

        if (!caseStudy) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Case study not found.' },
                { status: 404 }
            );
        }

        if (!caseStudy.published) {
            const user = await getSessionUser();
            if (user?.role !== 'admin') {
                return NextResponse.json(
                    { success: false, status: 404, message: 'Case study not found.' },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json({ success: true, status: 200, data: caseStudy }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}

// PUT /api/v1/case-studies/[id] — admin only: update a case study (partial).
export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const { error: authError } = await assertAdmin();
        if (authError) return authError;

        const { id } = await params;
        const existing = await findCaseStudy(id);
        if (!existing) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Case study not found.' },
                { status: 404 }
            );
        }

        const payload = await req.json();

        const validator = vine.compile(apiCaseStudyUpdateSchema);
        const output = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter(),
        });

        const caseStudy = await prisma.caseStudy.update({
            where: { id: existing.id },
            data: filterUndefined(output) as Prisma.CaseStudyUpdateInput,
        });

        return NextResponse.json({ success: true, status: 200, data: caseStudy }, { status: 200 });

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

// DELETE /api/v1/case-studies/[id] — admin only: delete a case study by id or slug.
export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        const { error: authError } = await assertAdmin();
        if (authError) return authError;

        const { id } = await params;
        const existing = await findCaseStudy(id);
        if (!existing) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Case study not found.' },
                { status: 404 }
            );
        }

        await prisma.caseStudy.delete({ where: { id: existing.id } });

        return NextResponse.json(
            { success: true, status: 200, message: `Case study "${existing.slug}" deleted.` },
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
