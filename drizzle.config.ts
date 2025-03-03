import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config()
const { POSTGRES_USER, POSTGRES_PASSWORD } = process.env

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/postgres`,
  },
})
