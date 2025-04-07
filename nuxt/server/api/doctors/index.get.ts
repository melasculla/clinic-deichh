import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import { PaginationSchema } from '~~/server/Shared/Request/PaginationRequest'
import { validateQuery } from '~~/server/utils/validation'
import GetAllDoctorsService from '~~/server/Domain/Appointment/Service/GetAllDoctorsService'

export default defineEventHandler({
   onRequest: [
      async event => await validateQuery(event, PaginationSchema, 'pagination'),
   ],
   handler: async event => {
      try {
         const result = await new GetAllDoctorsService().getAllDoctors(
            event.context.requestDTO.pagination
         )

         return new JsonResponse(result.doctors, undefined, result.total)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})