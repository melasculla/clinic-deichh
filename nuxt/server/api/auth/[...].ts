import GetUserByService from '~~/server/Domain/User/Service/GetUserByService'
import UpsertUserService from '~~/server/Domain/User/Service/UpsertUserService'

import GetAccountByService from '~~/server/Domain/Account/Service/GetAccountByService'
import UpsertAccountService from '~~/server/Domain/Account/Service/UpsertAccountService'

import Google from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'

const config = useRuntimeConfig()
const admins = config.adminEmails.split(', ')

export default NuxtAuthHandler({
   secret: config.auth.secret,
   theme: {
      brandColor: '#0080FF',
      // logo: '/logo.webp'
   },
   providers: [
      // @ts-expect-error Use .default here for it to work during SSR.
      Google.default({
         clientId: config.auth.providers.google.client,
         clientSecret: config.auth.providers.google.secret
      })
   ],
   session: {
      maxAge: 60 * 60 * 24 * 7, // 7 days
   },
   callbacks: {
      signIn: async ({ user, profile, account }) => {
         if (!profile || !(user.email || profile.email) || !account)
            return false

         const email = user.email || profile.email!

         try {
            let existingUser = await new GetUserByService().getUserBy('email', email).catch(() => { })

            if (!existingUser)
               existingUser = await new UpsertUserService().upsertUser({
                  name: user.name || profile.name || '',
                  email,
                  roles: admins.includes(email) ? ['admin'] : ['user'],
               })

            const existingAccount = await new GetAccountByService().getAccountBy(
               'provider',
               { provider: account.provider, providerAccountId: account.providerAccountId }
            ).catch(() => { })
            if (!existingAccount) {
               await new UpsertAccountService().upsertAccount({
                  userId: existingUser.getId()!,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
               })
            }

            return true
         } catch (err) {
            console.error(err)
            return false
         }
      },
      jwt: async ({ token, account, user }) => {
         let refreshRoles: boolean = false
         if (token.lastRefreshedAt) {
            const lastFetchDate = new Date(token.lastRefreshedAt as string)
            const diffInMs = new Date().getTime() - lastFetchDate.getTime()
            const diffInMinutes = diffInMs / (1000 * 60) //  * 60 hours
            if (diffInMinutes >= 5)
               refreshRoles = true
         } else {
            token.lastRefreshedAt = new Date()
         }

         const service = new GetUserByService()

         if (account && user) {
            const currentUser = await service.getUserBy('email', user.email || token.email!)
            token.uid = currentUser.getId()!
         }

         if (refreshRoles || token.uid && !token.roles) {
            const user = await service.getUserBy('id', token.uid)
            token.roles = user.getRoles()
         }

         return token
      },
      session: async ({ session, token }) => {
         session.roles = token.roles || ['user']
         if (!session.uid)
            session.uid = token.uid

         return session
      }
   }
})