import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '../database/schema'

const client = createClient({ url: 'file:.data/db.sqlite3' })

export const db = drizzle(client, { schema })
