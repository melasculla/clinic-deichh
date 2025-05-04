import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import GetAllSpecializationsService from '~~/server/Domain/Specialization/Service/GetAllSpecializationsService'

export default defineEventHandler({
   onRequest: [],
   handler: async event => {
      try {
         const result = await new GetAllSpecializationsService().getAllSpecializations()

         return new JsonResponse(result)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})