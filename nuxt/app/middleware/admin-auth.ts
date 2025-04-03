export default defineNuxtRouteMiddleware(async (to, from) => {
   const { status, data } = useAuth()

   if (status.value === 'unauthenticated' || !data.value) {
      if (import.meta.server)
         return await navigateTo(`/api/auth/signin?callbackUrl=${encodeURIComponent(to.fullPath)}`, { external: true })

      const callbackUrl = useState<string | null>('auth:callbackUrl', () => null)
      callbackUrl.value = to.fullPath

      // useModalWindow('popup:auth').open()
      return abortNavigation()
   }

   if (!data.value.roles?.includes('admin'))
      return await navigateTo('/')
})