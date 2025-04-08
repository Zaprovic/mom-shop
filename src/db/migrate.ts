import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from ".";

export const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations/",
    });

    console.log({
      message: "Migration completed succesfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error migrating database");

    console.log({
      error,
    });

    process.exit(1);
  }
};

main();
