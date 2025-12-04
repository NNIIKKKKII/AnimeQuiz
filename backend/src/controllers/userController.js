import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../model/userModel";

const JWT_SECRET = process.env.JWT_SECRET;

//REGISTER
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const newUser = await createUser(username, email, hashedPassword);

    res.status(201).json({
      message: "User created successfully",
      user,
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

    const match = await bcrypt.comapare(password, userEmail.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: userEmail.id,
        email: userEmail.email,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
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
