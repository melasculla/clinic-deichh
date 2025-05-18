import { z } from 'h3-zod'

export const AppointmentPostSchema = z.object({
   doctorId: z.preprocess(zodPreprocessToNumber, z.number()),
   userId: z.preprocess(zodPreprocessToNumber, z.number()),
   date: zodTimeStamp,

   price: z.preprocess(zodPreprocessToNumber, z.number()).optional().nullable(),
}).strict()

const result = await $fetch('/api/appointments/create', {
   method: 'POST',
   body: {}
})

export type AppointmentPostRequest = z.infer<typeof AppointmentPostSchema>