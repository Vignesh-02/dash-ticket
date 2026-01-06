// src/db/prisma.config.ts
import 'dotenv/config';  // Loads .env automatically
import { defineConfig, env } from 'prisma/config';  // Official helpers (Prisma 7+)

// Export the config object (this is what the CLI parses)
export default defineConfig({
  // Path to your schema.prisma (adjust if not in ./prisma/)
  schema: './prisma/schema.prisma',  // Or 'src/db/prisma/schema.prisma'

  // Migrations setup (optional, but good for consistency)
  migrations: {
    path: './prisma/migrations',  // Adjust path as needed
    // seed: 'tsx ./prisma/seed.ts',  // Uncomment if you have seeds
  },

  // Database connection (auto-detects PostgreSQL adapter from URL)
  datasource: {
    url: env('DATABASE_URL'),  // Throws if missing—use process.env.DATABASE_URL ?? '' if optional
  },

  // Optional: Experimental flags (e.g., for external tables)
  experimental: {
    externalTables: false,  // Set to true if using external tables
  },
});