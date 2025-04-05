import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import { AppointmentPatchSchema } from '~~/server/Application/Appointment/Request/AppointmentPatchRequest'
import EditAppointmentService from '~~/server/Domain/Appointment/Service/EditAppointmentService'

export default defineEventHandler({
   onRequest: [
      async event => await validateBody(event, AppointmentPatchSchema)
   ],
   handler: async event => {
      try {
         const result = await new EditAppointmentService().ediTAppointment(event.context.requestDTO.body)

         setResponseStatus(event, 201)
         return new JsonResponse(result.toJSON(), 201)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})