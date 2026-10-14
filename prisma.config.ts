import 'dotenv/config';
import { definePrismaConfig } from 'prisma/config';
import { defineConfig as ormConfig, prisma6Schema } from '@prisma/orm-mongo/config';

export default definePrismaConfig({
  orm: ormConfig({
    contract: prisma6Schema('prisma/schema.prisma'),
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
});
