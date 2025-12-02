import pool from "./src/config/db.js";
import express from "express";
import cors from "cors";

const port = 5000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

app.listen(port, () => {
  console.log(` Backend Server is running on port ${port}`);
});
