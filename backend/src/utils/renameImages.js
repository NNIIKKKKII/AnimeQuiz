import fs, { existsSync } from "fs";
import path from "path";
import sharp from "sharp";

const rawDir = path.join(process.cwd(), "public", "raw-images");
const outDir = path.join(process.cwd(), "public", "images");

if (!existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

//This whole function attachs.jpg to the incmoing file thats all !
const renameFile = (file) => {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);

  let cleanName = base
    .replace(/_/g, "-") // underscores → hyphens
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/[^a-zA-Z0-9-]/g, "") // remove weird chars, keep letters
    .replace(/-+/g, "-") // collapse multiple hyphens
    .toLowerCase() // lowercase everything
    .trim();

  const newFileName = `${cleanName}.jpg`;

  return { cleanName, newFileName };
};

const convertAndMove = async (file) => {
  const { newFileName } = renameFile(file);

  const inputPath = path.join(rawDir, file); //creates path like public/raw-images/Naruto uzumaki.png
  const outputPath = path.join(outDir, newFileName); //creates path like public/images/naruto-uzumaki.jpg

  try {
    await sharp(inputPath).jpeg({ quality: 90 }).toFile(outputPath); //processes the image stores it in the output folder

    console.log(`Renamed & converted → ${newFileName}`);
  } catch (err) {
    console.error("Error processing file:", file, err);
  }
};

const run = async () => {
  const files = fs.readdirSync(rawDir); //sync.. reads the files from the folder and stores it as array

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue; //makes sure to only pick image wala file
    await convertAndMove(file); //convert them into .jpg 90 quality
  }

  console.log("✨ All images processed!");
};

run();
