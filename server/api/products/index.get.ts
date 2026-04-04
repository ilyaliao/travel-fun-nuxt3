import { and, count, eq } from "drizzle-orm";
import { products } from "~/server/database/schema";
import { db } from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const category = query.category as string | undefined;
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const where = and(
    eq(products.isEnabled, 1),
    category ? eq(products.category, category) : undefined,
  );

  const [{ total }] = await db.select({ total: count() }).from(products).where(where);
  const totalPages = Math.ceil(total / limit);

  const rows = await db
    .select()
    .from(products)
    .where(where)
    .limit(limit)
    .offset((page - 1) * limit)
    .all();

  return {
    success: true,
    products: rows,
    pagination: {
      category: category || "",
      current_page: page,
      total_pages: totalPages,
      has_pre: page > 1,
      has_next: page < totalPages,
    },
  };
});
