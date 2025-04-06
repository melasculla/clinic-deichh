CREATE TABLE "user_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"provider" varchar(256) NOT NULL,
	"provider_account_id" varchar(256) NOT NULL,
	CONSTRAINT "user_accounts_provider_provider_account_id_unique" UNIQUE("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "cats" (
	"id" serial PRIMARY KEY NOT NULL,
	"gender" smallint NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"color" integer,
	"status" integer,
	"thumbnail" json,
	"gallery" json,
	"sire" integer,
	"dam" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cats_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"roles" "roles"[] DEFAULT '{"user"}',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user_accounts" ADD CONSTRAINT "user_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cats" ADD CONSTRAINT "cats_sire_cats_id_fk" FOREIGN KEY ("sire") REFERENCES "public"."cats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cats" ADD CONSTRAINT "cats_dam_cats_id_fk" FOREIGN KEY ("dam") REFERENCES "public"."cats"("id") ON DELETE no action ON UPDATE no action;