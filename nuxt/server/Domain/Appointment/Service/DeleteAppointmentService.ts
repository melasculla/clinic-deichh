import DeleteAppointmentServiceInterface from './DeleteAppointmentServiceInterface'
import AppointmentRepository from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepository'
import AppointmentRepositoryInterface from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepositoryInterface'

export default class DeleteAppointmentService implements DeleteAppointmentServiceInterface {
   constructor(
      private repository: AppointmentRepositoryInterface = new AppointmentRepository()
   ) { }

   public async deleteAppointment(id: number) {
      await this.repository.removeBy('id', id)
   }
}