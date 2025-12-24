import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware.js";
import { getLeaderboard } from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", authenticateJWT, getLeaderboard);

export default router;
