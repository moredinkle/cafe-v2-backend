import { DataSource } from 'typeorm';
import { envConfig } from '../env-config';
import MenuEntity from './db-entities/menu.entity';
import OrderEntity from './db-entities/order.entity';
import MenuItemEntity from './db-entities/menu-item.entity';
import OrderItemEntity from './db-entities/order-item.entity';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envConfig.host,
    port: parseInt(envConfig.port) || 80,
    username: envConfig.username,
    password: envConfig.password,
    database: envConfig.database,
    synchronize: true,
    logging: false,
    entities: [MenuEntity, MenuItemEntity, OrderEntity, OrderItemEntity],
    subscribers: [],
    migrations: [],
})
