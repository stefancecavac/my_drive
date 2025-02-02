import jwt from "jsonwebtoken";

export function generateRefreshToken(userId: string) {
  const refreshToken = jwt.sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1m" });
  return refreshToken;
}
