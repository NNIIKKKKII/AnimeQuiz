import fs from "fs";
import path from "path";
import pool from "../config/db.js";

const IMAGES_DIR = path.join(process.cwd(), "/public/images");

const formatName = (filename) => {
  return filename
    .replace(/\.[^/.]+$/, "")       // remove extension
    .replace(/[-_]/g, " ")          // dash/underscore → space
    .replace(/\b\w/g, c => c.toUpperCase());
};

const seedCharacters = async () => {
  try {
    const files = fs.readdirSync(IMAGES_DIR);

    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

      const name = formatName(file);
      const imageUrl = `/images/${file}`;

      // 🔥 THIS IS THE INSERT 🔥
      await pool.query(
        `INSERT INTO characters (name, image_url)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [name, imageUrl]
      );

      console.log(`Inserted: ${name}`);
    }

    console.log("✅ All characters inserted");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedCharacters();
