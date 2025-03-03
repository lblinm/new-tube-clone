import { drizzle } from 'drizzle-orm/node-postgres'

const { POSTGRES_USER, POSTGRES_PASSWORD } = process.env

export const db = drizzle(
  `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/postgres`
)
