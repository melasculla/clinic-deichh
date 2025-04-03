import { joinURL } from 'ufo'

export default defineNuxtRouteMiddleware(async (to, from) => {
   useState<boolean>('isMenuVisible').value = false
   useState<boolean>('isSubscribeShown').value = false

   if (import.meta.client) {
      if (to.path.startsWith(joinURL('/', 'https://'))) {
         if (from.path === to.path)
            return abortNavigation()
         else
            return await navigateTo(from.path)
      }

      nextTick(() => {
         // if (!to.path.startsWith('/admin')) {
         //    window.scrollTo({ top: 0, behavior: 'smooth' })
         // }
      })
   }
})