import { joinURL } from 'ufo'

export const ROUTES = {
   client: {
      appointments: {
         list: (query: Record<any, any> = {}) => ({
            name: 'kittens',
            query
         }),

         single: (slug: string, query: Record<any, any> = {}) => ({
            name: 'appointments-slug',
            params: { slug },
            query
         })
      }
   },


   api: {
      appointments: {
         list: '/api/appointments' as const,
         single: (id: number) => `/api/appointments/${id}` as const,
         create: '/api/appointments/create' as const,
         edit: '/api/appointments/edit' as const,
         delete: '/api/appointments/delete' as const,
      },

      mail: {
         send: '/api/mail/send' as const
      },
   },
} as const