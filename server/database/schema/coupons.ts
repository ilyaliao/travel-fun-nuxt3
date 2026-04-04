import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const coupons = sqliteTable("coupons", {
  id: int().primaryKey({ autoIncrement: true }),
  code: text().notNull().unique(),
  title: text(),
  percent: int(),
  dueDate: int("due_date"),
  isEnabled: int("is_enabled").default(1),
});
