import { Request, Response } from "express";
import { getAllFoldersService } from "../services/FolderServices";

export async function getAllFolders(req: Request, res: Response) {
  try {
    const folders = await getAllFoldersService();

    res.status(200).json(folders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
