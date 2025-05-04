export default class Specialization {
   private id: TSpecialization['id'] | null
   private name: TSpecialization['name']

   constructor(specialization: TSpecialization) {
      this.id = specialization.id || null
      this.name = specialization.name
   }

   public getId() {
      return this.id
   }

   public getName() {
      return this.name
   }

   public updateName(name: TSpecialization['name']) {
      if (name)
         this.name = name

      return this
   }
}