import { NextFunction, Request, Response } from "express";
import { getAllFoldersService } from "../services/FolderServices";

export async function getAllFolders(req: Request, res: Response, next: NextFunction) {
  try {
    const folders = await getAllFoldersService();

    res.status(200).json(folders);
  } catch (error) {
    next(error);
  }
}
