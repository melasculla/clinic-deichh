import { z } from 'h3-zod'

export const BaseFormSchema = z.object({
   name: z.string().min(3, 'Name must be at least 3 characters long'),
   phone: z.string().regex(/^\+?[0-9\s]+$/, 'Invalid phone number format').optional().nullable(),
   // phoneCountry: z.string().length(2, 'Phone country must be 2 characters long').optional().nullable(),
   email: z.string().email('Invalid email format'),
   message: z.string().optional().nullable(),
}).strict()

// export const CombinedBaseFormSchema = z.union([BaseFormSchema, BaseFormSchema])

export type BaseFormRequest = z.infer<typeof BaseFormSchema>