import express from "express";
import { createFolder, deleteFolder, getAllFolders, getSingleFolder } from "../controllers/FolderControllers";

const router = express.Router();

router.get("/", getAllFolders);
router.get("/:folderId", getSingleFolder);
router.post("/", createFolder);
router.delete("/:folderId", deleteFolder);

export default router;
