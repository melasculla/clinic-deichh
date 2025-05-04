import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import { PaginationSchema } from '~~/server/Shared/Request/PaginationRequest'
import { SpecializationFilterRequestSchema } from '~~/server/Application/Specialization/Request/SpecializationFilterRequest'
import { validateQuery } from '~~/server/utils/validation'
import GetAllDoctorsService from '~~/server/Domain/User/Service/GetAllDoctorsService'

export default defineEventHandler({
  onRequest: [
    async event => await validateQuery(event, PaginationSchema, 'pagination'),
    async event => {
      const query = getQuery(event)
      // Преобразуем строку симптомов в массив чисел
      const symptomIds = query.symptoms 
        ? String(query.symptoms).split(',').map(Number)
        : []
      
      // Добавляем symptomIds в query для валидации
      event.context.query = {
        ...query,
        symptomIds
      }
      
      await validateQuery(event, SpecializationFilterRequestSchema, 'filters')
    }
  ],
  handler: async event => {
    try {
      const result = await new GetAllDoctorsService().getAllDoctors(
        event.context.requestDTO.pagination,
        {
          ...event.context.requestDTO.filters,
          symptomIds: event.context.query.symptomIds || []
        }
      )

      return new JsonResponse(result.doctors, undefined, result.total)
    } catch (err: any) {
      throw createError({ statusCode: err.statusCode || err.code, message: err.message })
    }
  }
})