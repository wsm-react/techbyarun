export class EnvMailer {
    static SMTP_HOST: string = process.env.GODADDY_SMTP_HOST!
    static SMTP_PORT: string = process.env.GODADDY_SMTP_PORT!
    static SMTP_USER: string = process.env.GODADDY_SMTP_USER!
    static SMTP_PASSWORD: string = process.env.GODADDY_SMTP_PASSWORD!
    static EMAIL_FROM: string = process.env.GODADDY_EMAIL_FROM!
    static SMTP_SECURE: string = process.env.GODADDY_SMTP_SECURE!
};

export class EnvApp {
    static SITE_DOMIN: string = process.env.SITE_DOMIN!
    static SITE_URL: string = process.env.SITE_URL!
    static AUTH_SECRET: string = process.env.NEXTAUTH_SECRET!
};

export class EnvFirebase {
    static API_KEY: string = process.env.FIREBASE_API_KEY!
    static AUTH_DOMAIN: string = process.env.FIREBASE_AUTH_DOMAIN!
    static PROJECT_ID: string = process.env.FIREBASE_PROJECT_ID!
    static STORAGE_BUCKET: string = process.env.FIREBASE_STORAGE_BUCKET!
    static MESSAGING_SENDER_ID: string = process.env.FIREBASE_MESSAGING_SENDER_ID!
    static APP_ID: string = process.env.FIREBASE_APP_ID!
    static MEASUREMENT_ID: string = process.env.FIREBASE_MEASUREMENT_ID!
};

// export class EnvEmails {
//     static SMTP_HOST: string = process.env.GODADDY_SMTP_HOST!
//     static SMTP_PORT: string = process.env.GODADDY_SMTP_PORT!
//     static SMTP_USER: string = process.env.GODADDY_SMTP_USER!
//     static SMTP_PASSWORD: string = process.env.GODADDY_SMTP_PASSWORD!
//     static EMAIL_FROM: string = process.env.GODADDY_EMAIL_FROM!
//     static SMTP_SECURE: string = process.env.GODADDY_SMTP_SECURE!
// };
