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
const data_source_1 = require("../data-source");
const menu_extra_entity_1 = __importDefault(require("../db-entities/menu-extra.entity"));
class MenuExtraRepository {
    create(menuExtra) {
        return __awaiter(this, void 0, void 0, function* () {
            const menuExtraRepository = data_source_1.AppDataSource.getRepository(menu_extra_entity_1.default);
            const created = yield menuExtraRepository.insert(menuExtra);
            return created.generatedMaps[0].id;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_extra_entity_1.default);
            let menuExtras = yield repository.find();
            return menuExtras ? menuExtras.map((menuExtra) => menuExtra) : undefined;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_extra_entity_1.default);
            let menuExtra = yield repository.findOneBy({ id: id });
            return menuExtra ? menuExtra : undefined;
        });
    }
    readByMenuId(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_extra_entity_1.default);
            let menuExtras = yield repository.findBy({ menuId: menuId });
            return menuExtras ? menuExtras.map((menuExtra) => menuExtra) : undefined;
        });
    }
    update(menuExtra) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_extra_entity_1.default);
            const newValues = {
                description: menuExtra.description,
                amount: menuExtra.amount,
                type: menuExtra.type,
            };
            yield repository.update(menuExtra.id, newValues);
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_extra_entity_1.default);
            let deleted = yield repository.delete({ id: id });
            return deleted.affected;
        });
    }
}
exports.default = MenuExtraRepository;
//# sourceMappingURL=menu-extra.repository.js.map