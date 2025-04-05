import { pgTable, integer, serial, varchar, unique, pgEnum, timestamp, date } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

const userRoles = pgEnum('roles', ['admin', 'doctor', 'user'])
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



export const appointmentsTable = pgTable('appointments', {
   id: serial('id').primaryKey(),
   doctorId: integer('doctor_id').references(() => usersTable.id).notNull(),
   userId: integer('user_id').references(() => usersTable.id).notNull(),
   price: integer('price'),
   date: date('date').notNull(),
   createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
})

export type TAppointment = typeof appointmentsTable.$inferSelect
export type TNewAppointment = typeof appointmentsTable.$inferInsert
export type TAppointmentColumns = typeof appointmentsTable._.columns