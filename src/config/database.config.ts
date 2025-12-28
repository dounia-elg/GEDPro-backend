import { registerAs } from '@nestjs/config'

export const mongoConfig = registerAs('mongo', () => ({
    uri: process.env.MONGODB_URI,
}));

export const postgresConfig = registerAs('postgres', () => ({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
}));