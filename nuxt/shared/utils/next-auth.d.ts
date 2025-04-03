import 'next-auth'

declare module 'next-auth' {
   interface Profile {
      picture: string
   }

   interface Session {
      roles: TUser['roles'],
      uid: number
   }
}

declare module 'next-auth/jwt' {
   interface DefaultJWT {
      roles: TUser['roles']
      uid: number
   }
}