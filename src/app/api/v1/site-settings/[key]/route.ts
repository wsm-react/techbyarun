import prisma from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';
import { assertAdmin } from '@/lib/api-auth';
import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { apiSiteSettingSchema } from '@/validator/vine-schema';
import { Prisma } from '@/generated/prisma/client';

type Params = { params: Promise<{ key: string }> };

// GET /api/v1/site-settings/[key] — public: one setting by key.
export async function GET(_req: NextRequest, { params }: Params) {
    try {
        const { key } = await params;
        const setting = await prisma.siteSetting.findUnique({ where: { key } });

        if (!setting) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Setting not found.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, status: 200, data: setting }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}

// PUT /api/v1/site-settings/[key] — admin only: upsert a setting value.
export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const { error: authError } = await assertAdmin();
        if (authError) return authError;

        const { key } = await params;
        const payload = await req.json();

        const validator = vine.compile(apiSiteSettingSchema);
        const output = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter(),
        });

        if (output.value === undefined) {
            return NextResponse.json(
                { success: false, status: 422, message: 'A "value" field is required.' },
                { status: 422 }
            );
        }

        const setting = await prisma.siteSetting.upsert({
            where: { key },
            create: { key, value: output.value as Prisma.InputJsonValue },
            update: { value: output.value as Prisma.InputJsonValue },
        });

        return NextResponse.json({ success: true, status: 200, data: setting }, { status: 200 });

    } catch (error: any) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
                { success: false, status: error.status, message: error.messages },
                { status: error.status }
            );
        }
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}

// DELETE /api/v1/site-settings/[key] — admin only: remove a setting.
export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        const { error: authError } = await assertAdmin();
        if (authError) return authError;

        const { key } = await params;
        const existing = await prisma.siteSetting.findUnique({ where: { key } });
        if (!existing) {
            return NextResponse.json(
                { success: false, status: 404, message: 'Setting not found.' },
                { status: 404 }
            );
        }

        await prisma.siteSetting.delete({ where: { key } });

        return NextResponse.json(
            { success: true, status: 200, message: `Setting "${key}" deleted.` },
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
