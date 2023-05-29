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
require("reflect-metadata");
const menu_repository_1 = __importDefault(require("../database/repositories/menu.repository"));
const http_error_1 = __importDefault(require("../utils/http-error"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const menu_item_service_1 = __importDefault(require("./menu-item.service"));
const menu_extra_service_1 = __importDefault(require("./menu-extra.service"));
class MenuService {
    constructor() {
        this.menuRepository = new menu_repository_1.default();
        this.menuItemService = new menu_item_service_1.default();
        this.menuExtraService = new menu_extra_service_1.default();
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const menus = yield this.menuRepository.readAll();
            return menus;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = yield this.menuRepository.readOne(id);
            return menu;
        });
    }
    readFiltered(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = yield this.menuRepository.readFiltered(field, value);
            return menu;
        });
    }
    readByDate(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const menus = yield this.menuRepository.readByDate(start, end);
            return menus;
        });
    }
    readComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = yield this.menuRepository.readOne(id);
            const items = yield this.menuItemService.readByMenuId(id);
            const sales = yield this.menuItemService.readSalesReport(id);
            const ushers = yield this.menuItemService.readUshersReport(id);
            const extras = yield this.menuExtraService.readByMenuId(id);
            return { menu, items, sales, ushers, extras };
        });
    }
    create(menu) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newId = yield this.menuRepository.create(menu);
                return newId;
            }
            catch (error) {
                throw new http_error_1.default(400, error.message || "Bad request");
            }
        });
    }
    clearActiveMenus() {
        return __awaiter(this, void 0, void 0, function* () {
            const activeMenus = yield this.menuRepository.readFiltered("status", "ACTIVE");
            for (const menu of activeMenus) {
                menu.status = "FINISHED";
                yield this.menuRepository.update(menu);
            }
        });
    }
    update(menu) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (menu.status === "ACTIVE") {
                    yield this.clearActiveMenus();
                }
                yield this.menuRepository.update(menu);
                return menu;
            }
            catch (error) {
                throw new http_error_1.default(error.status || 400, error.message || "Bad request");
            }
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedRows = yield this.menuRepository.deleteOne(id);
            if (deletedRows !== 0) {
                jet_logger_1.default.info(`Menu with id:${id} deleted`);
            }
            else {
                throw new http_error_1.default(404, "Menu not found");
            }
        });
    }
}
exports.default = MenuService;
//# sourceMappingURL=menu.service.js.map