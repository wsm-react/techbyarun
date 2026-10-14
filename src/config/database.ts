import mongo from '@prisma/orm-mongo/runtime';
import type { Contract } from '../../prisma/contract.d';
import contractJson from '../../prisma/contract.json' with { type: 'json' };

// Module-level singleton (Prisma ORM 8 Mongo client pattern — created once per process)
const appDB = mongo<Contract>({
  contractJson,
  url: process.env.DATABASE_URL as string,
});

export default appDB;
