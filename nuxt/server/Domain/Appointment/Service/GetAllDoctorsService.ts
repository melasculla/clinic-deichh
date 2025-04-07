import GetAllDoctorsServiceInterface from './GetAllDoctorsServiceInterface'
import UserRepository from '~~/server/Infrastructure/User/Repository/UserRepository'
import UserRepositoryInterface from '~~/server/Infrastructure/User/Repository/UserRepositoryInterface'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'

export default class GetAllDoctorsService implements GetAllDoctorsServiceInterface {
   constructor(
      private repository: UserRepositoryInterface = new UserRepository()
   ) { }

   public async getAllDoctors(
      pagination: PaginationRequest
   ) {
      const [doctors, count] = await Promise.all([
         this.repository.findDoctors(pagination),
         this.repository.countDoctors()
      ])

      return {
         doctors,
         total: count
      }
   }
}