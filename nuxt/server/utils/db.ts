import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '~~/config/schema'
// @ts-ignore
import pkg from 'pg'

const config = useRuntimeConfig()

const { Pool } = pkg
export const connection = new Pool({
   connectionString: config.postgres.url
})

export const db = drizzle(connection, { schema })