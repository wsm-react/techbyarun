import { AuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';

// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email id", type: "text", placeholder: "Enter email id." },
                password: { label: "Password", type: "password", placeholder: "Enter password." }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", email: credentials?.email, password: credentials?.password }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);

            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user as any;

            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    // adapter: PrismaAdapter(appDB),
};
