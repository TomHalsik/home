import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'
import * as fs from 'node:fs'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        connectionString: env.get('DB_URL'),
        ssl: {
          rejectUnauthorized: false,
          ca: fs.readFileSync('./root.crt').toString(),
        },
      },
      migrations: {
        tableName: 'adonis_schema',
      },
    },
  },
})

export default dbConfig
