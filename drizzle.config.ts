import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.NEXT_PUBLIC_DB_HOST!,
    user: process.env.NEXT_PUBLIC_DB_USER!,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD!,
    database: process.env.NEXT_PUBLIC_DB_NAME!,
  },
});