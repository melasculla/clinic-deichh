import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './config/schema.ts',
	out: './migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.NUXT_POSTGRES_URL!
	},
});