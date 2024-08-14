// import { PrismaClient } from '@prisma/client';

// declare global {
//     var prisma: PrismaClient | undefined;
// }

// // Create an instance of PrismaClient
// const prisma = globalThis.prisma || new PrismaClient();

// // Assign the instance to the global object for development
// if (process.env.NODE_ENV !== 'production') {
//     globalThis.prisma = prisma;
// }

// export const appDB = prisma;


import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => { return new PrismaClient() };
declare const globalThis: { prismaGlobal: ReturnType<typeof prismaClientSingleton> } & typeof global;

let appDB = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = appDB;

export default appDB
