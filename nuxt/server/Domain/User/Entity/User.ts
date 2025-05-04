export default class User {
   private email: TUser['email']
   private id: TUser['id'] | null
   private name: TUser['name']
   private roles: TUser['roles'] | null

   constructor(user: TNewUser) {
      this.id = user.id || null
      this.email = user.email
      this.name = user.name
      this.roles = user.roles || null
   }

   public getEmail() {
      return this.email
   }

   public getId() {
      return this.id
   }

   public getName() {
      return this.name
   }

   public getRoles() {
      return this.roles
   }

   public updateEmail(email: TUser['email']) {
      if (email)
         this.email = email

      return this
   }

   public updateName(name: TUser['name']) {
      if (name)
         this.name = name

      return this
   }

   public updateRoles(roles: TUser['roles']) {
      if (roles)
         this.roles = roles

      return this
   }
}