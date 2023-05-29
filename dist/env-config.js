"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.envConfig = {
    type: process.env.DB_TYPE || '',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DATABASE || '',
    frontendUri: process.env.FRONTEND_URI || '',
    dbUrl: process.env.DB_URL || '',
    jwtSecret: process.env.JWT_SECRET || ''
};
//# sourceMappingURL=env-config.js.map