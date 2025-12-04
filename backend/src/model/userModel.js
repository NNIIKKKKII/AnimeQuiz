import pool from "../config/db";

export const createUser = async (username, ElementInternals, password) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email`,
      [username, email, password]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error creating user:", err);
  }
};

export const findUserByEmail = async (email) => {
  try {
    const repsonse = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return repsonse.rows[0];
  } catch (err) {
    console.error("Error finding user by email:", err);
  }
};

export const saveRefreshToken = async (userId, token) => {
  try {
    const response = pool.query(
      `UPDATE users SET refresh_token = $1 WHERE id = $2`,
      [token, userId]
    );
  } catch (err) {
    console.error("Error saving refresh token:", err);
  }
};



export const getUserByRefreshToken = async (refreshToken) => {
  try {
    const response = await pool.query(
      `SELECT * FROM users WHERE refresh_token = $1`,
      [refreshToken]
    );
    return response.rows[0];
  } catch (err) {
    console.error("Error getting user by refresh token:", err);
  }
};