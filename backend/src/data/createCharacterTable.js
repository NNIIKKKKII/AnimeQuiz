import pool from "../config/db.js";

export const createCharacterTable = async () => {
  try {
    const checkTable = await pool.query(
      "SELECT to_regclass('public.characters')"
    );

    if (!checkTable.rows[0].to_regclass) {
      console.log("Characters table not found. Creating...");

      await pool.query(`
        CREATE TABLE characters (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          image_url TEXT NOT NULL
        );
      `);

      console.log("Characters table created!");
    } else {
      console.log("Characters table already exists.");
    }
  } catch (err) {
    console.error("Error creating characters table:", err);
  }
};
