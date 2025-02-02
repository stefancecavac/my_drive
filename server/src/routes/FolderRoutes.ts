import express from "express";
import { createFolder, deleteFolder, getCurrentFolder } from "../controllers/FolderControllers";
import { authentication } from "../middlewares/Authentication";

const router = express.Router();

router.use(authentication);

router.get("/:folderId", getCurrentFolder);
router.post("/", createFolder);
router.delete("/:folderId", deleteFolder);

export default router;
