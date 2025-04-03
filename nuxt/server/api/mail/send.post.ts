import SendBaseFormService from '~~/server/Domain/Mail/Service/SendBaseFormService'
import { BaseFormSchema } from '~~/server/Application/Mail/Request/BaseFormRequest'
import { BaseFormDTO } from '~~/server/Domain/Mail/DTO/BaseFormDTO'

export default defineEventHandler({
   onRequest: [
      async event => await validateBody(event, BaseFormSchema),
   ],
   handler: async event => {
      try {
         const dto = new BaseFormDTO(event.context.requestDTO.body)
         await new SendBaseFormService().sendForm(dto)

         return sendNoContent(event, 201)
      } catch (err: any) {
         throw createError({ statusCode: err.statusCode || err.code, message: err.message })
      }
   }
})