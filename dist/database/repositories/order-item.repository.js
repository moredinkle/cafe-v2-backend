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
const order_item_entity_1 = __importDefault(require("../db-entities/order-item.entity"));
class orderItemRepository {
    create(orderItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItemRepository = data_source_1.AppDataSource.getRepository(order_item_entity_1.default);
            const created = yield orderItemRepository.insert(orderItem);
            return created.generatedMaps[0].id;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(order_item_entity_1.default);
            let orderItems = yield repository.find();
            return orderItems ? orderItems.map((orderItem) => orderItem) : undefined;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(order_item_entity_1.default);
            let orderItem = yield repository.findOneBy({ id: id });
            return orderItem ? orderItem : undefined;
        });
    }
    // async readByMenuId(menuId: string):Promise<OrderItem[] | undefined> {
    //   const repository = AppDataSource.getRepository(OrderItemEntity);
    //   let orderItems = await repository.findBy({: menuId});
    //   return menuItems ? menuItems.map((menuItem) => menuItem as MenuItem) : undefined;
    // }
    update(orderItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(order_item_entity_1.default);
            const newValues = {
                quantity: orderItem.quantity,
                subtotal: orderItem.subtotal,
                menuItemId: orderItem.menuItemId,
                orderId: orderItem.orderId
            };
            yield repository.update(orderItem.id, newValues);
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(order_item_entity_1.default);
            let deleted = yield repository.delete({ id: id });
            return deleted.affected;
        });
    }
}
exports.default = orderItemRepository;
//# sourceMappingURL=order-item.repository.js.map