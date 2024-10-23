CREATE TABLE IF NOT EXISTS "teams" (
	"id" text NOT NULL,
	"name" text NOT NULL,
	"team_logo" text,
	"teamColor" text NOT NULL,
	"member_ids" uuid[] NOT NULL,
	"project_ids" text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "teams_name_unique" UNIQUE("name")
);
