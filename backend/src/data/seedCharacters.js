import pool from "../config/db.js";

const characters = [
  { name: "Beerus", image_url: "/images/beerus.jpg" },
  { name: "Eren Yeager", image_url: "/images/eren-yeager.jpg" },
  { name: "Goku", image_url: "/images/goku.jpg" },
  { name: "Ichigo Kurosaki", image_url: "/images/ichigo-kurosagi.jpg" }, // filename typo kept as-is
  { name: "Itachi Uchiha", image_url: "/images/itachi-uchiha.jpg" },
  { name: "Izuku Midoriya", image_url: "/images/izuku.jpg" },
  { name: "Kakashi Hatake", image_url: "/images/kakashi-hatake.jpg" }, // filename typo
  { name: "Kenpachi Zaraki", image_url: "/images/kenpachi-zaraki.jpg" },
  { name: "Levi Ackerman", image_url: "/images/levi-ackerman.jpg" },
  { name: "Mahoraga", image_url: "/images/mahoraga.jpg" },
  { name: "Monkey D. Luffy", image_url: "/images/monkey-d-luffy.jpg" }, // filename typo
  { name: "Naruto Uzumaki", image_url: "/images/naruto-uzumaki.jpg" },
  { name: "Roronoa Zoro", image_url: "/images/rorona-zoro.jpg" }, // filename typo
  { name: "Sasuke Uchiha", image_url: "/images/sasuke-uchiha.jpg" },
  { name: "Tanjiro Kamado", image_url: "/images/tanjiro-kamado.jpg" },
  { name: "Vegeta", image_url: "/images/vegeta.jpg" },
];

export const seedCharacters = async () => {
  try {
    for (const char of characters) {
      await pool.query(
        "INSERT INTO characters (name, image_url) VALUES ($1, $2)",
        [char.name, char.image_url]
      );
    }
    console.log("Seeded 100 characters successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding characters:", err);
    process.exit(1);
  }
};
