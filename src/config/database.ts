import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@/generated/prisma/client';

// Builds the MariaDB/MySQL connection from the mysql:// DATABASE_URL.
function createAdapter(databaseUrl: string): PrismaMariaDb {
  const url = new URL(databaseUrl);
  return new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, '') || undefined,
    connectionLimit: 5,
  });
}

// Reuse one client across hot reloads in development (and one per serverless instance in production).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: createAdapter(process.env.DATABASE_URL as string),
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
