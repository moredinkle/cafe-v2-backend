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
const order_item_repository_1 = __importDefault(require("../database/repositories/order-item.repository"));
const http_error_1 = __importDefault(require("../utils/http-error"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const menu_item_service_1 = __importDefault(require("./menu-item.service"));
class OrderItemService {
    constructor() {
        this.OrderItemRepository = new order_item_repository_1.default();
        this.menuItemService = new menu_item_service_1.default();
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield this.OrderItemRepository.readAll();
            return orderItems;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItem = yield this.OrderItemRepository.readOne(id);
            return orderItem;
        });
    }
    create(orderItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newId = yield this.OrderItemRepository.create(orderItem);
                const menuItem = yield this.menuItemService.readOne(orderItem.menuItemId);
                menuItem.stock = menuItem.stock - orderItem.quantity;
                yield this.menuItemService.update(menuItem);
                return newId;
            }
            catch (error) {
                throw new http_error_1.default(400, error.message || "Bad request");
            }
        });
    }
    update(orderItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exisitingOrderItem = yield this.readOne(orderItem.id);
                if (exisitingOrderItem) {
                    yield this.OrderItemRepository.update(orderItem);
                }
                else {
                    throw new http_error_1.default(404, "Order item not found");
                }
            }
            catch (error) {
                throw new http_error_1.default(400, error.message || "Bad request");
            }
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedRows = yield this.OrderItemRepository.deleteOne(id);
            if (deletedRows !== 0) {
                jet_logger_1.default.info(`Order item with id:${id} deleted`);
            }
            else {
                throw new http_error_1.default(404, "Order item not found");
            }
        });
    }
}
exports.default = OrderItemService;
//# sourceMappingURL=order-item.service.js.map