import { pgTable, uuid, text, timestamp, pgSchema } from 'drizzle-orm/pg-core';


const authSchema = pgSchema('auth');
const users = authSchema.table('users', {
  id: uuid('id').primaryKey()
})

export const profiles: any = pgTable('profiles', {
  id: uuid('id').primaryKey().references(() => users.id),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  userColor: text('user_color').notNull(),
  company: text('company').notNull(),
  role: text('role'),
  industry: text('industry'),
  teams: uuid('teams').references(() => teams.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const teams: any = pgTable('teams', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull().unique(),
  teamLogo: text('team_logo'),
  teamColor: text('team_color').notNull(),
  admin: text('admin').notNull(),
  memberIds: uuid('member_ids').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  projectIds: text('project_ids').array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type InsertProfile = typeof profiles.$inferInsert;
export type SelectProfile = typeof profiles.$inferSelect;

export type InsertTeam = typeof teams.$inferInsert;
export type SelectTeam = typeof teams.$inferSelect;