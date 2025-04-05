import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import GetAppointmentByService from '~~/server/Domain/Appointment/Service/GetAppointmentByService'
import { z } from 'h3-zod'

export default defineEventHandler({
   onRequest: [
      async event => await validateParams(event, z.object({ id: z.preprocess(zodPreprocessToNumber, z.number()) }))
   ],
   handler: async event => {
      try {
         const result = await new GetAppointmentByService().getAppointmentBy('id', event.context.requestDTO.params.id)

         return new JsonResponse(result.toJSON())
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})