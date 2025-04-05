import GetAppointmentByServiceInterface from './GetAppointmentByServiceInterface'
import AppointmentRepository from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepository'
import AppointmentRepositoryInterface from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepositoryInterface'

export default class GetAppointmentByService implements GetAppointmentByServiceInterface {
   constructor(
      private repository: AppointmentRepositoryInterface = new AppointmentRepository()
   ) { }

   public async getAppointmentBy(by: 'id', column: number) {
      const result = await this.repository.findBy(by, column)
      if (!result)
         throw createError({ statusCode: 404, message: `Appointment with "${column}" not found` })

      return result
   }
}