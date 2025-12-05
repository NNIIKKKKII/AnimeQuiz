import { pool } from "../data/db.js";

export const saveScore = async (userId, score, streak, totalQuestions) => {
  await pool.query(
    `INSERT INTO scores (user_id, score, streak, total_questions)
     VALUES ($1, $2, $3, $4)`,
    [userId, score, streak, totalQuestions]
  );
};

export const getLeaderboard = async (limit, offset) => {
  const result = await pool.query(
    `SELECT 
        users.username,
        scores.score,
        scores.created_at
     FROM scores
     JOIN users ON scores.user_id = users.id
     WHERE users.auth_provider != 'anonymous'
     ORDER BY scores.score DESC, scores.created_at ASC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return result.rows;
};
