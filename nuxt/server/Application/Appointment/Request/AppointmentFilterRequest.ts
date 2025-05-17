import { z } from 'h3-zod'

export const AppointmentQueryFilterSchema = z.object({
   orderBy: z.preprocess(val => {
      if (typeof val === 'string')
         try { return JSON.parse(val) } catch { return undefined }

      return val
   }, z.object({
      column: z.enum(['price']),
      direction: z.enum(['asc', 'desc']),
   }), { message: 'Wrong JSON format' }).optional().nullable()
})

export type AppointmentQueryFilterRequest = z.infer<typeof AppointmentQueryFilterSchema>

// добавь их сюда в схему

// Дополнительные фильтры
// const doctorFilter = {
//    doctorId,
//    // ...(query.dateFrom && { dateFrom: String(query.dateFrom) }),
//    // ...(query.dateTo && { dateTo: String(query.dateTo) }),
//    // ...(query.status && { status: String(query.status) })
// }