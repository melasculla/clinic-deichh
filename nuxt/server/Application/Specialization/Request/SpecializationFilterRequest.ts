import { z } from 'h3-zod'

export const SpecializationFilterRequestSchema = z.object({
   specializations: z
      .preprocess(val =>
         Array.isArray(val)
            ? val
            : [val]
         , z.array(z.string().min(3))
      )
      .optional().nullable()
      .transform(val => val?.map(item => item.toLowerCase())),
   // experience: z.enum(['any', '5', '10']).optional().default('any'),
})

export type SpecializationFilterRequestRequest = z.infer<typeof SpecializationFilterRequestSchema>