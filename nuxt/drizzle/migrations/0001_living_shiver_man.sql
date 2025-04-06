ALTER TABLE "users" ADD COLUMN "login" varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_login_unique" UNIQUE("login");