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
      additionalFilters?: {
        doctorId?: number
        dateFrom?: string
        dateTo?: string
        status?: string
      }
   ) {
      const [appointments, total] = await Promise.all([
         this.repository.findAll(filters, pagination),
         this.repository.count(filters)
      ])

      return { appointments, total }
   }
}