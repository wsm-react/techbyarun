// @tsnocheck

import { NextRequest, NextResponse } from 'next/server';
import vine, { errors } from '@vinejs/vine';


import { JSONAPIErrorReporter } from '@/validator/error-reporter';
import { filterUndefinedAndNull } from '@/lib/function';
import { CareerPayload } from '@/types/api-interface';
import { ApiCareerSchema } from '@/validator/vine-schema';
import appDB from '@/config/database';
import { EnvApp, EnvMailer } from '@/helpers/constants';
import { SendEmailSingleRecipients, SendEmailWithAttachmentToRecipients } from '@/config/nodemailer';
import { RenderMailTemplate } from '@/helpers/mailer-template';


export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const payload: CareerPayload = await req.json();


        // console.log("data payload:", payload);

        const validator = vine.compile(ApiCareerSchema);
        const output = await validator.validate(payload, {
            errorReporter: () => new JSONAPIErrorReporter()
        });

        // console.log("Validation output:", output);

        const dataHtml = await RenderMailTemplate('career.ejs', { title: "contact us email", name: output.name, email: output.email, mobile: output.phone, });

        const validOutput = {
            ...output,
            currentCTC: output.currentCTC.toString(),
            expectedCTC: output.expectedCTC.toString(),
        }

        const existingEmail = await appDB.career.findFirst({
            where: { email: validOutput.email },
        });




        // console.log("mailRes", mailRes);


        if (existingEmail) {
            // console.log(existingEmail);
            const leadCreatedAt = new Date(existingEmail.createdAt);
            const currentDate = new Date();
            const daysDifference = Math.floor((currentDate.getTime() - leadCreatedAt.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDifference < 7) {
                const updatedLead = await appDB.career.update({
                    where: { email: validOutput.email },
                    // @ts-ignore
                    data: filterUndefinedAndNull(validOutput as CareerPayload),
                });

                return NextResponse.json(
                    {
                        dataId: updatedLead.id,
                        ...updatedLead,
                        success: false,
                        status: 200,
                        message: 'Thank you for reaching out to us. We have already received your details. Please allow us 7 days before submitting another request.',
                    }, { status: 200 });

            } else {
                const updatedLead = await appDB.career.update({
                    where: { email: validOutput.email },
                    // @ts-ignore
                    data: filterUndefinedAndNull(validOutput as CareerPayload),
                });

                const mailRes = await SendEmailWithAttachmentToRecipients({
                    to: output.email,
                    subject: 'Thank You for Contacting Clinch Wealth',
                    html: dataHtml,
                    bcc: ["clinchwealth@gmail.com", "info@clinchwealth.com"],
                    attachment: {
                        filename: output.resumeName,
                        path: output.resumeUri,
                    }
                });

                return NextResponse.json({
                    ...updatedLead,
                    ...mailRes,
                    success: true,
                    status: 201,
                    message: `Thank you for applying for the position of ${updatedLead.title} at ${process.env.SITE_DOMIN}. We appreciate your interest in joining our team. Our recruitment team will review your application and get back to you soon. If you have any questions or need further information, feel free to reach out to us.`,
                }, { status: 201 });
            }
        }

        const newLeadData = filterUndefinedAndNull(validOutput) as CareerPayload;

        const newLead = await appDB.career.create({
            // @ts-ignore
            data: newLeadData,
        });

        const mailRes = await SendEmailWithAttachmentToRecipients({
            to: output.email,
            subject: 'Thank You for Contacting Clinch Wealth',
            html: dataHtml,
            bcc: ["clinchwealth@gmail.com", "info@clinchwealth.com"],
            attachment: {
                filename: output.resumeName,
                path: output.resumeUri,
            }
        });

        return NextResponse.json({
            ...newLead,
            ...mailRes,
            success: true,
            status: 201,
            message: `Thank you for applying for the position of ${newLeadData.title} at ${process.env.SITE_DOMIN}. We appreciate your interest in joining our team. Our recruitment team will review your application and get back to you soon. If you have any questions or need further information, feel free to reach out to us.`,
        }, { status: 201 });

    } catch (error: any) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            // console.log("error.status ", error.status);

            return NextResponse.json(
                { success: false, status: error.status, message: error.messages },
                { status: error.status }
            );
        }
    }
}
