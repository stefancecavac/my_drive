import express from "express";
import { createFile, deleteFile, getAllFiles } from "../controllers/FileControllers";

const router = express.Router();

router.get("/", getAllFiles);
router.post("/", createFile);
router.delete("/:fileId", deleteFile);

export default router;
