import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "../utils/db";

export default defineNitroPlugin(async () => {
  if (import.meta.dev) {
    await migrate(db, { migrationsFolder: "server/database/migrations" });
    console.log("[db] migrations applied");
  }
});
