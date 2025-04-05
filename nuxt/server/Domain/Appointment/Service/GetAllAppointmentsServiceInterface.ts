import { AppointmentQueryFilterRequest } from '~~/server/Application/Appointment/Request/AppointmentFilterRequest'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import AppointmentRepositoryInterface from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepositoryInterface'

export default interface GetAllAppointmentsServiceInterface {
   getAllAppointments(
      filters: AppointmentQueryFilterRequest,
      pagination: PaginationRequest
   ): Promise<{
      appointments: Awaited<ReturnType<AppointmentRepositoryInterface['findAll']>>
      total: number
   }>
}