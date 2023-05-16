import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { envConfig } from '../env-config';
import { CustomRequest } from "./types";


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, envConfig.jwtSecret);
    (req as CustomRequest).token = decoded;
    console.log(req);

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({status: 401, message: "Please authenticate"});
  }
}

export function authDispatcher(req: Request, res: Response, next: NextFunction) {
  console.log(req.path);
  if (req.path === '/api/v2/auth/login') {
    next();
  } else {
    authMiddleware(req, res, next);
  }
}
