import { and, count, desc, eq } from 'drizzle-orm'
import AccountRepositoryInterface from './AccountRepositoryInterface'
import Account from '~~/server/Domain/Account/Entity/Account'

export default class AccountRepository implements AccountRepositoryInterface {
   public async findAllForUser(id: number) {
      const result = await db.select().from(accountsTable)
         .where(eq(accountsTable.userId, id))
         .orderBy(desc(accountsTable.id))

      return result.map(item => new Account(item))
   }

   public async findBy(by: 'id' | 'userId' | 'provider', column: number | { provider: string, providerAccountId: string }) {
      const [account] = await db.select().from(accountsTable)
         .where(by === 'provider' && typeof column === 'object'
            ? and(
               eq(accountsTable.provider, column.provider),
               eq(accountsTable.providerAccountId, column.providerAccountId)
            )
            : eq(accountsTable[by], column as number))
      if (!account)
         return null

      return new Account(account)
   }

   public async countForUser(id: number) {
      const [total] = await db.select({ count: count() }).from(accountsTable).where(eq(accountsTable.id, id))
      return total.count
   }

   public async save(accountEntity: Account) {
      if (accountEntity.getId()) {
         // const [updated] = await db.update(accountsTable)
         // 	.set({})
         // 	.where(eq(accountsTable.id, accountEntity.id))
         // 	.returning()

         // accountEntity = Object.assign(updated)
      } else {
         const [inserted] = await db.insert(accountsTable).values({
            userId: accountEntity.getUserId(),
            provider: accountEntity.getProvider(),
            providerAccountId: accountEntity.getProviderAccountId(),
         }).returning()

         Object.assign(accountEntity, inserted)
      }

      return accountEntity
   }

   public async removeBy(by: 'id' | 'userId', id: number) {
      await db.delete(accountsTable).where(eq(accountsTable[by], id))
   }
}