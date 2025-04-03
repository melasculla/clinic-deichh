import { z } from 'h3-zod'

export const CatPatchSchema = z.object({
   id: z.preprocess(zodPreprocessToNumber, z.number()),
   type: z.preprocess(zodPreprocessToString, z.enum(Object.keys(CAT_ENUM.type) as [string]).transform(Number).optional()),
   gender: z.preprocess(zodPreprocessToString, z.enum(Object.keys(CAT_ENUM.gender) as [string]).transform(Number).optional()),
   name: z.string().min(3).optional(),
   slug: z.string().min(3).refine(data => !['create', 'edit'].includes(data), 'This slug is reserved').optional(),
   status: z.preprocess(zodPreprocessToString, z.enum(Object.keys(CAT_ENUM.status) as [string]).transform(Number).optional()),

   color: z.preprocess(zodPreprocessToString, z.enum(Object.keys(CAT_ENUM.color) as [string]).transform(Number).optional().nullable()),

   sire: z.preprocess(zodPreprocessToNumber, z.number()).optional().nullable(),
   dam: z.preprocess(zodPreprocessToNumber, z.number()).optional().nullable(),

   thumbnail: zodImageJSON.optional().nullable(),
   gallery: z.array(zodImageJSON).refine(data => data.length > 0, 'Gallery must have at least 1 item').optional().nullable(),
   createdAt: zodTimeStamp.optional().nullable(),
}).strict()

export type CatPatchRequest = z.infer<typeof CatPatchSchema>