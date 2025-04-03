import { pgTable, integer, text, serial, varchar, unique, pgEnum, type AnyPgColumn, timestamp, boolean, smallint, date, json } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

const userRoles = pgEnum('roles', ['admin', 'editor', 'user'])
export const usersTable = pgTable('users', {
   id: serial('id').primaryKey(),
   email: varchar('email', { length: 256 }).notNull().unique(),
   name: varchar('name', { length: 256 }).notNull(),
   roles: userRoles().array().default(['user']),
})

export type TUser = typeof usersTable.$inferSelect
export type TNewUser = typeof usersTable.$inferInsert

export const userRelations = relations(usersTable, ({ many }) => ({
   accounts: many(accountsTable)
}))



export const accountsTable = pgTable('user_accounts', {
   id: serial('id').primaryKey(),
   userId: integer('user_id').notNull().references(() => usersTable.id),
   provider: varchar('provider', { length: 256 }).notNull(),
   providerAccountId: varchar('provider_account_id', { length: 256 }).notNull(),
}, (table) => [
   unique().on(table.provider, table.providerAccountId)
])

export type TAccount = typeof accountsTable.$inferSelect
export type TNewAccount = typeof accountsTable.$inferInsert



export const catsTable = pgTable('cats', {
   id: serial('id').primaryKey(),
   gender: smallint('gender').notNull(),
   name: varchar('name').notNull(),
   slug: varchar('slug').notNull().unique(),
   color: integer('color'),
   status: integer('status'),
   thumbnail: json('thumbnail').$type<ImageJSON>(),
   gallery: json('gallery').$type<ImageJSON[]>(),
   sire: integer('sire').references((): AnyPgColumn => catsTable.id),
   dam: integer('dam').references((): AnyPgColumn => catsTable.id),
   createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
})

export type TCat = typeof catsTable.$inferSelect
export type TNewCat = typeof catsTable.$inferInsert
export type TCatColumns = typeof catsTable._.columns