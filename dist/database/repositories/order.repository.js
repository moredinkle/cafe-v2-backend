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
const order_entity_1 = __importDefault(require("../db-entities/order.entity"));
class orderRepository {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderRepository = data_source_1.AppDataSource.getRepository(order_entity_1.default);
            const created = yield orderRepository.insert(order);
            return created.generatedMaps[0].id;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(order_entity_1.default);
            let orders = yield repository.find();
            return orders ? orders.map((order) => order) : undefined;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(order_entity_1.default);
            let order = yield repository.findOneBy({ id: id });
            return order ? order : undefined;
        });
    }
    update(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(order_entity_1.default);
            const newValues = {
                total: order.total,
                payedWith: order.payedWith,
                change: order.change,
                type: order.type
            };
            yield repository.update(order.id, newValues);
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(order_entity_1.default);
            let deleted = yield repository.delete({ id: id });
            return deleted.affected;
        });
    }
}
exports.default = orderRepository;
//# sourceMappingURL=order.repository.js.map