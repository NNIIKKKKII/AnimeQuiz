import pool from "../config/db";

export const createUser = async (
  username,
  email,
  auth_provider,
  password_hash,
  created_at
) => {
  try {
    const respone = await pool.query(
      `INSERT INTO users(username, email, auth_provider, password_hash, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [username, email, auth_provider, password_hash, created_at]
    );
    return respone.rows[0];
  } catch (err) {
    console.error("Error creating user:", err);
  }
};


