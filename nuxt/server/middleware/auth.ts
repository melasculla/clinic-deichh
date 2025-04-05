// @ts-ignore
import { getServerSession } from '#auth'
import type { HTTPMethod } from 'h3'
import type { NitroFetchRequest } from 'nitropack'

declare module 'h3' {
   interface H3EventContext {
      roles?: TUser['roles']
      uid?: number
      email?: string
   }
}

type Route = {
   path: NitroFetchRequest
   permissions: { roles?: TUser['roles'], methods?: HTTPMethod[] }[]
}

const protectedRoutes: Route[] = [
   {
      path: '/api/admin',
      permissions: [
         { roles: ['admin'] }
      ]
   },
   {
      path: '/api/appointments',
      permissions: [
         { methods: ['GET'] },
         { roles: ['admin'] }
      ]
   }
]

export default defineEventHandler(async event => {
   const session = await getServerSession(event)
   event.context.roles = session?.roles
   event.context.uid = session?.uid
   event.context.email = session?.user?.email == null ? undefined : session.user.email

   const protectedRoute = protectedRoutes.find(({ path }) => event.path.startsWith(path as string))
   if (!protectedRoute)
      return

   let isAuthorized: boolean = false

   for (const permission of protectedRoute.permissions) {
      let allowedMethod: boolean = false
      let allowedRole: boolean = false

      if (permission.methods?.length)
         allowedMethod = permission.methods.includes(event.method)
      else
         allowedMethod = true

      if (permission.roles?.length)
         allowedRole = !!event.context.roles?.some(item => permission.roles?.includes(item))
      else
         allowedRole = true

      isAuthorized = allowedMethod && allowedRole
      if (isAuthorized)
         break
   }

   if (isAuthorized)
      return

   if (!session)
      throw createError({ statusCode: 401, message: 'Unauthorized' })

   throw createError({ statusCode: 403, message: 'Forbidden' })
})