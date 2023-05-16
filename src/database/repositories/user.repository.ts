import { AppDataSource } from "../data-source";
import UserEntity from "../db-entities/user.entity";
import User from "../../entities/user";

export default class UserRepository {
  async create(User: UserEntity) {
    const UserRepository = AppDataSource.getRepository(UserEntity);
    const created = await UserRepository.insert(User);
    return created.generatedMaps[0].id;
  }

  async readOne(id: string):Promise<User | undefined> {
    const repository = AppDataSource.getRepository(UserEntity);
    let User = await repository.findOneBy({id: id});
    return User ? (User as User) : undefined;
  }

  async readByUsername(username: string):Promise<User | undefined> {
    const repository = AppDataSource.getRepository(UserEntity);
    let User = await repository.findOneBy({username: username});
    return User ? (User as User) : undefined;
  }

  async readFiltered(field: string, value: string):Promise<User[] | undefined> {
    const repository = AppDataSource.getRepository(UserEntity);
    let users = await repository.createQueryBuilder("User")
    .where(`User.${field} = '${value}'`)
    .getMany()
    return users ? users.map((user) => user as User) : undefined;
  }

  async update(user: UserEntity) {
    const repository = AppDataSource.getRepository(UserEntity);
    const newValues = {
      password: user.password
    };
    await repository.update(user.id, newValues);
  }

  async deleteOne(id: string) {
    const repository = AppDataSource.getRepository(UserEntity);
    let deleted = await repository.delete({id: id});
    return deleted.affected;
  }
}