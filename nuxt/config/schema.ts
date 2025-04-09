import { pgTable, integer, serial, varchar, unique, pgEnum, timestamp, date, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

const userRoles = pgEnum('roles', ['admin', 'doctor', 'user'])

export const SPECIALIZATIONS_LIST = [
  'Депрессивные расстройства',
  'Сексуальные расстройства',
  'Тревожность',
  'Проблемы со сном',
  'Страхи и фобии',
  'Апатия',
  'Низкая самооценка и неуверенность в себе',
  'Самореализация',
  'Проблемы с общением',
  'Стрессовое состояние'
] as const;

export type TSpecializationName = typeof SPECIALIZATIONS_LIST[number];

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
  name: varchar('name', { length: 256 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date())
});

export type TSpecialization = typeof specializationsTable.$inferSelect
export type TNewSpecialization = typeof specializationsTable.$inferInsert

export const doctorSpecializationsTable = pgTable('doctor_specializations', {
  id: serial('id').primaryKey(),
  doctorId: integer('doctor_id').notNull().references(() => usersTable.id),
  specializationId: integer('specialization_id').notNull().references(() => specializationsTable.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  unq: unique().on(table.doctorId, table.specializationId)
}));

export type TDoctorSpecialization = typeof doctorSpecializationsTable.$inferSelect
export type TNewDoctorSpecialization = typeof doctorSpecializationsTable.$inferInsert

export const userRelations = relations(usersTable, ({ many }) => ({
  accounts: many(accountsTable),
  doctorAppointments: many(appointmentsTable, { relationName: 'doctor_appointments' }),
  patientAppointments: many(appointmentsTable, { relationName: 'patient_appointments' }),
  specializations: many(doctorSpecializationsTable),
}));

export const specializationRelations = relations(specializationsTable, ({ many }) => ({
  doctors: many(doctorSpecializationsTable), 
}));

export const doctorSpecializationRelations = relations(doctorSpecializationsTable, ({ one }) => ({
  doctor: one(usersTable, {
    fields: [doctorSpecializationsTable.doctorId],
    references: [usersTable.id],
  }),
  specialization: one(specializationsTable, {
    fields: [doctorSpecializationsTable.specializationId],
    references: [specializationsTable.id],
  }),
}));

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

export const appointmentRelations = relations(appointmentsTable, ({ one }) => ({
  doctor: one(usersTable, {
    fields: [appointmentsTable.doctorId],
    references: [usersTable.id],
    relationName: 'doctor_appointments',
  }),
  patient: one(usersTable, {
    fields: [appointmentsTable.userId],
    references: [usersTable.id],
    relationName: 'patient_appointments',
  }),
}))