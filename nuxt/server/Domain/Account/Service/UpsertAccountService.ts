import UpsertAccountServiceInterface from './UpsertAccountServiceInterface'
import AccountRepository from '~~/server/Infrastructure/Account/Repository/AccountRepository'
import AccountRepositoryInterface from '~~/server/Infrastructure/Account/Repository/AccountRepositoryInterface'
import Account from '../Entity/Account'

export default class UpsertAccountService implements UpsertAccountServiceInterface {
   constructor(
      private repository: AccountRepositoryInterface = new AccountRepository()
   ) { }

   public async upsertAccount(account: TNewAccount) {
      return await this.repository.save(new Account(account))
   }
}