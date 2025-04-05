import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import { AppointmentQueryFilterSchema } from '~~/server/Application/Appointment/Request/AppointmentFilterRequest'
import { PaginationSchema } from '~~/server/Shared/Request/PaginationRequest'
import { validateQuery } from '~~/server/utils/validation'
import GetAllAppointmentsService from '~~/server/Domain/Appointment/Service/GetAllAppointmentsService'

export default defineEventHandler({
   onRequest: [
      async event => await validateQuery(event, PaginationSchema, 'pagination'),
      async event => await validateQuery(event, AppointmentQueryFilterSchema, 'appointmentQuery'),
   ],
   handler: async event => {
      try {
         const result = await new GetAllAppointmentsService().getAllAppointments(
            event.context.requestDTO.appointmentQuery,
            event.context.requestDTO.pagination
         )

         return new JsonResponse(result.appointments, undefined, result.total)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})