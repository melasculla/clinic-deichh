import Account from '../Entity/Account'

export default interface UpsertAccountServiceInterface {
   upsertAccount(account: TNewAccount): Promise<Account>
}