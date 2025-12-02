import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const {Pool } = pkg;

const pool = new Pool({
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST || "localhost",
    port : process.env.DB_PORT || 5434,
    database : process.env.DB_NAME
})

pool.connect()
    .then(client => {
        console.log("Connected to database Successfully!");
        client.release(); // Release the client back to the pool
    })
    .catch(err => {
        console.error("Database connection error:", err.stack);
    });
export default pool;
