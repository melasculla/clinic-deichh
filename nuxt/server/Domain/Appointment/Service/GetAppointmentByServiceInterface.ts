import Appointment from '../Entity/Appointment'

export default interface GetAppointmentByServiceInterface {
   getAppointmentBy(by: 'id', column: number): Promise<Appointment>
}