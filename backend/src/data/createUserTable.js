import pool from "./db.js";

export const createUsertable = async () => {
  try {
    const response = await pool.query("SELECT * from users");

    if (response.rows.length === 0) {
      await pool.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    auth_provider VARCHAR(20),   -- 'jwt', 'google', or 'anonymous'
    password_hash TEXT,          -- only for JWT users
    created_at TIMESTAMP DEFAULT NOW()
);
`);
    }

    console.log("Table created successfully!");
  } catch (err) {
    console.error(err);
    console.log("Error creating users table");
  }
};
