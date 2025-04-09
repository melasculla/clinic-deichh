import UserRepositoryInterface from '~~/server/Infrastructure/User/Repository/UserRepositoryInterface'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import { SpecializationFilterRequestRequest } from '~~/server/Application/Specialization/Request/SpecializationFilterRequest'

export default interface GetAllDoctorsServiceInterface {
    getAllDoctors(
        pagination: PaginationRequest,
        filters?: SpecializationFilterRequestRequest,
    ): Promise<{
        doctors: Awaited<ReturnType<UserRepositoryInterface['findDoctors']>>
        total: number
    }>
}