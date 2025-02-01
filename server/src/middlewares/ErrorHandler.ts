import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
  const code = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(code).json({ message, code });
}
