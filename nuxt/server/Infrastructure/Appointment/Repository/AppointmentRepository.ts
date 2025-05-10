import AppointmentRepositoryInterface from './AppointmentRepositoryInterface'
import Appointment from '~~/server/Domain/Appointment/Entity/Appointment'

import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import { AppointmentQueryFilterRequest } from '~~/server/Application/Appointment/Request/AppointmentFilterRequest'

import { count, desc, eq, aliasedTable, inArray, and, gte, lte } from 'drizzle-orm'
import { PgSelectQueryBuilderBase } from 'drizzle-orm/pg-core'
import { DateTime } from 'luxon'

// Добавляем объявление типов для Luxon
declare module 'luxon' {
  interface DateTime {
    toJSDate(): Date;
  }
}

export default class AppointmentRepository implements AppointmentRepositoryInterface {
   private applyFilters<T extends PgSelectQueryBuilderBase<any, any, any, any, any, any, any, any, any>>(
      filters: AppointmentQueryFilterRequest,
      query: T
   ) {
      const proccessMaybeArray = (column: any, data?: null | number | number[]) => {
         if (data == null)
            return undefined

         if (Array.isArray(data) && data.length)
            return inArray(column, data)

         return eq(column, data)
      }

      // Фильтрация может быть добавлена здесь
   }

   public async count(filters: AppointmentQueryFilterRequest) {
      const query = db
         .select({ count: count() })
         .from(appointmentsTable)
         .$dynamic()

      this.applyFilters(filters, query)

      return (await query.execute())[0].count
   }

   public async findAll(
      filters: AppointmentQueryFilterRequest,
      pagination: PaginationRequest,
   ) {
      const doctor = aliasedTable(usersTable, 'doctor')

      const query = db
         .select({
            id: appointmentsTable.id,
            price: appointmentsTable.price,
            date: appointmentsTable.date,
            createdAt: appointmentsTable.createdAt,

            doctor: {
               id: doctor.id,
               name: doctor.name,
               email: doctor.email,
            },
            user: {
               id: usersTable.id,
               name: usersTable.name,
               email: usersTable.email,
            }
         })
         .from(appointmentsTable)
         .innerJoin(usersTable, eq(appointmentsTable.userId, usersTable.id))
         .innerJoin(doctor, eq(appointmentsTable.doctorId, doctor.id))
         .limit(100)
         .orderBy(desc(appointmentsTable.createdAt))
         .$dynamic()

      if (pagination.perPage && pagination.page)
         query
            .limit(pagination.perPage)
            .offset((pagination.page! - 1) * pagination.perPage)

      this.applyFilters(filters, query)

      return await query.execute()
   }

   public async findBy(by: 'id', column: number) {
      const doctor = aliasedTable(usersTable, 'doctor')

      const result = await db.select({
         ...appointmentsTable as TAppointmentColumns,
      })
         .from(appointmentsTable)
         .innerJoin(usersTable, eq(appointmentsTable.userId, usersTable.id))
         .innerJoin(doctor, eq(appointmentsTable.doctorId, doctor.id))
         .where(eq(appointmentsTable[by], column))

      return new Appointment(result as any)
   }

   public async removeBy(by: 'id', id: number) {
      await db.delete(appointmentsTable).where(eq(appointmentsTable[by], id))
   }

   public async save(appointment: Appointment) {
      const { id, ...data } = appointment.toJSON()

      if (appointment.getId()) {
         const [updated] = await db.update(appointmentsTable).set(data).where(eq(appointmentsTable.id, appointment.getId()!)).returning()

         appointment.fromDB(updated)
      } else {
         const [inserted] = await db.insert(appointmentsTable).values(data).returning()

         appointment.fromDB(inserted)
      }

      return appointment
   }

   public async getAvailableSlots(doctorId: number, date: string, duration: number = 30): Promise<string[]> {
      const parsedDate = DateTime.fromISO(date)
      if (!parsedDate.isValid) {
         throw new Error('Некорректный формат даты')
      }

      const startDate = parsedDate.startOf('day')
      const endDate = parsedDate.endOf('day')

      const existingAppointments = await db
         .select({ date: appointmentsTable.date })
         .from(appointmentsTable)
         .where(
            and(
               eq(appointmentsTable.doctorId, doctorId),
               gte(appointmentsTable.date, startDate.toJSDate()),
               lte(appointmentsTable.date, endDate.toJSDate())
            )
         )

      const workStartHour = 9
      const workEndHour = 17
      const slotDuration = duration

      const allSlots: Date[] = []
      let currentSlot = startDate.set({ hour: workStartHour, minute: 0, second: 0 })

      while (currentSlot.hour < workEndHour || (currentSlot.hour === workEndHour && currentSlot.minute === 0)) {
         allSlots.push(currentSlot.toJSDate())
         currentSlot = currentSlot.plus({ minutes: slotDuration })
      }

      const bookedSlots = existingAppointments.map(app => 
         DateTime.fromJSDate(app.date).toFormat('HH:mm')
      )

      const availableSlots = allSlots.filter(slot => {
         const slotTime = DateTime.fromJSDate(slot).toFormat('HH:mm')
         return !bookedSlots.includes(slotTime)
      })

      return availableSlots.map(slot => DateTime.fromJSDate(slot).toFormat('HH:mm'))
   }

   public async createWithDateTime(appointment: Appointment, dateTime: string): Promise<Appointment> {
      const parsedDateTime = DateTime.fromISO(dateTime)
      if (!parsedDateTime.isValid) {
         throw new Error('Неверный формат даты и времени')
      }

      // Используем getDoctorId() вместо прямого доступа к приватному свойству
      const doctorId = appointment.getDoctorId()
      
      const availableSlots = await this.getAvailableSlots(
         doctorId,
         parsedDateTime.toFormat('yyyy-MM-dd')
      )

      const requestedTime = parsedDateTime.toFormat('HH:mm')
      if (!availableSlots.includes(requestedTime)) {
         throw new Error('Выбранное время уже занято')
      }

      // Используем setDate() для установки даты
      appointment.setDate(parsedDateTime.toJSDate())
      return this.save(appointment)
   }
}