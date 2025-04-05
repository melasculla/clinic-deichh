import EditAppointmentServiceInterface from './EditAppointmentServiceInterface'
import AppointmentRepository from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepository'
import AppointmentRepositoryInterface from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepositoryInterface'
import { AppointmentPatchRequest } from '~~/server/Application/Appointment/Request/AppointmentPatchRequest'
import Appointment from '../Entity/Appointment'

export default class EditAppointmentService implements EditAppointmentServiceInterface {
   constructor(
      private repository: AppointmentRepositoryInterface = new AppointmentRepository()
   ) { }

   public async ediTAppointment(appointment: AppointmentPatchRequest) {
      const result = await this.repository.save(new Appointment(appointment as any))
      return result
   }
}