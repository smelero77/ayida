import { PrismaClient } from "@prisma/client";

import { env } from "~/env";
import { PRISMA_CONFIG } from "~/server/lib/constants";

const createPrismaClient = () =>
  new PrismaClient({
    log: PRISMA_CONFIG.LOG_LEVEL === 'query' 
      ? ["query", "error", "warn"] 
      : PRISMA_CONFIG.LOG_LEVEL === 'info'
      ? ["info", "error", "warn"]
      : PRISMA_CONFIG.LOG_LEVEL === 'warn'
      ? ["error", "warn"]
      : ["error"], // Solo errores por defecto
  });

// Cliente específico para ETL con logging mínimo
const createETLPrismaClient = () =>
  new PrismaClient({
    log: ["error"], // Solo errores para procesos ETL
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
  prismaETL: ReturnType<typeof createETLPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

// Cliente ETL separado para procesos de sincronización
export const dbETL = globalForPrisma.prismaETL ?? createETLPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
  globalForPrisma.prismaETL = dbETL;
}
