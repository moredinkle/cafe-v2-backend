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
exports.deleteOne = exports.update = exports.readAll = exports.readFullReport = exports.readUshersReport = exports.readSalesReport = exports.readByMenuId = exports.readOne = exports.create = void 0;
const menu_item_service_1 = __importDefault(require("../../services/menu-item.service"));
const menu_item_1 = __importDefault(require("../../entities/menu-item"));
const http_error_1 = __importDefault(require("../../utils/http-error"));
const menuItemService = new menu_item_service_1.default();
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, price, stock } = req.body;
            const { menuId } = req.params;
            if (!name || !price || !stock || !menuId) {
                throw new http_error_1.default(400, "Bad request");
            }
            const menuItem = new menu_item_1.default(name, price, stock, menuId);
            const newId = yield menuItemService.create(menuItem);
            res.status(201).json({
                message: "Menu item saved successfully",
                newMenuItemId: newId,
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
            const { menuItemId } = req.params;
            const item = yield menuItemService.readOne(menuItemId);
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
function readByMenuId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { menuId } = req.params;
            const items = yield menuItemService.readByMenuId(menuId);
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
exports.readByMenuId = readByMenuId;
function readSalesReport(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { menuId } = req.params;
            const items = yield menuItemService.readSalesReport(menuId);
            res.status(200).json({
                message: "Sales report found",
                data: items,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.readSalesReport = readSalesReport;
function readUshersReport(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { menuId } = req.params;
            const items = yield menuItemService.readUshersReport(menuId);
            res.status(200).json({
                message: "Sales report found",
                data: items,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.readUshersReport = readUshersReport;
function readFullReport(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { menuId } = req.params;
            const report = yield menuItemService.readFullReport(menuId);
            res.status(200).json({
                message: "Sales report found",
                data: report,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.readFullReport = readFullReport;
function readAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield menuItemService.readAll();
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
            const { menuItemId } = req.params;
            const { name, price, stock } = req.body;
            if (!name || !price || !stock || !menuItemId) {
                throw new http_error_1.default(400, "Bad request");
            }
            const menuItem = yield menuItemService.readOne(menuItemId);
            menuItem.name = name;
            menuItem.price = price;
            menuItem.stock = stock;
            yield menuItemService.update(menuItem);
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
            const { menuItemId } = req.params;
            yield menuItemService.deleteOne(menuItemId);
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
//# sourceMappingURL=menu-item.controller.js.map