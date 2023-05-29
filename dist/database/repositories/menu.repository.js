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
const menu_entity_1 = __importDefault(require("../db-entities/menu.entity"));
class MenuRepository {
    create(menu) {
        return __awaiter(this, void 0, void 0, function* () {
            const menuRepository = data_source_1.AppDataSource.getRepository(menu_entity_1.default);
            const created = yield menuRepository.insert(menu);
            return created.generatedMaps[0].id;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_entity_1.default);
            let menus = yield repository.createQueryBuilder("Menu")
                .orderBy("Menu.date", "DESC")
                .getMany();
            return menus ? menus.map((menu) => menu) : undefined;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_entity_1.default);
            let Menu = yield repository.findOneBy({ id: id });
            return Menu ? Menu : undefined;
        });
    }
    readFiltered(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_entity_1.default);
            let menus = yield repository.createQueryBuilder("Menu")
                .where(`Menu.${field} = '${value}'`)
                .getMany();
            return menus ? menus.map((menu) => menu) : undefined;
        });
    }
    readByDate(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_entity_1.default);
            let menus = yield repository.createQueryBuilder("Menu")
                .where('Menu.date >= :start', { start: start })
                .andWhere('Menu.date <= :end', { end: end })
                .orderBy("Menu.date", "DESC")
                .getMany();
            return menus ? menus.map((menu) => menu) : undefined;
        });
    }
    update(menu) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_entity_1.default);
            const newValues = {
                status: menu.status
            };
            yield repository.update(menu.id, newValues);
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_entity_1.default);
            let deleted = yield repository.delete({ id: id });
            return deleted.affected;
        });
    }
}
exports.default = MenuRepository;
//# sourceMappingURL=menu.repository.js.map