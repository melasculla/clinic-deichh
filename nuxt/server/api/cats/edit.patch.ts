import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import { CatPatchSchema } from '~~/server/Application/Cat/Request/CatPatchRequest'
import EditCatService from '~~/server/Domain/Cat/Service/EditCatService'

export default defineEventHandler({
   onRequest: [
      async event => await validateBody(event, CatPatchSchema),
   ],
   handler: async event => {
      try {
         const result = await new EditCatService().editCat(event.context.requestDTO.body)

         setResponseStatus(event, 201)
         return new JsonResponse(result.toJSON(), 201)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})