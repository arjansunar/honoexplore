import { db } from "./index.js";
import { messageTable } from "./schema.js";

export async function getAllMessage() {
  return await db.select().from(messageTable);
}

export async function addMessage(content: string) {
  return await db.insert(messageTable).values({ content }).returning();
}
