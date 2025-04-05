import { z } from 'h3-zod'

export const AppointmentPatchSchema = z.object({
   id: z.preprocess(zodPreprocessToNumber, z.number()),
   doctorId: z.preprocess(zodPreprocessToNumber, z.number()).optional(),
   userId: z.preprocess(zodPreprocessToNumber, z.number()).optional(),
   date: zodTimeStamp.optional(),

   price: z.preprocess(zodPreprocessToNumber, z.number()).optional().nullable(),

   createdAt: zodTimeStamp.optional(),
}).strict()

export type AppointmentPatchRequest = z.infer<typeof AppointmentPatchSchema>