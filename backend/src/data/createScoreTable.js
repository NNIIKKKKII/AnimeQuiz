import pool from "./db.js";

export const createScoreTable = async () => {
  try {
    const checkTable = await pool.query(
      "SELECT to_regclass('public.scores')"
    );

    if (!checkTable.rows[0].to_regclass) {
      console.log("Scores table not found. Creating...");

      await pool.query(`
        CREATE TABLE scores (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          score INTEGER NOT NULL,
          streak INTEGER,
          total_questions INTEGER,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);

      console.log("Scores table created successfully!");
    } else {
      console.log("Scores table already exists.");
    }
  } catch (err) {
    console.error("Error creating scores table:", err);
  }
};
