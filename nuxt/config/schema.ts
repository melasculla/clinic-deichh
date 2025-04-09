import { pgTable, integer, serial, varchar, unique, pgEnum, timestamp } from 'drizzle-orm/pg-core'

const userRoles = pgEnum('roles', ['admin', 'doctor', 'user'])
// export const SPECIALIZATIONS_LIST = [
//   'Депрессивные расстройства',
//   'Сексуальные расстройства',
//   'Тревожность',
//   'Проблемы со сном',
//   'Страхи и фобии',
//   'Апатия',
//   'Низкая самооценка и неуверенность в себе',
//   'Самореализация',
//   'Проблемы с общением',
//   'Стрессовое состояние',
// ] as const
// export type TSpecializationName = typeof SPECIALIZATIONS_LIST[number]

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  name: varchar('name', { length: 256 }).notNull(),
  roles: userRoles().array().default(['user']),
})

export type TUser = typeof usersTable.$inferSelect
export type TNewUser = typeof usersTable.$inferInsert



export const specializationsTable = pgTable('specializations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique()
})

export type TSpecialization = typeof specializationsTable.$inferSelect
export type TNewSpecialization = typeof specializationsTable.$inferInsert



export const doctorSpecializationsTable = pgTable('doctor_specializations', {
  id: serial('id').primaryKey(),
  doctorId: integer('doctor_id').notNull().references(() => usersTable.id),
  specializationId: integer('specialization_id').notNull().references(() => specializationsTable.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ([
  unique().on(table.doctorId, table.specializationId)
]))

export type TDoctorSpecialization = typeof doctorSpecializationsTable.$inferSelect
export type TNewDoctorSpecialization = typeof doctorSpecializationsTable.$inferInsert



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
  date: timestamp('appointment_date', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date())
})

export type TAppointment = typeof appointmentsTable.$inferSelect
export type TNewAppointment = typeof appointmentsTable.$inferInsert
export type TAppointmentColumns = typeof appointmentsTable._.columns