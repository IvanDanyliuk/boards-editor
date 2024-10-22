CREATE TABLE IF NOT EXISTS "teams" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"team_logo" text,
	"teamColor" text NOT NULL,
	"user_ids" uuid[] NOT NULL,
	"created_at" text NOT NULL,
	CONSTRAINT "teams_name_unique" UNIQUE("name")
);
