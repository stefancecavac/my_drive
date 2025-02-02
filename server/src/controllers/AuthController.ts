import { NextFunction, Request, Response } from "express";
import { registerUserService } from "../services/AuthService";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const registerUser = await registerUserService({ email, password });

    res.status(201).json(registerUser);
  } catch (error) {
    next(error);
  }
}
