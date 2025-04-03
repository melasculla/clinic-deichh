import { type H3Event, type EventHandlerRequest, createError } from 'h3'
import {
   useSafeValidatedQuery,
   useSafeValidatedBody,
   useSafeValidatedParams,
} from 'h3-zod'
import { z, type ZodObject, type ZodRawShape } from 'zod'

export const validateBody = async (
   event: H3Event<EventHandlerRequest>,
   schema: ZodObject<ZodRawShape>,
) => {
   const body = await useSafeValidatedBody(event, schema)

   if (!body.data || body.error) {
      const object = body.error.errors[0]

      throw createError({
         statusCode: 400,
         message: `${object.message} in "${object.path}"`,
         data: body.error
      })
   }

   event.context.requestDTO.body = body.data
}

export const validateQuery = async (
   event: H3Event<EventHandlerRequest>,
   schema: ZodObject<ZodRawShape>,
   key: string = 'query'
) => {
   const query = await useSafeValidatedQuery(event, schema)

   if (!query.data || query.error) {
      const object = query.error.errors[0]

      throw createError({
         statusCode: 400,
         message: `${object.message} in "${object.path}"`,
         data: query.error
      })
   }

   event.context.requestDTO[key] = query.data
}

export const validateParams = async (
   event: H3Event<EventHandlerRequest>,
   schema: ZodObject<ZodRawShape>,
) => {
   const params = await useSafeValidatedParams(event, schema)

   if (!params.data || params.error) {
      const object = params.error.errors[0]

      throw createError({
         statusCode: 400,
         message: `${object.message} in "${object.path}"`,
         data: params.error
      })
   }

   event.context.requestDTO.params = params.data
}


export const zodPreprocessToNumber = (val: any) => typeof val === 'string' ? +val : val
export const zodPreprocessToString = (val: any) => typeof val === 'number' ? `${val}` : val

export const zodDate = z.string()
   .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format. Use YYYY-MM-DD.' })
   .transform((val) => {
      const date = new Date(val)

      if (isNaN(date.getTime())) { throw createError({ statusCode: 400, message: 'Invalid date of birth.' }) }

      return date.toISOString().split('T')[0]
   })
export const zodTimeStamp = z.preprocess(val => val && new Date(val as string), z.date())

export const zodImageJSON = z.object({
   path: z.string(),
   alt: z.string().optional(),
});