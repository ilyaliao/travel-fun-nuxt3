import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text().primaryKey(),
  title: text().notNull(),
  description: text(),
  content: text(),
  price: int().notNull(),
  originPrice: int("origin_price").notNull(),
  imageUrl: text("image_url"),
  imagesUrl: text("images_url", { mode: "json" }).$type<string[]>(),
  address: text(),
  city: text(),
  category: text(),
  coordinates: text({ mode: "json" }).$type<{ lat: number; lng: number }>(),
  evaluate: real().default(0),
  evaluateNum: int("evaluate_num").default(0),
  unit: text(),
  features: text(),
  isEnabled: int("is_enabled").default(1),
  createdAt: int("created_at").$defaultFn(() => Math.floor(Date.now() / 1000)),
});

export const plans = sqliteTable("plans", {
  id: int().primaryKey({ autoIncrement: true }),
  productId: text("product_id")
    .notNull()
    .references(() => products.id),
  title: text(),
  price: int(),
  description: text(),
});
