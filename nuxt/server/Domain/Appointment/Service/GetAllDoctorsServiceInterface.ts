import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'

export default interface GetAllDoctorsServiceInterface {
    getAllDoctors(
        pagination: PaginationRequest
    ): Promise<{
        doctors: TUser[]
        total: number
    }>
}