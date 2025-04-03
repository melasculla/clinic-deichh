import { CatQueryFilterRequest } from '~~/server/Application/Cat/Request/CatFilterRequest'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import CatRepositoryInterface from '~~/server/Infrastructure/Cat/Repository/CatRepositoryInterface'

export default interface GetAllCatsServiceInterface {
   getAllCats(
      filters: CatQueryFilterRequest,
      pagination: PaginationRequest
   ): Promise<{
      cats: Awaited<ReturnType<CatRepositoryInterface['findAll']>>
      total: number
   }>
}