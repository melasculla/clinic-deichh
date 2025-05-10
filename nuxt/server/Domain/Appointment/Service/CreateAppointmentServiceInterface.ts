import { AppointmentPostRequest } from '~~/server/Application/Appointment/Request/AppointmentPostRequest'
import Appointment from '../Entity/Appointment'

export default interface CreateAppointmentServiceInterface {
   createAppointment(
      appointment: AppointmentPostRequest,
      dateTime?: string
   ): Promise<Appointment>
}