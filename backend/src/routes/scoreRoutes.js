import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware.js";
import { submitScore, leaderboard } from "../controllers/scoreController.js";

const router = express.Router();

// only logged-in users can submit scores
router.post("/submit", authenticateJWT, submitScore);
router.get("/leaderboard", leaderboard);

export default router;
