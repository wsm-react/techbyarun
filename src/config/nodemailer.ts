// lib/email.ts
import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
    host: process.env.GODADDY_SMTP_HOST as string, // GoDaddy SMTP server
    port: Number(process.env.GODADDY_SMTP_PORT as string), // or 587
    secure: process.env.GODADDY_SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.GODADDY_SMTP_USER as string, // your GoDaddy email
        pass: process.env.GODADDY_SMTP_PASSWORD as string, // your GoDaddy email password
    },
} as nodemailer.TransportOptions); // Cast to TransportOptions

interface EmailOptions {
    to: string | string[];
    subject: string;
    html?: string;
    bcc?: string | string[];
    attachment?: { filename: string; path: string } | { filename: string; content: Buffer | string } | { filename: string; href: string } | ({ filename: string; path: string } | { filename: string; content: Buffer | string } | { filename: string; href: string })[] | null;
}

interface MailInfoResponse {
    messageId: string;
    response: string;
    accepted: string[];
    rejected: string[];
    pending?: string[];
}

export const SendEmailSingleRecipients = async ({ to, subject, html, bcc }: EmailOptions) => {
    const recipients = Array.isArray(to) ? to : (to ? [to] : []);
    const bccRecipients = Array.isArray(bcc) ? bcc : (bcc ? [bcc] : []);

    const mailOptions = {
        from: process.env.GODADDY_EMAIL_FROM as string,
        to: recipients.join(', '),
        subject,
        html,
        bcc: bccRecipients.join(', '),
    };

    try {
        // console.log("transporter", transporter);
        // console.log("mailOptions", mailOptions);
        const mailInfo = await transporter.sendMail(mailOptions) as unknown as MailInfoResponse;
        // console.log('Email sent successfully');
        return {
            mailsent: true,
            mailmsg: 'Email sent successfully',
            mailresponse: mailInfo.response,
            // mailrejected: mailInfo.rejected,
            // mailpending: mailInfo.pending,
        };
    } catch (error: any) {
        // console.error('Error sending email:', error);
        return {
            mailsent: false,
            mailmsg: 'Error sending email',
            mailresponse: error.message
        };
    }
};


export const SendEmailWithAttachmentToRecipients = async ({ to, subject, html, bcc, attachment }: EmailOptions) => {
    const recipients = Array.isArray(to) ? to : (to ? [to] : []);
    const bccRecipients = Array.isArray(bcc) ? bcc : (bcc ? [bcc] : []);

    const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.GODADDY_EMAIL_FROM as string,
        to: recipients.join(', '),
        subject,
        html,
        bcc: bccRecipients.join(', '),
        attachments: attachment ? (Array.isArray(attachment) ? attachment : [attachment]) : [],
        // Handle single, array, or null attachment
    };

    try {
        const mailInfo = await transporter.sendMail(mailOptions) as unknown as MailInfoResponse;
        return {
            mailsent: true,
            mailmsg: 'Email sent successfully',
            mailresponse: mailInfo.response,
        };
    } catch (error: any) {
        return {
            mailsent: false,
            mailmsg: 'Error sending email',
            mailresponse: error.message
        };
    }
};

export const SendEmailMultipalRecipients = async (
    { to, subject, html }: EmailOptions):
    Promise<{ success: boolean, results: { recipient: string, info?: MailInfoResponse, error?: string }[] }> => {

    const recipients = Array.isArray(to) ? to : [to];
    const results: { recipient: string, info?: MailInfoResponse, error?: string }[] = [];

    for (const recipient of recipients) {
        const mailOptions = {
            from: process.env.GODADDY_EMAIL_FROM as string,
            to: recipient,
            subject,
            html,
        };

        try {
            console.log("transporter", transporter);
            console.log("mailOptions", mailOptions);

            const info = await transporter.sendMail(mailOptions) as unknown as MailInfoResponse;
            console.log('Email sent successfully to', recipient);

            results.push({
                recipient,
                info: {
                    messageId: info.messageId,
                    response: info.response,
                    accepted: info.accepted,
                    rejected: info.rejected,
                    pending: info.pending,
                }
            });

        } catch (error) {
            console.error('Error sending email to', recipient, error);

            results.push({
                recipient,
                error: (error as Error).message
            });
        }
    }

    return {
        success: true,
        results
    };
};
