import Account from '~~/server/Domain/Account/Entity/Account'

export default interface AccountRepositoryInterface {
   findAllForUser(id: number): Promise<Account[]>

   findBy(by: 'id' | 'userId' | 'provider', column: number | { provider: string, providerAccountId: string }): Promise<Account | null>

   countForUser(id: number): Promise<number>

   save(accountEntity: Account): Promise<Account>

   removeBy(by: 'id' | 'userId', id: number): Promise<void>
}