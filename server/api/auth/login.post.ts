import { eq } from "drizzle-orm";
import { z } from "zod";
import { users } from "~/server/database/schema";
import { db } from "~/server/utils/db";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  const user = await db.select().from(users).where(eq(users.email, body.email)).get();
  if (!user) {
    throw createError({ statusCode: 401, message: "帳號或密碼錯誤" });
  }

  if (!(await verifyPassword(user.password, body.password))) {
    throw createError({ statusCode: 401, message: "帳號或密碼錯誤" });
  }

  await setUserSession(event, {
    user: { id: user.id, email: user.email, name: user.name },
    loggedInAt: Date.now(),
  });

  return { success: true, message: "登入成功" };
});
