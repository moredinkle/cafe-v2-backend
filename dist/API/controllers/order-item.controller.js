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
exports.deleteOne = exports.update = exports.readAll = exports.readOne = exports.create = void 0;
const order_item_service_1 = __importDefault(require("../../services/order-item.service"));
const order_item_1 = __importDefault(require("../../entities/order-item"));
const http_error_1 = __importDefault(require("../../utils/http-error"));
const orderItemService = new order_item_service_1.default();
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { quantity, subtotal, menuItemId } = req.body;
            const { orderId } = req.params;
            if (!quantity || !subtotal || !menuItemId || !orderId) {
                throw new http_error_1.default(400, "Bad request");
            }
            const orderItem = new order_item_1.default(quantity, subtotal, menuItemId, orderId);
            const newId = yield orderItemService.create(orderItem);
            res.status(201).json({
                message: "Menu item saved successfully",
                newId: newId,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.create = create;
function readOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderItemId } = req.params;
            const item = yield orderItemService.readOne(orderItemId);
            res.status(200).json({
                message: "Menu item found",
                data: item,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.readOne = readOne;
//TODO
// export async function readByMenuId(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { menuId } = req.params;
//     const items = await orderItemService.readByMenuId(menuId);
//     res.status(200).json({
//       message: "Menu items found",
//       data: items,
//     });
//   } catch (error) {
//     next(error);
//   }
// }
function readAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield orderItemService.readAll();
            res.status(200).json({
                message: "Menu items found",
                data: items,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.readAll = readAll;
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderItemId } = req.params;
            const { quantity, subtotal } = req.body;
            if (!quantity || !subtotal || !orderItemId) {
                throw new http_error_1.default(400, "Bad request");
            }
            const orderItem = yield orderItemService.readOne(orderItemId);
            orderItem.quantity = quantity;
            orderItem.subtotal = subtotal;
            yield orderItemService.update(orderItem);
            res.status(200).json({
                message: "Item updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.update = update;
function deleteOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderItemId } = req.params;
            yield orderItemService.deleteOne(orderItemId);
            res.status(204).json({
                message: "Menu item deleted",
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=order-item.controller.js.map