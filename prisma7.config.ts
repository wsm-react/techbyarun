import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Prisma ORM v7 configuration (discovered by the Prisma 7 CLI)
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'] as string,
  },
});
