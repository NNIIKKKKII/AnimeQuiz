import express from "express";
import {registerUser, loginUser} from "../controllers/userController.js";
import { refreshAccessToken } from "../controllers/userController.js";

const router = express.Router();
console.log("🔥 userRoutes loaded");

router.post("/register", registerUser);
// router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/login", (req, res) => {
    res.json({ ok: true });
  });
  
export default router;