import { saveScore, getLeaderboard } from "../models/scoreModel.js";

export const submitScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { score, streak, totalQuestions } = req.body;

    await saveScore(userId, score, streak, totalQuestions);

    res.json({ message: "Score submitted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting score" });
  }
};

export const leaderboard = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const results = await getLeaderboard(limit, offset);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};
