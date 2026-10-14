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

// Maps the client-shaped career payload to the Career collection's storage field names.
const toCareerStorage = (d: CareerPayload) => ({
    name: d.name,
    email: d.email,
    phone: d.phone,
    title: d.title,
    slug: d.slug,
    company: d.company,
    experience_years: d.experience,
    current_ctc: d.currentCTC,
    expected_ctc: d.expectedCTC,
    notice_period: d.noticePeriod,
    resume_uri: d.resumeUri,
    resume_type: d.resumeType,
    resume_name: d.resumeName,
    resume_size: d.resumeSize,
    bio: d.bio,
    portfolio: d.portfolio,
});


export async function POST(req: NextRequest) {
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

        const existingEmail = await appDB.orm.Career.where({ email: validOutput.email }).first();




        // console.log("mailRes", mailRes);


        if (existingEmail) {
            // console.log(existingEmail);
            const leadCreatedAt = new Date(existingEmail.created_at);
            const currentDate = new Date();
            const daysDifference = Math.floor((currentDate.getTime() - leadCreatedAt.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDifference < 7) {
                const updatedLead = await appDB.orm.Career
                    .where({ email: validOutput.email })
                    .update(
                        filterUndefinedAndNull(toCareerStorage(filterUndefinedAndNull(validOutput) as CareerPayload)),
                    );

                return NextResponse.json(
                    {
                        dataId: updatedLead!._id,
                        ...updatedLead!,
                        success: false,
                        status: 200,
                        message: 'Thank you for reaching out to us. We have already received your details. Please allow us 7 days before submitting another request.',
                    }, { status: 200 });

            } else {
                const updatedLead = await appDB.orm.Career
                    .where({ email: validOutput.email })
                    .update(
                        filterUndefinedAndNull(toCareerStorage(filterUndefinedAndNull(validOutput) as CareerPayload)),
                    );

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
                    ...updatedLead!,
                    ...mailRes,
                    success: true,
                    status: 201,
                    message: `Thank you for applying for the position of ${updatedLead!.title} at ${process.env.SITE_DOMIN}. We appreciate your interest in joining our team. Our recruitment team will review your application and get back to you soon. If you have any questions or need further information, feel free to reach out to us.`,
                }, { status: 201 });
            }
        }

        const newLeadData = filterUndefinedAndNull(validOutput) as CareerPayload;

        const newLead = await appDB.orm.Career.create({
            ...toCareerStorage(newLeadData),
            // bio may be absent after filtering; write null explicitly so no undefined reaches the write path
            bio: newLeadData.bio ?? null,
            uuid: crypto.randomUUID(),
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
