import { z } from 'h3-zod'

export const PaginationSchema = z.object({
   perPage: z.string().optional().transform(val => val ? parseInt(val) : undefined),
   page: z.string().optional().transform(val => val ? parseInt(val) : undefined),
})

export type PaginationRequest = z.infer<typeof PaginationSchema>