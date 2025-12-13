import express from "express";

import {
  verifyAnswer,
  getRandomCharacter,
} from "../controllers/quizControllers.js";

const router = express.Router();

router.get("/random", getRandomCharacter);
router.post("/verify", verifyAnswer);

export default router;

