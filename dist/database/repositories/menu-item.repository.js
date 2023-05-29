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
const menu_item_entity_1 = __importDefault(require("../db-entities/menu-item.entity"));
class MenuItemRepository {
    create(menuItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const menuItemRepository = data_source_1.AppDataSource.getRepository(menu_item_entity_1.default);
            const created = yield menuItemRepository.insert(menuItem);
            return created.generatedMaps[0].id;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_item_entity_1.default);
            let MenuItems = yield repository.find();
            return MenuItems ? MenuItems.map((menuItem) => menuItem) : undefined;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_item_entity_1.default);
            let MenuItem = yield repository.findOneBy({ id: id });
            return MenuItem ? MenuItem : undefined;
        });
    }
    readByMenuId(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_item_entity_1.default);
            let menuItems = yield repository.findBy({ menuId: menuId });
            return menuItems ? menuItems.map((menuItem) => menuItem) : undefined;
        });
    }
    readMenuSalesReport(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = yield data_source_1.AppDataSource.query(`
    select mi.id, mi.name, mi.price, mi.stock, COALESCE(sum(oi.subtotal), 0) as subtotal, coalesce(sum(oi.quantity),0) as sold
    from "MenuItem" mi
    left join "OrderItem" oi
    on mi.id::text = oi."menuItemId"
	  join "Order" ord
	  on ord.id::text = oi."orderId"
    where mi."menuId" = '${menuId}' and ord."type" = 'VENTA'
	  group by mi.id, mi.name, mi.price
    order by subtotal desc
    `);
            return report ? report.map((row) => row) : undefined;
        });
    }
    readMenuUshersReport(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = yield data_source_1.AppDataSource.query(`
    select mi.id, mi.name, mi.price, mi.stock, COALESCE(sum(oi.subtotal), 0) as subtotal, coalesce(sum(oi.quantity),0) as sold
    from "MenuItem" mi
    left join "OrderItem" oi
    on mi.id::text = oi."menuItemId"
	  join "Order" ord
	  on ord.id::text = oi."orderId"
    where mi."menuId" = '${menuId}' and ord."type" = 'SERVIDOR'
	  group by mi.id, mi.name, mi.price
    order by subtotal desc
    `);
            return report ? report.map((row) => row) : undefined;
        });
    }
    update(menuItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_item_entity_1.default);
            const newValues = {
                name: menuItem.name,
                price: menuItem.price,
                stock: menuItem.stock,
            };
            yield repository.update(menuItem.id, newValues);
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(menu_item_entity_1.default);
            let deleted = yield repository.delete({ id: id });
            return deleted.affected;
        });
    }
}
exports.default = MenuItemRepository;
//# sourceMappingURL=menu-item.repository.js.map