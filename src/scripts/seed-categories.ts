import dotenv from 'dotenv'
dotenv.config()
import { drizzle } from 'drizzle-orm/node-postgres'
import { categories } from '@/db/schema'
// const db = require('../db')
// const categories = require('../db/schema')

const { POSTGRES_USER, POSTGRES_PASSWORD } = process.env
const db = drizzle(
  `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/postgres`
)

const categoryNames = [
  'Cars and vehicles',
  'Comedy',
  'Education',
  'Gaming',
  'Entertainment',
  'Film and animation',
  'How-to and style',
  'Music',
  'News and politics',
  'People and blogs',
  'Pets and animals',
  'Science and technology',
  'Sports',
  'Travel and events',
]

async function main() {
  console.log('Seeding categories...')

  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`,
    }))
    await db.insert(categories).values(values)

    console.log('Categories seeded successfully!')
  } catch (error) {
    console.log('Error seeding categories: ', error)
  }
}

main()
