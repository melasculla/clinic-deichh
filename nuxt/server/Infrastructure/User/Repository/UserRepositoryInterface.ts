import User from '~~/server/Domain/User/Entity/User'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import { SpecializationFilterRequestRequest } from '~~/server/Application/Specialization/Request/SpecializationFilterRequest'

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
      filters?: SpecializationFilterRequestRequest,
      searchString?: string
   ): Promise<Array<{
      id: TUser['id']
      name: TUser['name']
      email: TUser['email']
      specializations: TSpecialization['name'][]
   }>>

   countDoctors(searchParam?: string): Promise<number>
}