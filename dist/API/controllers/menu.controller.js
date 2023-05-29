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
exports.deleteOne = exports.update = exports.readAll = exports.readComplete = exports.readOne = exports.create = void 0;
const menu_service_1 = __importDefault(require("../../services/menu.service"));
const menu_1 = __importDefault(require("../../entities/menu"));
const http_error_1 = __importDefault(require("../../utils/http-error"));
const types_converter_1 = require("../../utils/types.converter");
const menuService = new menu_service_1.default();
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date, status } = req.body;
            const checkedStatus = (0, types_converter_1.toMenuStatus)(status);
            const finalDate = new Date(date);
            if (!date || !checkedStatus) {
                throw new http_error_1.default(400, "Bad request");
            }
            const menu = new menu_1.default(finalDate, checkedStatus);
            const newId = yield menuService.create(menu);
            res.status(201).json({
                message: "Menu saved successfully",
                newMenuId: newId,
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
            const { menuId } = req.params;
            const menu = yield menuService.readOne(menuId);
            res.status(200).json({
                message: "Menu  found",
                data: menu,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.readOne = readOne;
function readComplete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { menuId } = req.params;
            const menu = yield menuService.readComplete(menuId);
            res.status(200).json({
                message: "Menu found",
                menuData: menu,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.readComplete = readComplete;
function readAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { field, value, start, end } = req.query;
            field = field;
            value = value;
            start = start;
            end = end;
            let menus = undefined;
            if (field && value) {
                menus = yield menuService.readFiltered(field, value);
            }
            else if (start && end) {
                menus = yield menuService.readByDate(start, end);
            }
            else {
                menus = yield menuService.readAll();
            }
            res.status(200).json({
                message: "Menus found",
                data: menus,
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
            const { menuId } = req.params;
            const { status } = req.body;
            const checkedStatus = (0, types_converter_1.toMenuStatus)(status);
            if (!checkedStatus) {
                throw new http_error_1.default(400, "Bad request");
            }
            const menu = yield menuService.readOne(menuId);
            menu.status = checkedStatus;
            const updated = yield menuService.update(menu);
            res.status(200).json({
                message: "Menu updated successfully",
                updatedMenu: updated
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
            const { menuId } = req.params;
            yield menuService.deleteOne(menuId);
            res.status(204).json({
                message: "Menu  deleted",
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=menu.controller.js.map