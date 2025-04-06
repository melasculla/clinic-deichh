ALTER TABLE "users" DROP CONSTRAINT "users_login_unique";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "login";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password";