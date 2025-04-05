import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import { AppointmentPostSchema } from '~~/server/Application/Appointment/Request/AppointmentPostRequest'
import CreateAppointmentService from '~~/server/Domain/Appointment/Service/CreateAppointmentService'

export default defineEventHandler({
   onRequest: [
      async event => await validateBody(event, AppointmentPostSchema),
   ],
   handler: async event => {
      try {
         const result = await new CreateAppointmentService().createAppointment(event.context.requestDTO.body)

         setResponseStatus(event, 201)
         return new JsonResponse(result.toJSON(), 201)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})