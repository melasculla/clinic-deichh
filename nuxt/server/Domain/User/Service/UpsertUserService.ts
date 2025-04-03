import UpsertUserServiceInterface from './UpsertUserServiceInterface'
import UserRepository from '~~/server/Infrastructure/User/Repository/UserRepository'
import UserRepositoryInterface from '~~/server/Infrastructure/User/Repository/UserRepositoryInterface'
import User from '../Entity/User'

export default class UpsertUserService implements UpsertUserServiceInterface {
   constructor(
      private repository: UserRepositoryInterface = new UserRepository()
   ) { }

   public async upsertUser(user: TNewUser) {
      return await this.repository.save(new User(user))
   }
}