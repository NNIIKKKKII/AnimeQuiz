import pool from "../config/db.js";
import {
  getRandomCharacterFromDB,
  getCharacterNameByID,
} from "../model/quizModel.js";

export const getRandomCharacter = async (req, res) => {
  try {
    const character = await getRandomCharacterFromDB();

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.json({
      id: character.id,
      image_url: character.image_url,
    });
  } catch (err) {
    console.log("error fetching random character in quizController.js", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyAnswer = async (req, res) => {
  try {
    const { id, guess } = req.body;

    if (!guess || !id) {
      res.status(400).json({ message: "Data Missing !" });
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
