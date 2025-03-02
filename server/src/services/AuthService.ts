import validator from "validator";
import { CustomError } from "../middlewares/ErrorHandler";
import { client } from "../db/Client";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../util/GenerateAccessToken";
import { generateRefreshToken } from "../util/GenerateRefreshToken";
import fs from "fs";
import path from "path";

export async function registerUserService({ email, password }: { email: string; password: string }) {
  if (!email || !password) throw new CustomError("Email and password must not be empty ", 400);
  if (!validator.isEmail(email)) throw new CustomError("Please provide a valid email", 400);
  if (!validator.isStrongPassword(password)) throw new CustomError("Please provide a strong password", 400);

  const userExists = await client.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) throw new CustomError("User with that email already exists", 400);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await client.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });
  const userFolderPath = path.join("../server/uploads", user.id.toString());

  await fs.promises.mkdir(userFolderPath, { recursive: true });

  const rootFolder = await client.folder.create({
    data: {
      userId: user.id,
      name: "root",
      parentFolderId: null,
    },
  });

  const rootFolderPath = path.join(userFolderPath, rootFolder.id.toString());
  await fs.promises.mkdir(rootFolderPath, { recursive: true });

  await client.user.update({
    where: {
      id: user.id,
    },
    data: {
      rootId: rootFolder.id,
    },
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return { accessToken, refreshToken };
}

export async function loginUserService({ email, password }: { email: string; password: string }) {
  if (!email || !password) throw new CustomError("Email and password must not be empty ", 400);

  const user = await client.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new CustomError("Invalid credentials", 400);

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) throw new CustomError("Invalid credentials", 400);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return { accessToken, refreshToken };
}

export async function getCurrentUserService(userId: string) {
  if (!userId) throw new CustomError("No UserId provided", 400);

  const user = await client.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      id: true,
      rootId: true,
    },
  });

  return user;
}
