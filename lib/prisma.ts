import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/lib/generated/prisma';
import { hasDatabaseConfig } from '@/lib/env';

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export function getPrismaClient() {
  if (!hasDatabaseConfig()) {
    return null;
  }

  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
    });
  }

  return global.prismaGlobal;
}
