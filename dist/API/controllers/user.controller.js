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
exports.deleteOne = exports.update = exports.login = exports.readOne = void 0;
const user_service_1 = __importDefault(require("../../services/user.service"));
const http_error_1 = __importDefault(require("../../utils/http-error"));
const userService = new user_service_1.default();
function readOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const User = yield userService.readOne(userId);
            res.status(200).json({
                message: "User  found",
                data: User,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.readOne = readOne;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const loginData = yield userService.login(username, password);
            res
                // .cookie("jwt", loginData.token, {
                //   httpOnly: true,
                // })
                .status(200)
                .json({
                message: "Login successful",
                data: { id: loginData.id, username: loginData.username, token: loginData.token },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.login = login;
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const { username, password } = req.body;
            if (!username || !password) {
                throw new http_error_1.default(400, "Bad request");
            }
            const user = yield userService.readOne(userId);
            user.username = username;
            user.password = password;
            const updated = yield userService.update(user);
            res.status(200).json({
                message: "User updated successfully",
                updatedUser: updated,
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
            const { userId } = req.params;
            yield userService.deleteOne(userId);
            res.status(204).json({
                message: "User  deleted",
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=user.controller.js.map