import { z } from 'h3-zod'

export const SearchSchema = z.object({
   searchParam: z.string().optional().nullable(),
})

export type SearchRequest = z.infer<typeof SearchSchema>