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
const order_service_1 = __importDefault(require("../../services/order.service"));
const order_1 = __importDefault(require("../../entities/order"));
const http_error_1 = __importDefault(require("../../utils/http-error"));
const types_converter_1 = require("../../utils/types.converter");
const orderService = new order_service_1.default();
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { total, payedWith, change, type } = req.body;
            const checkedType = (0, types_converter_1.toOrderType)(type);
            if ((total === null || total === undefined) || (payedWith === null || payedWith === undefined) || (change === null || change === undefined) || !checkedType) {
                throw new http_error_1.default(400, "Bad request");
            }
            const order = new order_1.default(total, payedWith, change, checkedType);
            const newId = yield orderService.create(order);
            res.status(201).json({
                message: "Account saved successfully",
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
            const { OrderId } = req.params;
            const Order = yield orderService.readOne(OrderId);
            res.status(200).json({
                message: "Order  found",
                data: Order,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.readOne = readOne;
function readAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Orders = yield orderService.readAll();
            res.status(200).json({
                message: "Orders found",
                data: Orders,
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
            const { OrderId } = req.params;
            const { total, payedWith, change, type } = req.body;
            const checkedType = (0, types_converter_1.toOrderType)(type);
            if ((total === null || total === undefined) || (payedWith === null || payedWith === undefined) || (change === null || change === undefined) || !checkedType) {
                throw new http_error_1.default(400, "Bad request");
            }
            const order = yield orderService.readOne(OrderId);
            order.total = total;
            order.payedWith = payedWith;
            order.change = change;
            order.type = type;
            yield orderService.update(order);
            res.status(200).json({
                message: "Order updated successfully",
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
            const { OrderId } = req.params;
            yield orderService.deleteOne(OrderId);
            res.status(204).json({ message: "Order  deleted" });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=order.controller.js.map