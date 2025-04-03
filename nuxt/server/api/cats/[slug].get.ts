import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import GetCatByService from '~~/server/Domain/Cat/Service/GetCatByService'

export default defineEventHandler({
   onRequest: [],
   handler: async event => {
      try {
         const result = await new GetCatByService().getCatBy('slug', event.context.params!.slug)

         return new JsonResponse(result.toJSON())
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})