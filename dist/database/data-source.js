"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_config_1 = require("../env-config");
const menu_entity_1 = __importDefault(require("./db-entities/menu.entity"));
const order_entity_1 = __importDefault(require("./db-entities/order.entity"));
const menu_item_entity_1 = __importDefault(require("./db-entities/menu-item.entity"));
const order_item_entity_1 = __importDefault(require("./db-entities/order-item.entity"));
const menu_extra_entity_1 = __importDefault(require("./db-entities/menu-extra.entity"));
const user_entity_1 = __importDefault(require("./db-entities/user.entity"));
exports.AppDataSource = new typeorm_1.DataSource({
    url: env_config_1.envConfig.dbUrl,
    type: "postgres",
    // host: envConfig.host,
    // port: parseInt(envConfig.port) || 80,
    // username: envConfig.username,
    // password: envConfig.password,
    // database: envConfig.database,
    synchronize: true,
    logging: false,
    entities: [menu_entity_1.default, menu_item_entity_1.default, order_entity_1.default, order_item_entity_1.default, menu_extra_entity_1.default, user_entity_1.default],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=data-source.js.map