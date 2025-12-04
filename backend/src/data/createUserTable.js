import pool from "./db.js";

export const createUsertable = async () => {
  try {
    // Check if the table exists
    const checkTable = await pool.query(
      "SELECT to_regclass('public.users')" //to_reglcalss is a postgres system function
    );

    if (!checkTable.rows[0].to_regclass) {
      console.log("Users table not found. Creating...");

      await pool.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50),
          email VARCHAR(100) UNIQUE,
          auth_provider VARCHAR(20),
          password_hash TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);

      console.log("Users table created successfully!");
    } else {
      console.log("Users table already exists.");
    }
  } catch (err) {
    console.error("Error creating users table:", err);
  }
};
