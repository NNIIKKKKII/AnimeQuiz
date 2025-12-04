import pool from "./src/config/db.js";
import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";


const port = 5000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

app.listen(port, () => {
  console.log(` Backend Server is running on port ${port}`);
});
