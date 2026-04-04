import { and, eq } from "drizzle-orm";
import { cartItems } from "~/server/database/schema";
import { db } from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const id = Number(getRouterParam(event, "id"));

  await db.delete(cartItems).where(and(eq(cartItems.id, id), eq(cartItems.userId, user.id)));

  return { success: true, message: "已刪除" };
});
