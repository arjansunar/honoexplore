import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";

export const messageTable = t.sqliteTable("messages_table", {
  id: t.int().primaryKey({ autoIncrement: true }),
  content: t.text().notNull(),
  createdAt: t.text().default(sql`(CURRENT_TIMESTAMP)`),
});
