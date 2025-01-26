// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  pgTableCreator,
  varchar
} from 'drizzle-orm/pg-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `social_migrate_${name}`);

export const authState = createTable(
  'auth_state',
  {
    key: varchar('key', { length: 1024 }).primaryKey().notNull(),
    state: varchar('state', { length: 1024 }).notNull(),
  }
);

export const authSession = createTable(
  'auth_session',
  {
    key: varchar('key', { length: 1024 }).primaryKey().notNull(),
    session: varchar('session', { length: 1024 }).notNull(),
  }
);
