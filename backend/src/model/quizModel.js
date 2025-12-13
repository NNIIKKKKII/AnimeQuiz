import pool from "../config/db";

export const getRandomCharacterFromDB = () => {
  try {
    const response = pool.query(
      `SELECT id, name, image_url FROM characters ORDER BY RANDOM() LIMIT 1;`
    );
    return response.rows[0];
  } catch (err) {
    console.log("error fetching random charcter in quizModel.js", err);
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


