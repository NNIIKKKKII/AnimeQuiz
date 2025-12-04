import express from "express";
import {registerUser, loginUser} from "../controllers/userController.js";
import { refreshAccessToken } from "../controllers/userController.js";

const router = express.Router();

router.get("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);

export default router;