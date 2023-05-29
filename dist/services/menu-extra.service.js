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
const menu_extra_repository_1 = __importDefault(require("../database/repositories/menu-extra.repository"));
const http_error_1 = __importDefault(require("../utils/http-error"));
const jet_logger_1 = __importDefault(require("jet-logger"));
class MenuExtraService {
    constructor() {
        this.menuExtraRepository = new menu_extra_repository_1.default();
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.menuExtraRepository.readAll();
            return items;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.menuExtraRepository.readOne(id);
            return item;
        });
    }
    readByMenuId(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.menuExtraRepository.readByMenuId(menuId);
            return items;
        });
    }
    create(menuExtra) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newId = yield this.menuExtraRepository.create(menuExtra);
                return newId;
            }
            catch (error) {
                throw new http_error_1.default(400, error.message || "Bad request");
            }
        });
    }
    update(menuExtra) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exisitingmenuExtra = yield this.readOne(menuExtra.id);
                if (exisitingmenuExtra) {
                    yield this.menuExtraRepository.update(menuExtra);
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
            const deletedRows = yield this.menuExtraRepository.deleteOne(id);
            if (deletedRows !== 0) {
                jet_logger_1.default.info(`menuExtra with id:${id} deleted`);
            }
            else {
                throw new http_error_1.default(404, "Menu item not found");
            }
        });
    }
}
exports.default = MenuExtraService;
//# sourceMappingURL=menu-extra.service.js.map