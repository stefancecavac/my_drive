import express from "express";
import { loginUser, refreshToken, registerUser } from "../controllers/AuthController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

export default router;
