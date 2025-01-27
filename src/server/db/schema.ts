// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { NodeSavedSession, NodeSavedState } from "@atproto/oauth-client-node";
import { pgTableCreator, varchar, json } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `social_migrate_${name}`);

export const authState = createTable("auth_state", {
  key: varchar("key", { length: 255 }).primaryKey().notNull(),
  state: json("state").$type<NodeSavedState>().notNull(),
});

export const authSession = createTable("auth_session", {
  key: varchar("key", { length: 255 }).primaryKey().notNull(),
  session: json("session").$type<NodeSavedSession>().notNull(),
});
