import GetAllCatsServiceInterface from './GetAllCatsServiceInterface'
import CatRepository from '~~/server/Infrastructure/Cat/Repository/CatRepository'
import CatRepositoryInterface from '~~/server/Infrastructure/Cat/Repository/CatRepositoryInterface'
import { CatQueryFilterRequest } from '~~/server/Application/Cat/Request/CatFilterRequest'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'

export default class GetAllCatsService implements GetAllCatsServiceInterface {
   constructor(
      private repository: CatRepositoryInterface = new CatRepository()
   ) { }

   public async getAllCats(
      filters: CatQueryFilterRequest,
      pagination: PaginationRequest
   ) {
      const [cats, total] = await Promise.all([
         this.repository.findAll(filters, pagination),
         this.repository.count(filters)
      ])

      return { cats, total }
   }
}