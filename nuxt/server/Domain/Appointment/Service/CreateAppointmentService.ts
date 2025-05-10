import CreateAppointmentServiceInterface from './CreateAppointmentServiceInterface'
import AppointmentRepository from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepository'
import AppointmentRepositoryInterface from '~~/server/Infrastructure/Appointment/Repository/AppointmentRepositoryInterface'
import { AppointmentPostRequest } from '~~/server/Application/Appointment/Request/AppointmentPostRequest'
import Appointment from '../Entity/Appointment'

export default class CreateAppointmentService implements CreateAppointmentServiceInterface {
   constructor(
      private repository: AppointmentRepositoryInterface = new AppointmentRepository()
   ) { }

   public async createAppointment(
      appointment: AppointmentPostRequest,
      dateTime?: string
   ) {
      const newAppointment = new Appointment(appointment as any)
      
      if (dateTime) {
         return this.repository.createWithDateTime(newAppointment, dateTime)
      }
      
      return this.repository.save(newAppointment)
   }
}