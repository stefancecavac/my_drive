import jwt from "jsonwebtoken";

export async function generateRefreshToken(userId: string) {
  const refreshToken = await jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1m" });
  return refreshToken;
}
