import pool from "../config/db.js";
import {
  getRandomCharacterFromDB,
  getCharacterNameByID,
  getRandomCharacterExcluding,
} from "../model/quizModel.js";
import levenshtein from "fast-levenshtein";
// import { normalize, getFirstName } from "../utils/normalize.js";

import redisClient from "../config/redis.js";

const normalize = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z]/g, "");

const getFirstName = (fullName) => {
  return normalize(fullName.split(" ")[0]);
};

export const getRandomCharacter = async (req, res) => {
  const start = Date.now();

  try {
    // 1️⃣ Read seen IDs from Redis
    const redisStart = Date.now();
    const seenIds = await redisClient.sMembers("quiz:seen");
    const redisDuration = Date.now() - redisStart;

    console.log(`🚀 Redis read time: ${redisDuration} ms`);

    const excludedIds = seenIds.map(Number);

    // 2️⃣ Fetch random character excluding seen ones
    const dbStart = Date.now();
    const character = await getRandomCharacterExcluding(excludedIds);
    const dbDuration = Date.now() - dbStart;

    if (!character) {
      await redisClient.del("quiz:seen");
      return res.json({ done: true });
    }

    console.log(`🐘 PostgreSQL response time: ${dbDuration} ms`);

    // 3️⃣ Mark character as seen
    await redisClient.sAdd("quiz:seen", String(character.id));

    // 4️⃣ Total request time
    const totalDuration = Date.now() - start;
    console.log(`⏱️ Total request time: ${totalDuration} ms`);

    res.json({
      id: character.id,
      image_url: character.image_url,
    });
  } catch (err) {
    console.error("Quiz error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const verifyAnswer = async (req, res) => {
  try {
    const { id, guess } = req.body;

    if (!id || !guess) {
      return res.status(400).json({ message: "Missing data" });
    }

    const character = await getCharacterNameByID(id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const userGuess = normalize(guess);
    const fullName = normalize(character.name);
    const firstName = getFirstName(character.name);

    let correct = false;

    // 1️⃣ First-name exact or close match
    const firstNameDistance = levenshtein.get(userGuess, firstName);
    if (firstNameDistance <= 1) {
      correct = true;
    }

    // 2️⃣ Full-name fuzzy match (fallback)
    if (!correct) {
      const fullNameDistance = levenshtein.get(userGuess, fullName);
      if (fullNameDistance <= 2) {
        correct = true;
      }
    }

    return res.json({
      correct,
      ...(correct ? {} : { answer: character.name }),
    });
  } catch (err) {
    console.error("verifyAnswer error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
