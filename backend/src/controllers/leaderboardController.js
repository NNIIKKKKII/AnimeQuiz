import pool from "../config/db.js";

export const getLeaderboard = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.username, s.score
      FROM scores s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.score DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};
