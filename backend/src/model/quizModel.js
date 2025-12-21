import pool from "../config/db.js";
import redis from "../config/redis.js";

const QUIZ_CACHE_KEY = "quiz:anime";
const QUIZ_TTL = 60; //60 seconds

export const getRandomCharacterFromDB = async () => {
  try {
    const cached = await redis.get(QUIZ_CACHE_KEY);

    if (cached) {
      console.log("✅ Redis cache hit");
      const characters = JSON.parse(cached);

      if (!characters.length) return null; // 🔑 IMPORTANT

      return characters[Math.floor(Math.random() * characters.length)];
    }

    const result = await pool.query(
      `SELECT * FROM characters ORDER BY RANDOM() LIMIT 10`
    );

    const characters = result.rows;

    if (!characters.length) return null; // 🔑 IMPORTANT

    await redis.setEx(QUIZ_CACHE_KEY, QUIZ_TTL, JSON.stringify(characters));

    console.log("✅ Redis cache miss");

    return characters[Math.floor(Math.random() * characters.length)];
  } catch (error) {
    console.log(
      "error fetching random character from DB in quizModel.js",
      error
    );
    return null;
  }
};

export const getCharacterNameByID = async (id) => {
  try {
    const response = await pool.query(
      `SELECT * from characters WHERE id = $1`,
      [id]
    );
    return response.rows[0];
  } catch (err) {
    console.log("error fetching character by id  name in quizModel.js", err);
  }
};
