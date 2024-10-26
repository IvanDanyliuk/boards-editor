import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';


export const teams = pgTable('teams', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull().unique(),
  teamLogo: text('team_logo'),
  teamColor: text('teamColor').notNull(),
  admin: text('admin').notNull(),
  memberIds: text('member_ids').array().notNull(),
  projectIds: text('project_ids').array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type InsertTeam = typeof teams.$inferInsert;
export type SelectTeam = typeof teams.$inferSelect;