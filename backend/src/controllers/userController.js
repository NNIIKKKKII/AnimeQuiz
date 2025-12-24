import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  getUserByRefreshToken,
  saveRefreshToken,
} from "../model/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";
const JWT_SECRET = process.env.JWT_SECRET;

//REGISTER
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, email, hashedPassword);

    res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (err) {
    console.error("Error creating user table in Usercontroller.js file:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//LOGIN

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userEmail = await findUserByEmail(email);
    if (!userEmail) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, userEmail.password_hash);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // const token = jwt.sign(
    //   {
    //     id: userEmail.id,
    //     email: userEmail.email,
    //   },
    //   JWT_SECRET,
    //   { expiresIn: "24h" }
    // );

    const accessToken = generateAccessToken(userEmail);
    const refreshToken = generateRefreshToken(userEmail);

    await saveRefreshToken(userEmail.id, refreshToken);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: userEmail.id,
        username: userEmail.username,
        email: userEmail.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//----------------------------------
//        REFRESH TOKEN
// ----------------------------------

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    // Check if refresh token is stored in DB
    const user = await getUserByRefreshToken(refreshToken);

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Verify signature & expiration
    const decoded = verifyRefreshToken(refreshToken);

    // Issue new access token
    const newAccessToken = generateAccessToken({ id: user.id });

    res.json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Refresh token expired or invalid" });
  }
};

export const logoutUser = async (req, res) => {
  const { userId } = req.body;

  await saveRefreshToken(userId, null);

  res.json({ message: "Logged out" });
};
