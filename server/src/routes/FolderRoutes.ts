import express from "express";
import { getAllFolders } from "../controllers/FolderControllers";

const router = express.Router();

router.get("/", getAllFolders);

export default router;
