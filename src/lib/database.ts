import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

// Create an instance of PrismaClient
const prisma = globalThis.prisma || new PrismaClient();

// Assign the instance to the global object for development
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}

export const appDB = prisma; 
