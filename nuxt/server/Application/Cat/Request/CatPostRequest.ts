import { z } from 'h3-zod'

export const CatPostSchema = z.object({
   type: z.preprocess(zodPreprocessToString, z.enum(Object.keys(CAT_ENUM.type) as [string]).transform(Number)),
   gender: z.preprocess(zodPreprocessToString, z.enum(Object.keys(CAT_ENUM.gender) as [string]).transform(Number)),
   name: z.string().min(3),
   slug: z.string().min(3).refine(data => !['create', 'edit'].includes(data), 'This slug is reserved'),
   status: z.preprocess(zodPreprocessToString, z.enum(Object.keys(CAT_ENUM.status) as [string]).transform(Number)),
   price: z.preprocess(zodPreprocessToNumber, z.number()),

   color: z.preprocess(zodPreprocessToString, z.enum(Object.keys(CAT_ENUM.color) as [string]).transform(Number).optional().nullable()),

   sire: z.preprocess(zodPreprocessToNumber, z.number()).optional().nullable(),
   dam: z.preprocess(zodPreprocessToNumber, z.number()).optional().nullable(),

   thumbnail: zodImageJSON.optional().nullable(),
   gallery: z.array(zodImageJSON).refine(data => data.length > 0, 'Gallery must have at least 1 item').optional().nullable(),
   createdAt: zodTimeStamp.optional().nullable(),
}).strict()

export type CatPostRequest = z.infer<typeof CatPostSchema>