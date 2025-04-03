import GetAccountByServiceInterface from './GetAccountByServiceInterface'
import AccountRepository from '~~/server/Infrastructure/Account/Repository/AccountRepository'
import AccountRepositoryInterface from '~~/server/Infrastructure/Account/Repository/AccountRepositoryInterface'

export default class GetAccountByService implements GetAccountByServiceInterface {
   constructor(
      private repository: AccountRepositoryInterface = new AccountRepository()
   ) { }

   public async getAccountBy(
      by: 'id' | 'userId' | 'provider',
      column: number | { provider: string; providerAccountId: string; }
   ) {
      const account = await this.repository.findBy(by, column)
      if (!account)
         throw createError({ statusCode: 404, message: 'Account not found' })

      return account
   }
}