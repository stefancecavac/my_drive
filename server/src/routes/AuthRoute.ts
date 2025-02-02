import express from "express";
import { getCurrentUser, loginUser, logoutUser, refreshToken, registerUser } from "../controllers/AuthController";
import { authentication } from "../middlewares/Authentication";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);

router.use(authentication);
router.get("/user", getCurrentUser);

export default router;
