import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
    namespace Nodels {
        interface Global {
            prisma: PrismaClient;
        }
    }
}


if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient;

} else {
    if (!global.prisma)
}


// https://www.youtube.com/watch?v=JYcOAzs_Q4A
