import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import { CatPostSchema } from '~~/server/Application/Cat/Request/CatPostRequest'
import CreateCatService from '~~/server/Domain/Cat/Service/CreateCatService'

export default defineEventHandler({
   onRequest: [
      async event => await validateBody(event, CatPostSchema),
   ],
   handler: async event => {
      try {
         const result = await new CreateCatService().createCat(event.context.requestDTO.body)

         setResponseStatus(event, 201)
         return new JsonResponse(result.toJSON(), 201)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})