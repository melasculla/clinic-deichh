import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import GetAllAppointmentsService from '~~/server/Domain/Appointment/Service/GetAllAppointmentsService'

import { AppointmentQueryFilterSchema } from '~~/server/Application/Appointment/Request/AppointmentFilterRequest'
import { PaginationSchema } from '~~/server/Shared/Request/PaginationRequest'

import { z } from 'h3-zod'

export default defineEventHandler({
   onRequest: [
      async event => await validateQuery(event, AppointmentQueryFilterSchema, 'filters'),
      async event => await validateQuery(event, PaginationSchema, 'pagination'),
      async event => await validateParams(event, z.object({ id: z.preprocess(zodPreprocessToNumber, z.number()) }))
   ],
   handler: async event => {
      try {
         const { appointments, total } = await new GetAllAppointmentsService().getAllAppointments(
            event.context.requestDTO.filters,
            event.context.requestDTO.pagination,
            event.context.requestDTO.params.id
         )

         return new JsonResponse(appointments, undefined, total)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})