import Cat from '~~/server/Domain/Cat/Entity/Cat'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import { CatQueryFilterRequest } from '~~/server/Application/Cat/Request/CatFilterRequest'

export default interface CatRepositoryInterface {
   findAll(
      filters: CatQueryFilterRequest,
      pagination: PaginationRequest,
   ): Promise<Array<{
      id: TCat['id']
      gender: TCat['gender']
      name: TCat['name']
      slug: TCat['slug']
      thumbnail: TCat['thumbnail']
      gallery: TCat['gallery']
      color: TCat['color']

      status?: TCat['status']

      sire?: {
         id: TCat['id']
         name: TCat['name']
         slug: TCat['slug']
      } | null
      dam?: {
         id: TCat['id']
         name: TCat['name']
         slug: TCat['slug']
      } | null
   }>>

   findBy(by: 'id' | 'slug', column: number | string): Promise<Cat | null>

   count(filters: CatQueryFilterRequest): Promise<number>

   save(cat: Cat): Promise<Cat>

   removeBy(by: 'id', id: number): Promise<void>
}