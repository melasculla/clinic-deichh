import UserRepositoryInterface from './UserRepositoryInterface'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import User from '~~/server/Domain/User/Entity/User'
import { and, count, desc, eq, ilike, notInArray, or } from 'drizzle-orm'

export default class UserRepository implements UserRepositoryInterface {
   public async findAll(
      pagination: PaginationRequest,
      searchString?: string
   ) {
      const isPaginationSetted = pagination.page && pagination.perPage
      const offset = isPaginationSetted && (pagination.page! - 1) * pagination.perPage!

      const query = db
         .select({
            id: usersTable.id,
            name: usersTable.name,
            email: usersTable.email,
         })
         .from(usersTable)
         .where(
            and(
               searchString ? or(
                  ilike(usersTable.name, `%${searchString}%`),
                  ilike(usersTable.email, `%${searchString}%`),
               ) : undefined,
               notInArray(usersTable.roles, ['admin'] as keyof TUser['roles'])
            )
         )
         .groupBy(usersTable.id)
         .orderBy(desc(usersTable.id))
         .$dynamic()

      if (offset && pagination.perPage) {
         query.offset(offset).limit(pagination.perPage)
      }

      return await query.execute() as any
   }

   public async findBy(by: 'email' | 'id', emailOrID: number | string) {
      const [user] = await db.select().from(usersTable).where(eq(usersTable[by], emailOrID))
      if (!user)
         return null

      return new User(user)
   }

   public async count(searchParam?: string) {
      const [total] = await db.select({ count: count() }).from(usersTable).where(
         and(
            searchParam ? or(
               ilike(usersTable.name, `%${searchParam}%`),
               ilike(usersTable.email, `%${searchParam}%`),
            ) : undefined,
            notInArray(usersTable.roles, ['admin'] as keyof TUser['roles'])
         ),
      )

      return total.count
   }

   public async save(userEntity: User) {
      if (userEntity.getId()) {
         const [updated] = await db.update(usersTable)
            .set({
               roles: userEntity.getRoles(),
            })
            .where(eq(usersTable.id, userEntity.getId()!)).returning();

         Object.assign(userEntity, updated)
      } else {
         const [inserted] = await db.insert(usersTable).values({
            name: userEntity.getName(),
            email: userEntity.getEmail(),
            roles: userEntity.getRoles(),
         }).returning()

         Object.assign(userEntity, inserted)
      }

      return userEntity
   }

   public async removeBy(by: 'id', id: number) {
      await db.delete(usersTable).where(eq(usersTable[by], id))
   }

   public async findDoctors(
      pagination: PaginationRequest,
      searchString?: string
   ): Promise<TUser[]> {
      const isPaginationSetted = pagination.page && pagination.perPage
      const offset = isPaginationSetted && (pagination.page! - 1) * pagination.perPage!

      const query = db
         .select()
         .from(usersTable)
         .where(
            and(
               eq(usersTable.roles, ['doctor']),
               searchString ? or(
                  ilike(usersTable.name, `%${searchString}%`),
                  ilike(usersTable.email, `%${searchString}%`),
               ) : undefined
            )
         )
         .orderBy(desc(usersTable.id))
         .$dynamic()

      if (offset && pagination.perPage) {
         query.offset(offset).limit(pagination.perPage)
      }

      return await query.execute()
   }

   public async countDoctors(searchParam?: string): Promise<number> {
      const [total] = await db
         .select({ count: count() })
         .from(usersTable)
         .where(
            and(
               eq(usersTable.roles, ['doctor']),
               searchParam ? or(
                  ilike(usersTable.name, `%${searchParam}%`),
                  ilike(usersTable.email, `%${searchParam}%`),
               ) : undefined
            )
         )

      return total.count
   }
}