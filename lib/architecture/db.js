import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

/**
 * AstraVeda Database Singleton (Prisma 7 / ESM Compatible)
 * Configured with Postgres Native Adapter
 */
const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/astraveda_vault";

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
