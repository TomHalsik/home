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
          rejectUnauthorized: true,
          ca: fs.readFileSync('./root.crt').toString(),
        },
      },
      migrations: {},
    },
  },
})

export default dbConfig
