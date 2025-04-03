import Account from '../Entity/Account'

export default interface GetAccountByServiceInterface {
   getAccountBy(
      by: 'id' | 'userId' | 'provider',
      column: number | { provider: string, providerAccountId: string }
   ): Promise<Account>
}