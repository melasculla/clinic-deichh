import { joinURL } from 'ufo'

export const ROUTES = {
   client: {
      cats: {
         kittens: {
            list: (query: Record<any, any> = {}) => ({
               name: 'kittens',
               query
            }),

         },

         single: (slug: string, query: Record<any, any> = {}) => ({
            name: 'cats-slug',
            params: { slug },
            query
         })
      }
   },


   api: {
      cats: {
         list: '/api/cats' as const,
         single: (slug: string) => `/api/cats/${slug}` as const,
         create: '/api/cats/create' as const,
         edit: '/api/cats/edit' as const,
         delete: '/api/cats/delete' as const,
      },

      mail: {
         send: '/api/mail/send' as const
      },
   },
} as const