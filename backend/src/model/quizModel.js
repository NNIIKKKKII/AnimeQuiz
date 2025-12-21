import pool from "../config/db.js";
import redis from "../config/redis.js";

const QUIZ_CACHE_KEY = "quiz:anime";
const QUIZ_TTL = 60; //60 seconds

export const getRandomCharacterFromDB = async () => {
  try {
    const cached = await redis.get(QUIZ_CACHE_KEY); // pulls the charcters from redis cache 
    if (cached) {
      console.log("✅ Redis cache hit");
      const characters = JSON.parse(cached); // redis stores everything in string so it needs to converted into JSObject
      return characters[Math.floor(Math.random() * characters.length)];
    }
    // this line will work when redis hit misses and pulls the charcters from DB
    const result = await pool.query(
      `SELECT * from characters ORDER BY RANDOM() LIMIT 10`
    );

    const charcters = result.rows;

    await redis.setEx(QUIZ_CACHE_KEY, QUIZ_TTL, JSON.stringify(charcters)); // sets the 10 characters in redis cacche for next 60 seconds
    console.log("✅ Redis cache miss");

    return charcters[Math.floor(Math.random() * charcters.length)];
  } catch (error) {
    console.log(
      "error fetching random character from DB in quizModel.js",
      error
    );
  }
};

export const getCharacterNameByID = (id) => {
  try {
    const response = pool.query(`SELECT * from characters WHERE id = $1`, [id]);
    return response.rows[0];
  } catch (err) {
    console.log("error fetching character by id  name in quizModel.js", err);
  }
};
