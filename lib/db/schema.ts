import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';


// export const users = pgTable('users', {
//   id: uuid('id').primaryKey().notNull(),
//   name: text('name').notNull().unique(),
//   email: text('email').notNull().unique(),
//   imageUrl: text('image_url'),
//   role: text('role').notNull(),
//   company: text('company'),
//   industry: text('industry').notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// });

export const teams = pgTable('teams', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull().unique(),
  teamLogo: text('team_logo'),
  memberIds: uuid('user_ids').notNull(),
  projectIds: uuid('user_ids').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// export type InsertUser = typeof users.$inferInsert;
// export type SelectUser = typeof users.$inferSelect;

export type InsertTeam = typeof teams.$inferInsert;
export type SelectTeam = typeof teams.$inferSelect;