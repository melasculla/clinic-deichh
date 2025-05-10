export default class Appointment {
   private createdAt: TAppointment['createdAt']
   private date: TAppointment['date']
   private doctorId: TAppointment['doctorId']
   private id: TAppointment['id']
   private price: TAppointment['price']
   private userId: TAppointment['userId']
   constructor(appointment: TAppointment) {
      this.id = appointment.id
      this.doctorId = appointment.doctorId
      this.userId = appointment.userId
      this.price = appointment.price
      this.date = new Date(appointment.date)
      this.createdAt = appointment.createdAt || new Date()
   }

   public fromDB(appointment: TAppointment) {
      this.id = appointment.id
      this.doctorId = appointment.doctorId
      this.userId = appointment.userId
      this.price = appointment.price
      this.date = appointment.date
      this.createdAt = appointment.createdAt
   }

   public getCreatedAt() {
      return this.createdAt
   }

   public getDate() {
      return this.date
   }
   
   public setDate(date: Date): void {
      this.date = date;
  }

   public getDoctorId() {
      return this.doctorId
   }

   public getId() {
      return this.id
   }

   public getPrice() {
      return this.price
   }

   public getUserId() {
      return this.userId
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

   public updateCreatedAt(createdAt: TAppointment['createdAt']) {
      this.createdAt = createdAt
      return this
   }

   public updateDate(date: TAppointment['date']) {
      this.date = date
      return this
   }

   public updateDoctorId(doctorId: TAppointment['doctorId']) {
      this.doctorId = doctorId
      return this
   }

// Update

   public updateId(id: TAppointment['id']) {
      this.id = id
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
}