import { z } from 'h3-zod'

export const AppointmentQueryFilterSchema = z.object({
   orderBy: z.preprocess(val => {
      if (typeof val === 'string')
         try { return JSON.parse(val) } catch { return undefined }

      return val
   }, z.object({
      column: z.enum(['price']),
      direction: z.enum(['asc', 'desc']),
   }), { message: 'Wrong JSON format' }).optional().nullable(),

   // Добавленные фильтры из комментариев (без изменения структуры)
   doctorId: z.string().optional(),
   dateFrom: z.string().optional(),
   dateTo: z.string().optional(),
   status: z.string().optional()
})

export type AppointmentQueryFilterRequest = z.infer<typeof AppointmentQueryFilterSchema>