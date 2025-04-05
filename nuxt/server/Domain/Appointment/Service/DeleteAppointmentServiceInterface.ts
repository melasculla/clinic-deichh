export default interface DeleteAppointmentServiceInterface {
   deleteAppointment(id: number): Promise<void>
}