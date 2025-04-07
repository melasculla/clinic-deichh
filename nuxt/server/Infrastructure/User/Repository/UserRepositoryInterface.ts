import User from '~~/server/Domain/User/Entity/User'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'

export default interface UserRepositoryInterface {
   findAll(
      pagination: PaginationRequest,
      searchString?: string
   ): Promise<TUser[]>

   findBy(by: 'email' | 'id', emailOrID: number | string): Promise<User | null>

   count(searchParam?: string): Promise<number>

   save(userEntity: User): Promise<User>

   removeBy(by: 'id', id: number): Promise<void>

   findDoctors(
      pagination: PaginationRequest,
      searchString?: string
   ): Promise<TUser[]>

   countDoctors(searchParam?: string): Promise<number>
}