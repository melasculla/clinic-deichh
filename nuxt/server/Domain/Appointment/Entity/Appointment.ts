export default class Appointment {
   private id: TAppointment['id']
   private doctorId: TAppointment['doctorId']
   private userId: TAppointment['userId']
   private price: TAppointment['price']
   private date: TAppointment['date']
   private createdAt: TAppointment['createdAt']

   constructor(appointment: TAppointment) {
      this.id = appointment.id
      this.doctorId = appointment.doctorId
      this.userId = appointment.userId
      this.price = appointment.price
      this.date = new Date(appointment.date)
      this.createdAt = appointment.createdAt || new Date()
   }

   public getId() {
      return this.id
   }

   public getDoctorId() {
      return this.doctorId
   }

   public getUserId() {
      return this.userId
   }

   public getPrice() {
      return this.price
   }

   public getDate() {
      return this.date
   }

   public getCreatedAt() {
      return this.createdAt
   }

   // Update

   public updateId(id: TAppointment['id']) {
      this.id = id
      return this
   }

   public updateDoctorId(doctorId: TAppointment['doctorId']) {
      this.doctorId = doctorId
      return this
   }

   public updateUserId(userId: TAppointment['userId']) {
      this.userId = userId
      return this
   }

   public updatePrice(price: TAppointment['price']) {
      this.price = price
      return this
   }

   public updateDate(date: TAppointment['date']) {
      this.date = date
      return this
   }

   public updateCreatedAt(createdAt: TAppointment['createdAt']) {
      this.createdAt = createdAt
      return this
   }

   public toJSON() {
      return {
         id: this.id,
         doctorId: this.doctorId,
         userId: this.userId,
         price: this.price,
         date: this.date,
         createdAt: this.createdAt,
      }
   }

   public fromDB(appointment: TAppointment) {
      this.id = appointment.id
      this.doctorId = appointment.doctorId
      this.userId = appointment.userId
      this.price = appointment.price
      this.date = appointment.date
      this.createdAt = appointment.createdAt
   }
}