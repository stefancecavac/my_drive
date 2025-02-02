import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

export async function authentication(req: Request, res: Response, next: NextFunction): Promise<any> {
  const accessToken = req.headers.authorization?.split(" ")[1];

  try {
    if (!accessToken) return res.status(401).json({ message: "No token provided" });
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);

    if (!decodedToken) return res.status(403).json({ message: "Invalid or expired token" });

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}
