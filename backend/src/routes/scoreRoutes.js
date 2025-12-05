import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { submitScore, leaderboard } from "../controllers/scoreController.js";

const router = express.Router();

// only logged-in users can submit scores
router.post("/submit", authenticate, submitScore);
router.get("/leaderboard", leaderboard);

export default router;
