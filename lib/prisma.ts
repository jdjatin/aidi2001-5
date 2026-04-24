import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/lib/generated/prisma';
import { hasDatabaseConfig } from '@/lib/env';

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

function normalizeDatabaseUrl(connectionString: string) {
  try {
    const url = new URL(connectionString);
    const sslMode = url.searchParams.get('sslmode');

    // pg now warns when legacy sslmode aliases are used implicitly.
    // Preserve the current secure behavior by making it explicit.
    if (sslMode === 'prefer' || sslMode === 'require' || sslMode === 'verify-ca') {
      url.searchParams.set('sslmode', 'verify-full');
      return url.toString();
    }

    return connectionString;
  } catch {
    return connectionString;
  }
}

export function getPrismaClient() {
  if (!hasDatabaseConfig()) {
    return null;
  }

  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL!),
      }),
    });
  }

  return global.prismaGlobal;
}
