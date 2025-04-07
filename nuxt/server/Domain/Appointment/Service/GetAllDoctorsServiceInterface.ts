import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import User from '~~/server/Domain/User/Entity/User'

export default interface GetAllDoctorsServiceInterface {
    getAllDoctors(
        pagination: PaginationRequest
    ): Promise<{
        doctors: User[]
        total: number
    }>
}