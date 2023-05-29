"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./database/data-source");
const env_config_1 = require("./env-config");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = __importDefault(require("./utils/error-middleware"));
const auth_middleware_1 = require("./utils/auth-middleware");
const menu_routes_1 = __importDefault(require("./API/routes/menu.routes"));
const menu_item_routes_1 = __importDefault(require("./API/routes/menu-item.routes"));
const order_routes_1 = __importDefault(require("./API/routes/order.routes"));
const order_item_routes_1 = __importDefault(require("./API/routes/order-item.routes"));
const menu_extra_routes_1 = __importDefault(require("./API/routes/menu-extra.routes"));
const user_routes_1 = __importDefault(require("./API/routes/user.routes"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const port = 3000;
        yield data_source_1.AppDataSource.initialize();
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        app.use((0, cookie_parser_1.default)());
        app.use((0, morgan_1.default)("dev"));
        app.use((0, cors_1.default)({
            origin: env_config_1.envConfig.frontendUri,
        }));
        app.use("/api/v2/menus", auth_middleware_1.authMiddleware, menu_routes_1.default);
        app.use("/api/v2/menus", auth_middleware_1.authMiddleware, menu_item_routes_1.default);
        app.use("/api/v2/menus", auth_middleware_1.authMiddleware, menu_extra_routes_1.default);
        app.use("/api/v2/orders", auth_middleware_1.authMiddleware, order_routes_1.default);
        app.use("/api/v2/orders", auth_middleware_1.authMiddleware, order_item_routes_1.default);
        app.use("/api/v2/auth", user_routes_1.default);
        app.use(error_middleware_1.default);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    });
}
startServer();
//# sourceMappingURL=app.js.map