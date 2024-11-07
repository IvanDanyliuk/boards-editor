import { relations } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp, pgSchema, primaryKey } from 'drizzle-orm/pg-core';


const authSchema = pgSchema('auth');
const users = authSchema.table('users', {
  id: uuid('id').primaryKey()
})

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().references(() => users.id),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  userColor: text('user_color').notNull(),
  company: text('company').notNull(),
  role: text('role'),
  industry: text('industry'),
  // teams: uuid('teams').references(() => teams.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const profileRelations = relations(profiles, ({ many }) => ({
  teams: many(profilesOnTeams)
}));

export const teams = pgTable('teams', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull().unique(),
  teamLogo: text('team_logo'),
  teamColor: text('team_color').notNull(),
  admin: text('admin').notNull(),
  // memberIds: uuid('member_ids').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  projectIds: text('project_ids').array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const teamRelations = relations(teams, ({ many }) => ({
  profiles: many(profilesOnTeams)
}));

export const profilesOnTeams = pgTable(
  'profiles_categories', 
  {
    userId: uuid('user_id').notNull().references(() => profiles.id),
    teamId: uuid('team_id').notNull().references(() => teams.id)
  },
  (t) => ({
    pk: primaryKey(t.teamId, t.userId)
  })
);

export const profilesOnTeamsRelations = relations(profilesOnTeams, ({ one }) => ({
  profile: one(profiles, {
    fields: [profilesOnTeams.userId],
    references: [profiles.id]
  }),
  team: one(teams, {
    fields: [profilesOnTeams.teamId],
    references: [teams.id]
  })
}));

export type InsertProfile = typeof profiles.$inferInsert;
export type SelectProfile = typeof profiles.$inferSelect;

export type InsertTeam = typeof teams.$inferInsert;
export type SelectTeam = typeof teams.$inferSelect;