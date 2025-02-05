import { NextFunction, Request, Response } from "express";
import { getCurrentUserService, loginUserService, registerUserService } from "../services/AuthService";
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
      maxAge: 864000000,
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
      maxAge: 864000000,
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction): Promise<any> {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(400).json({ message: "No refresh token" });
  try {
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

    if (!decodedToken) throw new CustomError("Token expired or not valid", 403);
    const accessToken = generateAccessToken((decodedToken as any).userId);

    res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.user;

  try {
    const user = await getCurrentUserService(userId);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export function logoutUser(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true }).send();
  } catch (error) {
    next(error);
  }
}
