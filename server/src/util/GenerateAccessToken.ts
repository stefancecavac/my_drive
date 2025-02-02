import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string) {
  const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30s" });

  return accessToken;
}
