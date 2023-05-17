import { Request, Response, NextFunction } from "express";
import UserService from "../../services/user.service";
import User from "../../entities/user";
import HttpError from "../../utils/http-error";

const userService = new UserService();

export async function readOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const User = await userService.readOne(userId);
    res.status(200).json({
      message: "User  found",
      data: User,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const loginData = await userService.login(username, password);
    res
      // .cookie("jwt", loginData.token, {
      //   httpOnly: true,
      // })
      .status(200)
      .json({
        message: "Login successful",
        data: { id: loginData.id, username: loginData.username, token: loginData.token },
      });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const { username, password } = req.body;
    if (!username || !password) {
      throw new HttpError(400, "Bad request");
    }
    const user = await userService.readOne(userId);
    user.username = username;
    user.password = password;
    const updated = await userService.update(user);
    res.status(200).json({
      message: "User updated successfully",
      updatedUser: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    await userService.deleteOne(userId);
    res.status(204).json({
      message: "User  deleted",
    });
  } catch (error) {
    next(error);
  }
}
