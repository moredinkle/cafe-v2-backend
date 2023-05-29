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
const order_repository_1 = __importDefault(require("../database/repositories/order.repository"));
const http_error_1 = __importDefault(require("../utils/http-error"));
const jet_logger_1 = __importDefault(require("jet-logger"));
class OrderService {
    constructor() {
        this.OrderRepository = new order_repository_1.default();
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.OrderRepository.readAll();
            return orders;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.OrderRepository.readOne(id);
            return order;
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newId = yield this.OrderRepository.create(order);
                return newId;
            }
            catch (error) {
                throw new http_error_1.default(400, error.message || "Bad request");
            }
        });
    }
    update(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exisitingOrder = yield this.readOne(order.id);
                if (exisitingOrder) {
                    yield this.OrderRepository.update(order);
                }
                else {
                    throw new http_error_1.default(404, "Order not found");
                }
            }
            catch (error) {
                throw new http_error_1.default(400, error.message || "Bad request");
            }
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedRows = yield this.OrderRepository.deleteOne(id);
            if (deletedRows !== 0) {
                jet_logger_1.default.info(`Order with id:${id} deleted`);
            }
            else {
                throw new http_error_1.default(404, "Order not found");
            }
        });
    }
}
exports.default = OrderService;
//# sourceMappingURL=order.service.js.map