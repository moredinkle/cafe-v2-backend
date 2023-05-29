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
const data_source_1 = require("../data-source");
const user_entity_1 = __importDefault(require("../db-entities/user.entity"));
class UserRepository {
    create(User) {
        return __awaiter(this, void 0, void 0, function* () {
            const UserRepository = data_source_1.AppDataSource.getRepository(user_entity_1.default);
            const created = yield UserRepository.insert(User);
            return created.generatedMaps[0].id;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(user_entity_1.default);
            let User = yield repository.findOneBy({ id: id });
            return User ? User : undefined;
        });
    }
    readByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(user_entity_1.default);
            let User = yield repository.findOneBy({ username: username });
            return User ? User : undefined;
        });
    }
    readFiltered(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(user_entity_1.default);
            let users = yield repository.createQueryBuilder("User")
                .where(`User.${field} = '${value}'`)
                .getMany();
            return users ? users.map((user) => user) : undefined;
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(user_entity_1.default);
            const newValues = {
                password: user.password
            };
            yield repository.update(user.id, newValues);
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = data_source_1.AppDataSource.getRepository(user_entity_1.default);
            let deleted = yield repository.delete({ id: id });
            return deleted.affected;
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map