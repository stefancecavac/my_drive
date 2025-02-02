import { NextFunction, Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/AuthService";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken } = await registerUserService({ email, password });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60000,
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken } = await loginUserService({ email, password });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60000,
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
}
