import { NextFunction, Request, Response } from "express";
import { createFileService, deleteFileService, getAllFilesService } from "../services/FileServices";
import { CustomError } from "../middlewares/ErrorHandler";

export async function getAllFiles(req: Request, res: Response, next: NextFunction) {
  try {
    const files = await getAllFilesService();
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
}

export async function createFile(req: Request, res: Response, next: NextFunction) {
  const { name, folderId } = req.body;
  try {
    if (!name) throw new CustomError("Please provide name for file", 400);

    const createdFile = await createFileService({ name, folderId });
    res.status(200).json(createdFile);
  } catch (error) {
    next(error);
  }
}

export async function deleteFile(req: Request, res: Response, next: NextFunction) {
  const { fileId } = req.params;
  try {
    const deletedFile = await deleteFileService(fileId);
    res.status(200).json(deletedFile);
  } catch (error) {
    next(error);
  }
}
