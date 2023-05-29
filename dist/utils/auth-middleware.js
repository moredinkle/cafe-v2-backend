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
exports.authDispatcher = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../env-config");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
            if (!token) {
                throw new Error();
            }
            const decoded = jsonwebtoken_1.default.verify(token, env_config_1.envConfig.jwtSecret);
            req.token = decoded;
            next();
        }
        catch (err) {
            console.log(err);
            res.status(401).json({ status: 401, message: "Please authenticate" });
        }
    });
}
exports.authMiddleware = authMiddleware;
function authDispatcher(req, res, next) {
    if (req.path === '/api/v2/auth/login') {
        next();
    }
    else {
        authMiddleware(req, res, next);
    }
}
exports.authDispatcher = authDispatcher;
//# sourceMappingURL=auth-middleware.js.map