import JsonResponse from '~~/server/Shared/Application/JsonResponse'
import GetAllAppointmentsService from '~~/server/Domain/Appointment/Service/GetAllAppointmentsService'
import { z } from 'h3-zod'
import { AppointmentQueryFilterRequest } from '~~/server/Application/Appointment/Request/AppointmentFilterRequest'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'

// Функция для безопасного создания пагинации
const createSafePagination = (query: any): { page: number; perPage: number } => {
  const DEFAULT_PAGE = 1
  const DEFAULT_PER_PAGE = 10
  const MAX_PER_PAGE = 100

  return {
    page: Math.max(DEFAULT_PAGE, Number(query?.page) || DEFAULT_PAGE),
    perPage: Math.min(
      MAX_PER_PAGE,
      Math.max(1, Number(query?.perPage) || DEFAULT_PER_PAGE)
    )
  }
}

export default defineEventHandler({
  onRequest: [
    async event => await validateParams(event, z.object({ 
      id: z.preprocess(zodPreprocessToNumber, z.number()) 
    }))
  ],
  handler: async event => {
    try {
      const doctorId = event.context.requestDTO.params.id
      const query = getQuery(event)
      
      // Подготовка фильтров
      const filters: AppointmentQueryFilterRequest = {
        orderBy: query.orderBy ? safeJsonParse(query.orderBy as string) : undefined
      }

      // Дополнительные фильтры
      const doctorFilter = {
        doctorId,
        ...(query.dateFrom && { dateFrom: String(query.dateFrom) }),
        ...(query.dateTo && { dateTo: String(query.dateTo) }),
        ...(query.status && { status: String(query.status) })
      }

      // Гарантированно безопасная пагинация
      const pagination = createSafePagination(query)

      const service = new GetAllAppointmentsService()
      const { appointments, total } = await service.getAllAppointments(
        filters, 
        pagination,
        doctorFilter
      )

      // Расчет страниц с защитой от деления на 0
      const totalPages = pagination.perPage > 0 
        ? Math.ceil(total / pagination.perPage) 
        : 0

      return new JsonResponse({
        data: appointments,
        meta: {
          total,
          currentPage: pagination.page,
          perPage: pagination.perPage,
          totalPages,
          hasNextPage: pagination.page < totalPages,
          hasPrevPage: pagination.page > 1
        }
      })
    } catch (err: any) {
      throw createError({ 
        statusCode: err.statusCode || 500, 
        message: err.message || 'Ошибка при получении записей врача',
        data: err.data || null
      })
    }
  }
})

// Вспомогательная функция для безопасного парсинга JSON
function safeJsonParse(str: string) {
  try {
    return JSON.parse(str)
  } catch {
    return undefined
  }
}