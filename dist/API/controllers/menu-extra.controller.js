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
exports.deleteOne = exports.update = exports.readAll = exports.readByMenuId = exports.readOne = exports.create = void 0;
const menu_extra_service_1 = __importDefault(require("../../services/menu-extra.service"));
const menu_extra_1 = __importDefault(require("../../entities/menu-extra"));
const http_error_1 = __importDefault(require("../../utils/http-error"));
const types_converter_1 = require("../../utils/types.converter");
const menuExtraService = new menu_extra_service_1.default();
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { description, amount, type, menuId } = req.body;
            const extraType = (0, types_converter_1.toExtraType)(type);
            if (!description || !amount || !extraType || !menuId) {
                throw new http_error_1.default(400, "Bad request. Missing or incorrect data.");
            }
            const menuExtra = new menu_extra_1.default(description, amount, type, menuId);
            const newId = yield menuExtraService.create(menuExtra);
            res.status(201).json({
                message: "Menu item saved successfully",
                newmenuExtraId: newId,
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
            const { menuExtraId } = req.params;
            const item = yield menuExtraService.readOne(menuExtraId);
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
            const items = yield menuExtraService.readByMenuId(menuId);
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
function readAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield menuExtraService.readAll();
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
            const { menuExtraId } = req.params;
            const { description, amount, type } = req.body;
            const extraType = (0, types_converter_1.toExtraType)(type);
            if (!description || !amount || !extraType || !menuExtraId) {
                throw new http_error_1.default(400, "Bad request");
            }
            const menuExtra = yield menuExtraService.readOne(menuExtraId);
            menuExtra.description = description;
            menuExtra.amount = amount;
            menuExtra.type = extraType;
            yield menuExtraService.update(menuExtra);
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
            const { menuExtraId } = req.params;
            yield menuExtraService.deleteOne(menuExtraId);
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
//# sourceMappingURL=menu-extra.controller.js.map