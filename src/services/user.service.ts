import "reflect-metadata";
import UserRepository from "../database/repositories/user.repository";
import HttpError from "../utils/http-error";
import User from "../entities/user";
import logger from "jet-logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envConfig } from '../env-config';

export default class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async readOne(id: string) {
    const User = await this.userRepository.readOne(id);
    return User;
  }

  async login(username: string, password: string) {
    try {
      const foundUser = await this.userRepository.readByUsername(username);
      if (!foundUser) {
        throw new HttpError(400, "User not found");
      }
      const correctPassword = bcrypt.compareSync(password, foundUser.password);
      if (correctPassword) {
        console.log(envConfig.jwtSecret);
        const token = jwt.sign({ id: foundUser.id, username: foundUser.username }, envConfig.jwtSecret, {
          expiresIn: "6h",
        });
        return {username: foundUser.username, token};
      } else {
        throw new HttpError(400, "Incorrect password");
      }
    } catch (error) {
      throw new HttpError(error.status || 500, error.message || "Internal server error");
    }
  }

  async readFiltered(field: string, value: string) {
    const User = await this.userRepository.readFiltered(field, value);
    return User;
  }

  async create(User: User) {
    try {
      let newId = await this.userRepository.create(User);
      return newId;
    } catch (error) {
      throw new HttpError(400, error.message || "Bad request");
    }
  }

  async update(user: User) {
    try {
      const exisitingUser = await this.readOne(user.id);
      if (exisitingUser) {
        await this.userRepository.update(user);
        return user;
      } else {
        throw new HttpError(404, "User not found");
      }
    } catch (error) {
      throw new HttpError(400, error.message || "Bad request");
    }
  }

  async deleteOne(id: string) {
    const deletedRows = await this.userRepository.deleteOne(id);
    if (deletedRows !== 0) {
      logger.info(`User with id:${id} deleted`);
    } else {
      throw new HttpError(404, "User not found");
    }
  }
}
