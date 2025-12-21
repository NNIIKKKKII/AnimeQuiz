import pool from "./src/config/db.js";
import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import scoreRoutes from "./src/routes/scoreRoutes.js";
import { initDB } from "./src/data/initDB.js";
import quizRoutes from "./src/routes/quizRoutes.js";
const port = 5000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/images", express.static("public/images"));

app.use("/api/users", userRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

const startServer = async () => {
  await initDB();

  app.listen(port, () => {
    console.log(` Backend Server is running on port ${port}`);
  });
};

startServer();
