import pg from 'pg'
import * as fs from 'node:fs'
import { defineConfig } from '@adonisjs/lucid'

const { Client } = pg

const env = {
  get: (key) => {
    const config = {
      DB_HOST: 'free-db-10759.7tc.aws-eu-central-1.cockroachlabs.cloud',
      DB_PORT: 26257,
      DB_USER: 'thomas',
      DB_PASSWORD: '4pTUCmNAdPSUnHJ4Gz-FwA',
      DB_DATABASE: 'postgres',
    }
    return config[key]
  },
}

try {
  const dbConfig = defineConfig({
    connection: 'postgres',
    connections: {
      postgres: {
        client: 'pg',
        connection: {
          host: env.get('DB_HOST'),
          port: env.get('DB_PORT'),
          user: env.get('DB_USER'),
          password: env.get('DB_PASSWORD'),
          database: env.get('DB_DATABASE'),
          ssl: {
            rejectUnauthorized: false,
            ca: fs.readFileSync('./root.crt').toString(),
          },
        },
        migrations: {
          naturalSort: true,
          paths: ['database/migrations'],
        },
      },
    },
  })

  // Créer un client et tester la connexion
  const client = new Client({
    host: env.get('DB_HOST'),
    port: env.get('DB_PORT'),
    user: env.get('DB_USER'),
    password: env.get('DB_PASSWORD'),
    database: env.get('DB_DATABASE'),
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync('./root.crt').toString(),
    },
  })

  client.connect((err) => {
    if (err) {
      console.error('Database connection error:', err.stack)
    } else {
      console.log('Connected to the database successfully')
    }
    client.end()
  })
} catch (error) {
  console.error('Database configuration error:', error)
}
