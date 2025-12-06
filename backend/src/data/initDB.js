import { createUsertable } from "./createUserTable.js";
import { createCharacterTable } from "./createCharacterTable.js";
import { createScoreTable } from "./createScoreTable.js";

export const initDB = async () => {
  try {
    console.log("\n📦 Initializing database...");

    await createUsertable();
    await createCharacterTable();
    await createScoreTable();

    console.log("✅ All tables checked/created successfully!");
    console.log("-----------------------------------------\n");

  } catch (error) {
    console.error("❌ Database initialization failed:", error);
  }
};
