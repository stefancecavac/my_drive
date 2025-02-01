import { NextFunction, Request, Response } from "express";
import { createFolderService, deleteFolderService, getAllFoldersService, getSingleFolderService } from "../services/FolderServices";
import { CustomError } from "../middlewares/ErrorHandler";
import validator from "validator";

export async function getAllFolders(req: Request, res: Response, next: NextFunction) {
  try {
    const folders = await getAllFoldersService();

    res.status(200).json(folders);
  } catch (error) {
    next(error);
  }
}

export async function getSingleFolder(req: Request, res: Response, next: NextFunction) {
  const { folderId } = req.params;
  try {
    if (!folderId) throw new CustomError("Please provide folder id", 400);
    if (!validator.isUUID(folderId)) throw new CustomError("Please provide a valid folderId", 400);

    const folder = await getSingleFolderService(folderId);

    res.status(200).json(folder);
  } catch (error) {
    next(error);
  }
}

export async function createFolder(req: Request, res: Response, next: NextFunction) {
  const { name, parentFolderId } = req.body;
  try {
    if (!name) throw new CustomError("Please provide a name for folder", 400);

    const createdFolder = await createFolderService({ name, parentFolderId });

    res.status(200).json(createdFolder);
  } catch (error) {
    next(error);
  }
}

export async function deleteFolder(req: Request, res: Response, next: NextFunction) {
  const { folderId } = req.params;
  try {
    if (!folderId) throw new CustomError("Please provide folder id", 400);
    if (!validator.isUUID(folderId)) throw new CustomError("Please provide a valid folderId", 400);

    const deletedFolders = await deleteFolderService(folderId);
    res.status(200).json(deletedFolders);
  } catch (error) {
    next(error);
  }
}
