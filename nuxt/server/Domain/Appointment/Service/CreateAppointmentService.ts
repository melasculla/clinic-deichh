import CreateAppointmentServiceInterface from './CreateAppointmentServiceInterface'
import AppointmentRepository from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepository'
import AppointmentRepositoryInterface from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepositoryInterface'
import { AppointmentPostRequest } from '~~/server/Application/Appointment/Request/AppointmentPostRequest'
import Appointment from '../Entity/Appointment'

export default class CreateAppointmentService implements CreateAppointmentServiceInterface {
   constructor(
      private repository: AppointmentRepositoryInterface = new AppointmentRepository()
   ) { }

   public async createAppointment(appointment: AppointmentPostRequest) {
      const result = await this.repository.save(new Appointment(appointment as any))
      return result
   }
}