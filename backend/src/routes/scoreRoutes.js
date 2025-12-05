import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { submitScore } from "../controllers/scoreController.js";

const router = express.Router();

// only logged-in users can submit scores
router.post("/submit", authenticate, submitScore);

export default router;
