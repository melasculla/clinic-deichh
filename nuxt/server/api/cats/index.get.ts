import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import { CatQueryFilterSchema } from '~~/server/Application/Cat/Request/CatFilterRequest'
import { PaginationSchema } from '~~/server/Shared/Request/PaginationRequest'
import { validateQuery } from '~~/server/utils/validation'
import GetAllCatsService from '~~/server/Domain/Cat/Service/GetAllCatsService'

export default defineEventHandler({
   onRequest: [
      async event => await validateQuery(event, PaginationSchema, 'pagination'),
      async event => await validateQuery(event, CatQueryFilterSchema, 'catQuery'),
   ],
   handler: async event => {
      try {
         const result = await new GetAllCatsService().getAllCats(
            event.context.requestDTO.catQuery,
            event.context.requestDTO.pagination
         )

         return new JsonResponse(result.cats, undefined, result.total)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})