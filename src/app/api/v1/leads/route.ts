import appDB from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';
import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { apiLeadCaptureSchema } from '@/validator/vine-schema';


export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        const validator = vine.compile(apiLeadCaptureSchema);
        const output = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter(),
        });

        const user = await appDB.orm.User.where({ email: output.email }).first();
        if (!user) {
            return NextResponse.json({
                success: false,
                status: 404,
                message: 'No account found for this email. Please register first.',
            }, { status: 404 });
        }

        const newLead = await appDB.orm.Leads.create({
            name: output.name,
            email: output.email,
            mobile: output.mobile,
            user_id: user._id,
        });

        return NextResponse.json({
            success: true,
            status: 201,
            message: 'Lead captured successfully.',
            data: { id: newLead._id },
        }, { status: 201 });

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
