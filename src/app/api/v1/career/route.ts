// @tsnocheck

import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';

import appDB from '@/lib/database';
import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { filterUndefinedAndNull } from '@/lib/function';
import { CareerPayload } from '@/types/api-interface';
import { ApiCareerSchema } from '@/validator/vine-schema';

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const payload: CareerPayload = await req.json();

        const validator = vine.compile(ApiCareerSchema);
        const validOutput = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter()
        });

        // console.log("Validation output:", validOutput);

        const existingEmail = await appDB.career.findFirst({
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
                        ...validOutput,
                        success: false,
                        status: 200,
                        message: 'Thank you for reaching out to us. We have already received your details. Please allow us 7 days before submitting another request.',
                    }, { status: 200 });
            } else {
                const updatedLead = await appDB.career.update({
                    where: {
                        email: validOutput.email,
                    },
                    data: filterUndefinedAndNull(validOutput as CareerPayload),
                });

                return NextResponse.json({
                    success: true,
                    status: 201,
                    message: 'Your contact information has been successfully updated. Thank you for reaching out to us.',
                }, { status: 201 });
            }
        }

        const newLeadData = filterUndefinedAndNull(validOutput) as CareerPayload;

        const newLead = await appDB.career.create({
            // @ts-ignore
            data: newLeadData,
        });

        return NextResponse.json({ ...newLead, success: true, status: 201, message: 'New lead created for new user.', }, { status: 201 });

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
