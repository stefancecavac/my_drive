import { NextFunction, Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/AuthService";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../util/GenerateAccessToken";
import { CustomError } from "../middlewares/ErrorHandler";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken } = await registerUserService({ email, password });

    res.cookie("refreshToken", refreshToken, {
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60000,
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  const refreshToken = req.cookies.refreshToken;

  try {
    if (!refreshToken) throw new CustomError("No token proivded", 401);
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

    console.log("decoded token", decodedToken);

    if (!decodedToken) throw new CustomError("Token expired or not valid", 403);
    const accessToken = generateAccessToken((decodedToken as any).id);

    res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
}
