export default class Account {
   private id: TAccount['id'] | null
   private provider: TAccount['provider']
   private providerAccountId: TAccount['providerAccountId']
   private userId: TAccount['userId']
   constructor(account: TNewAccount) {
      this.id = account.id || null
      this.userId = account.userId
      this.provider = account.provider
      this.providerAccountId = account.providerAccountId
   }

   public getId() {
      return this.id
   }

   public getProvider() {
      return this.provider
   }

   public getProviderAccountId() {
      return this.providerAccountId
   }

   public getUserId() {
      return this.userId
   }

   public updateProvider(provider: TAccount['provider']) {
      if (provider)
         this.provider = provider

      return this
   }

   public updateProviderAccountId(providerAccountId: TAccount['providerAccountId']) {
      if (providerAccountId)
         this.providerAccountId = providerAccountId

      return this
   }

   public updateUserId(userId: TAccount['userId']) {
      if (userId)
         this.userId = userId

      return this
   }
}