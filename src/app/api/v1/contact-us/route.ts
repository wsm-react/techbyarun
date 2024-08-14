// @ts-nocheck

import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';

import { ContectUsPayload } from '@/types/api-interface';
import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { filterUndefinedAndNull } from '@/lib/function';

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const payload: ContectUsPayload = await req.json();

        const validator = vine.compile(ApiContectUsSchema);
        const validOutput = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter()
        });

        // console.log("Validation output:", validOutput);

        const existingEmail = await appDB.contectUs.findFirst({
            where: {
                email: validOutput.email,
            },
        });

        if (existingEmail) {
            const leadCreatedAt = new Date(existingEmail.createdAt);
            const now = new Date();
            const daysDifference = Math.floor((now.getTime() - leadCreatedAt.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDifference < 7) {
                return NextResponse.json(
                    {
                        success: false,
                        status: 200,
                        ...validOutput,
                        // message: 'We already have your details. Please wait 7 days before submitting again.',
                        message: 'Thank you for reaching out to us. We have already received your details. Please allow us 7 days before submitting another request.',
                    }, { status: 200 });
            } else {
                const updatedLead = await appDB.contectUs.update({
                    where: {
                        email: validOutput.email,
                    },
                    data: filterUndefinedAndNull(validOutput as ContectUsPayload),
                });

                return NextResponse.json({
                    success: true,
                    status: 201,
                    message: 'Your contact information has been successfully updated. Thank you for reaching out to us.',
                }, { status: 201 });
            }
        }

        const newLeadData = filterUndefinedAndNull(validOutput) as ContectUsPayload;

        const newLead = await appDB.contectUs.create({
            data: newLeadData,
        });

        return NextResponse.json({ success: true, status: 201, ...newLead, message: 'New lead created for new user.', }, { status: 201 });

    } catch (error: any) {
        // console.log(error);
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
                { success: false, status: error.status, message: error.messages },
                { status: error.status }
            );
        }
    }
}
