import { AppointmentPatchRequest } from '~~/server/Application/Appointment/Request/AppointmentPatchRequest'
import Appointment from '../Entity/Appointment'

export default interface EdiTAppointmentServiceInterface {
   ediTAppointment(appointment: AppointmentPatchRequest): Promise<Appointment>
}