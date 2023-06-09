import {config} from "dotenv";

config();

export const envConfig = {
    type: process.env.DB_TYPE || '',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DATABASE || '',
    frontendUri: process.env.FRONTEND_URI || '',
    dbUrl: process.env.DB_URL || '',
    jwtSecret: process.env.JWT_SECRET || ''
}