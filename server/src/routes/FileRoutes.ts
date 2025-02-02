import express from "express";
import { createFile, deleteFile, getAllFiles } from "../controllers/FileControllers";
import { authentication } from "../middlewares/Authentication";

const router = express.Router();

router.use(authentication);
router.get("/", getAllFiles);
router.post("/", createFile);
router.delete("/:fileId", deleteFile);

export default router;
