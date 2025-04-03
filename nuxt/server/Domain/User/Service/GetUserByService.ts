import GetUserByServiceInterface from './GetUserByServiceInterface'
import UserRepository from '~~/server/Infrastructure/User/Repository/UserRepository'
import UserRepositoryInterface from '~~/server/Infrastructure/User/Repository/UserRepositoryInterface'

export default class GetUserByService implements GetUserByServiceInterface {
   constructor(
      private repository: UserRepositoryInterface = new UserRepository()
   ) { }

   public async getUserBy(
      by: 'email' | 'id',
      emailOrID: number | string
   ) {
      const user = await this.repository.findBy(by, emailOrID)
      if (!user)
         throw createError({ statusCode: 400, message: `User with "${by}" not found` })

      return user
   }
}