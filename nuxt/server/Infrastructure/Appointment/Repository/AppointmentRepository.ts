import AppointmentRepositoryInterface from './AppointmentRepositoryInterface'
import Appointment from '~~/server/Domain/Appointment/Entity/Appointment'

import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import { AppointmentQueryFilterRequest } from '~~/server/Application/Appointment/Request/AppointmentFilterRequest'

import { count, desc, eq, aliasedTable, inArray } from 'drizzle-orm'
import { PgSelectQueryBuilderBase } from 'drizzle-orm/pg-core'

export default class AppointmentRepository implements AppointmentRepositoryInterface {
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

   public async count(filters: AppointmentQueryFilterRequest) {
      const query = db
         .select({ count: count() })
         .from(appointmentsTable)
         .$dynamic()

      this.applyFilters(filters, query)

      return (await query.execute())[0].count
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

   public async removeBy(by: 'id', id: number) {
      await db.delete(appointmentsTable).where(eq(appointmentsTable[by], id))
   }

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

      // query
      //    .where(and(
      //       proccessMaybeArray(appointmentsTable.gender, filters.gender),
      //       proccessMaybeArray(appointmentsTable.status, filters.status),
      //       proccessMaybeArray(appointmentsTable.color, filters.color),
      //    ))
   }
}