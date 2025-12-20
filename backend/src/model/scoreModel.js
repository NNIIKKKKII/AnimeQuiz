import pool from "../config/db.js";
import redis from "../config/redis.js";

const leaderboardKey = (page) => `leaderboard:page:${page}`;
const LEADERBOARD_TTL = 30;

export const getLeaderboard = async (limit, offset, page) => {
  const key = leaderboardKey(page);

  // 1. Check Redis
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Fetch from DB
  const result = await pool.query(
    `
    SELECT 
      u.username,
      s.score,
      s.created_at
    FROM scores s
    JOIN users u ON s.user_id = u.id
    WHERE u.auth_provider != 'anonymous'
    ORDER BY s.score DESC, s.created_at ASC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  // 3. Cache
  await redis.setEx(key, LEADERBOARD_TTL, JSON.stringify(result.rows));

  return result.rows;
};

export const saveScore = async (userId, score, streak, totalQuestions) => {
  await pool.query(
    `
    INSERT INTO scores (user_id, score, streak, total_questions)
    VALUES ($1, $2, $3, $4)
    `,
    [userId, score, streak, totalQuestions]
  );

  // 4. Invalidate leaderboard cache
  const keys = await redis.keys("leaderboard:page:*");
  if (keys.length) await redis.del(keys);
};
