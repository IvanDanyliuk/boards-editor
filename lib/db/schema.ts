import { pgTable, uuid, text } from 'drizzle-orm/pg-core';


export const teams = pgTable('teams', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull().unique(),
  teamLogo: text('team_logo'),
  teamColor: text('teamColor').notNull(),
  memberIds: text('user_ids').array().notNull(),
  projectIds: uuid('user_ids').array().notNull(),
  createdAt: text('created_at').notNull(),
});

export type InsertTeam = typeof teams.$inferInsert;
export type SelectTeam = typeof teams.$inferSelect;