import { DataSource } from 'typeorm';
import { envConfig } from '../env-config';
export const AppDataSource = new DataSource({
    type: "postgres",
    host: envConfig.host,
    port: parseInt(envConfig.port) || 80,
    username: envConfig.username,
    password: envConfig.password,
    database: envConfig.database,
    synchronize: true,
    logging: false,
    entities: [],
    subscribers: [],
    migrations: [],
})
