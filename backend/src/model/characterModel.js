import { pool } from "../data/db.js";

export const addCharacter = async (name, imageUrl) => {
  await pool.query(
    `INSERT INTO characters (name, image_url) VALUES ($1, $2)`,
    [name, imageUrl]
  );
};

export const getRandomCharacter = async () => {
  const result = await pool.query(
    `SELECT * FROM characters ORDER BY RANDOM() LIMIT 1`
  );
  return result.rows[0];
};

export const getCharacters = async (limit, offset) => {
  const result = await pool.query(
    `SELECT * FROM characters LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return result.rows;
};
