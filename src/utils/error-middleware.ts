import { NextFunction, Request, Response } from "express";
import HttpError from "./http-error";
import logger from 'jet-logger';

function errorMiddleware(error: HttpError, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message;
  logger.err(`Error code: ${status} - Message: ${message}`);
  response.setHeader('Content-type', 'application/json');
  response.status(status).json({
      status,
      message,
    })
}


export default errorMiddleware;