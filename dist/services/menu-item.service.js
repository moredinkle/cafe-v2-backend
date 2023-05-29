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
const menu_item_repository_1 = __importDefault(require("../database/repositories/menu-item.repository"));
const http_error_1 = __importDefault(require("../utils/http-error"));
const jet_logger_1 = __importDefault(require("jet-logger"));
class MenuItemService {
    constructor() {
        this.menuItemRepository = new menu_item_repository_1.default();
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.menuItemRepository.readAll();
            return items;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.menuItemRepository.readOne(id);
            return item;
        });
    }
    readByMenuId(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.menuItemRepository.readByMenuId(menuId);
            return items;
        });
    }
    readFullReport(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.readByMenuId(menuId);
            const sales = yield this.readSalesReport(menuId);
            const ushers = yield this.readUshersReport(menuId);
            return { items, sales, ushers };
        });
    }
    readSalesReport(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = yield this.menuItemRepository.readMenuSalesReport(menuId);
            return sales;
        });
    }
    readUshersReport(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ushers = yield this.menuItemRepository.readMenuUshersReport(menuId);
            return ushers;
        });
    }
    create(menuItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newId = yield this.menuItemRepository.create(menuItem);
                return newId;
            }
            catch (error) {
                throw new http_error_1.default(400, error.message || "Bad request");
            }
        });
    }
    update(menuItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exisitingMenuItem = yield this.readOne(menuItem.id);
                if (exisitingMenuItem) {
                    yield this.menuItemRepository.update(menuItem);
                }
                else {
                    throw new http_error_1.default(404, "Menu item not found");
                }
            }
            catch (error) {
                throw new http_error_1.default(400, error.message || "Bad request");
            }
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedRows = yield this.menuItemRepository.deleteOne(id);
            if (deletedRows !== 0) {
                jet_logger_1.default.info(`MenuItem with id:${id} deleted`);
            }
            else {
                throw new http_error_1.default(404, "Menu item not found");
            }
        });
    }
}
exports.default = MenuItemService;
//# sourceMappingURL=menu-item.service.js.map