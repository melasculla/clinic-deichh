import Appointment from '~~/server/Domain/Appointment/Entity/Appointment'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import { AppointmentQueryFilterRequest } from '~~/server/Application/Appointment/Request/AppointmentFilterRequest'

export default interface AppointmentRepositoryInterface {
   findAll(
      filters: AppointmentQueryFilterRequest,
      pagination: PaginationRequest,
   ): Promise<Array<{
      id: TAppointment['id']
      price: TAppointment['price']
      date: TAppointment['date']
      createdAt: TAppointment['createdAt']

      doctor: {
         id: TUser['id']
         name: TUser['name']
         email: TUser['email']
      },
      user: {
         id: TUser['id']
         name: TUser['name']
         email: TUser['email']
      }
   }>>

   findBy(by: 'id' | 'slug', column: number | string): Promise<Appointment | null>

   count(filters: AppointmentQueryFilterRequest): Promise<number>

   save(appointment: Appointment): Promise<Appointment>

   removeBy(by: 'id', id: number): Promise<void>
}