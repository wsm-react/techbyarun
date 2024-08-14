export class EnvMailer {
    static SMTP_HOST: string = process.env.GODADDY_SMTP_HOST!
    static SMTP_PORT: string = process.env.GODADDY_SMTP_PORT!
    static SMTP_USER: string = process.env.GODADDY_SMTP_USER!
    static SMTP_PASSWORD: string = process.env.GODADDY_SMTP_PASSWORD!
    static EMAIL_FROM: string = process.env.GODADDY_EMAIL_FROM!
    static SMTP_SECURE: string = process.env.GODADDY_SMTP_SECURE!
};
