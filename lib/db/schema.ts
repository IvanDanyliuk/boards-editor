import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';


export const teams = pgTable('teams', {
  id: text('id').notNull(),
  name: text('name').notNull().unique(),
  teamLogo: text('team_logo'),
  teamColor: text('teamColor').notNull(),
  memberIds: uuid('member_ids').array().notNull(),
  projectIds: text('project_ids').array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type InsertTeam = typeof teams.$inferInsert;
export type SelectTeam = typeof teams.$inferSelect;