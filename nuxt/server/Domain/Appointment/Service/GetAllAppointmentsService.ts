import GetAllAppointmentsServiceInterface from './GetAllAppointmentsServiceInterface'
import AppointmentRepository from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepository'
import AppointmentRepositoryInterface from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepositoryInterface'
import { AppointmentQueryFilterRequest } from '~~/server/Application/Appointment/Request/AppointmentFilterRequest'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'

export default class GetAllAppointmentsService implements GetAllAppointmentsServiceInterface {
   constructor(
      private repository: AppointmentRepositoryInterface = new AppointmentRepository()
   ) { }

   public async getAllAppointments(
      filters: AppointmentQueryFilterRequest,
      pagination: PaginationRequest,
      doctorId: number
   ) {
      const [appointments, total] = await Promise.all([
         this.repository.findAll(filters, pagination, doctorId),
         this.repository.count(filters, doctorId)
      ])

      return { appointments, total }
   }
}