import { PrismaClient } from '../generated/prisma/client';
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
}

// Check DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in your .env file");
}


export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter,                            // ← the instance, not an object!
  log: ['query', 'info', 'warn', 'error'],
});

// export const prisma = globalForPrisma.prisma ?? new PrismaClient({
//     adapter: { url : process.env.DATABASE_URL  },
//         log: ['query', 'info', 'warn', 'error'], // optional logging for debugging
// });


if (process.env.NODE_ENV !== 'production'){
    globalForPrisma.prisma = prisma;
}