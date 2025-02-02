import express from "express";
import { createFolder, deleteFolder, getAllFolders, getSingleFolder } from "../controllers/FolderControllers";
import { authentication } from "../middlewares/Authentication";

const router = express.Router();

// router.use(authentication);
router.get("/", getAllFolders);
router.get("/:folderId", getSingleFolder);
router.post("/", createFolder);
router.delete("/:folderId", deleteFolder);

export default router;
