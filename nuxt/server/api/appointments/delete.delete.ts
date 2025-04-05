import DeleteAppointmentService from '~~/server/Domain/Appointment/Service/DeleteAppointmentService'
import { z } from 'h3-zod'

export default defineEventHandler({
   onRequest: [
      async event => await validateBody(event, z.object({ id: z.preprocess(zodPreprocessToNumber, z.number()) }))
   ],
   handler: async event => {
      try {
         await new DeleteAppointmentService().deleteAppointment(event.context.requestDTO.body.id)

         return sendNoContent(event)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})