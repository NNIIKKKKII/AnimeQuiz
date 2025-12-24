import pool from "../config/db.js";
import {
  getRandomCharacterFromDB,
  getCharacterNameByID,
} from "../model/quizModel.js";
import redisClient from "../config/redis.js";


export const getRandomCharacter = async (req, res) => {
  const start = Date.now();

  try {
    const cached = await redisClient.get("random_character");

    if (cached) {
      const duration = Date.now() - start;
      console.log(`🚀 Redis response time: ${duration} ms`);
      return res.json(JSON.parse(cached));
    }

    console.log("❌ Redis cache miss");

    const character = await getRandomCharacterFromDB();

    const response = {
      id: character.id,
      image_url: character.image_url,
    };

    await redisClient.setEx("random_character", 10, JSON.stringify(response));

    const duration = Date.now() - start;
    console.log(`🐘 PostgreSQL response time: ${duration} ms`);

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyAnswer = async (req, res) => {
  try {
    const { id, guess } = req.body;

    if (!guess || !id) {
      return res.status(400).json({ message: "Data Missing !" });
    }

    const character = await getCharacterNameByID(id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const correct =
      character.name.toLowerCase().trim() === guess.toLowerCase().trim();

    res.json({
      correct,
      ...(correct ? {} : { answer: character.name }),
    });
  } catch (err) {
    console.log("error verifying answer in quizController.js", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
