import { z } from 'h3-zod'

export const CatQueryFilterSchema = z.object({
   orderBy: z.preprocess(val => {
      if (typeof val === 'string')
         try { return JSON.parse(val) } catch { return undefined }

      return val
   }, z.object({
      column: z.enum(['price']),
      direction: z.enum(['asc', 'desc']),
   }), { message: 'Wrong JSON format' }).optional().nullable()
})

export type CatQueryFilterRequest = z.infer<typeof CatQueryFilterSchema>