import { z } from 'h3-zod'

export const AppointmentPostSchema = z.object({
   doctorId: z.preprocess(zodPreprocessToNumber, z.number()),
   userId: z.preprocess(zodPreprocessToNumber, z.number()),
   date: zodTimeStamp,

   price: z.preprocess(zodPreprocessToNumber, z.number()).optional().nullable(),
}).strict()



export type AppointmentPostRequest = z.infer<typeof AppointmentPostSchema>