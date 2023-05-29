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
const user_repository_1 = __importDefault(require("../database/repositories/user.repository"));
const http_error_1 = __importDefault(require("../utils/http-error"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../env-config");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.default();
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const User = yield this.userRepository.readOne(id);
            return User;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield this.userRepository.readByUsername(username);
                if (!foundUser) {
                    throw new http_error_1.default(400, "User not found");
                }
                const correctPassword = bcrypt_1.default.compareSync(password, foundUser.password);
                if (correctPassword) {
                    const token = jsonwebtoken_1.default.sign({ id: foundUser.id, username: foundUser.username }, env_config_1.envConfig.jwtSecret, {
                        expiresIn: "6h",
                    });
                    return { username: foundUser.username, id: foundUser.id, token };
                }
                else {
                    throw new http_error_1.default(400, "Incorrect password");
                }
            }
            catch (error) {
                throw new http_error_1.default(error.status || 500, error.message || "Internal server error");
            }
        });
    }
    readFiltered(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const User = yield this.userRepository.readFiltered(field, value);
            return User;
        });
    }
    create(User) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newId = yield this.userRepository.create(User);
                return newId;
            }
            catch (error) {
                throw new http_error_1.default(400, error.message || "Bad request");
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exisitingUser = yield this.readOne(user.id);
                if (exisitingUser) {
                    yield this.userRepository.update(user);
                    return user;
                }
                else {
                    throw new http_error_1.default(404, "User not found");
                }
            }
            catch (error) {
                throw new http_error_1.default(400, error.message || "Bad request");
            }
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedRows = yield this.userRepository.deleteOne(id);
            if (deletedRows !== 0) {
                jet_logger_1.default.info(`User with id:${id} deleted`);
            }
            else {
                throw new http_error_1.default(404, "User not found");
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map