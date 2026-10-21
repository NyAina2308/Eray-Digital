import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Database } from './types.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = join(__dirname, '..', 'data', 'db.json')

const EMPTY_DB: Database = { projects: [], messages: [], testimonials: [] }

function ensureDbFile() {
  if (!existsSync(DB_PATH)) {
    mkdirSync(dirname(DB_PATH), { recursive: true })
    writeFileSync(DB_PATH, JSON.stringify(EMPTY_DB, null, 2))
  }
}

export function readDb(): Database {
  ensureDbFile()
  const raw = readFileSync(DB_PATH, 'utf-8')
  // Fills in collections added after the file was created (e.g. testimonials)
  return { ...EMPTY_DB, ...(JSON.parse(raw) as Partial<Database>) }
}

export function writeDb(db: Database) {
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
}
