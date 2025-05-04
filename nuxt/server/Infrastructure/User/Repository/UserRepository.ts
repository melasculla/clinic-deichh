import UserRepositoryInterface from './UserRepositoryInterface'
import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import { SpecializationFilterRequestRequest } from '~~/server/Application/Specialization/Request/SpecializationFilterRequest'
import User from '~~/server/Domain/User/Entity/User'
import { and, count, desc, eq, like, inArray, notInArray, or } from 'drizzle-orm'


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
                  like(usersTable.name, `%${searchString}%`),
                  like(usersTable.email, `%${searchString}%`),
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

   public async count(searchParam?: string) {
      const [total] = await db.select({ count: count() }).from(usersTable).where(
         and(
            searchParam ? or(
               like(usersTable.name, `%${searchParam}%`),
               like(usersTable.email, `%${searchParam}%`),
            ) : undefined,
            notInArray(usersTable.roles, ['admin'] as keyof TUser['roles'])
         ),
      )

      return total.count
   }

   public async findBy(by: 'email' | 'id', emailOrID: number | string) {
      const [user] = await db.select().from(usersTable).where(eq(usersTable[by], emailOrID))
      if (!user)
         return null

      return new User(user)
   }

   public async findDoctors(
      pagination: PaginationRequest,
      filters?: SpecializationFilterRequestRequest,
      searchString?: string
   ) {
      const query = db
         .select({
            id: usersTable.id,
            name: usersTable.name,
            email: usersTable.email,
            specializations: specializationsTable.name,
         })
         .from(usersTable)
         .where(and(
            eq(usersTable.roles, ['doctor']),
            // filters?.specializations ? inArray(specializationsTable.name, filters?.specializations) : undefined,
            searchString ? or(
               like(usersTable.name, `%${searchString}%`),
               like(usersTable.email, `%${searchString}%`),
            ) : undefined
         ))
         .innerJoin(doctorSpecializationsTable, eq(doctorSpecializationsTable.doctorId, usersTable.id))
         .innerJoin(specializationsTable, eq(specializationsTable.id, doctorSpecializationsTable.specializationId))
         .orderBy(desc(usersTable.id))

      if (pagination && pagination.page && pagination.perPage)
         query
            .offset((pagination.page - 1) * pagination.perPage)
            .limit(pagination.perPage)

      const rows = await query.execute()

      const result = rows.reduce((total, item) => {
         if (total[item.id])
            total[item.id].specializations.push(item.specializations)
         else
            total[item.id] = { ...item, specializations: [item.specializations] }

         return total
      }, {} as Record<number, Omit<TUser, 'roles'> & { specializations: TSpecialization['name'][] }>)

      // костыль
      return filters?.specializations
         ? Object.values(result).filter(item => item.specializations.some(child => filters.specializations!.includes(child.toLowerCase())))
         : Object.values(result)
   }

   public async countDoctors(searchParam?: string) {
      const [total] = await db
         .select({ count: count() })
         .from(usersTable)
         .where(
            and(
               eq(usersTable.roles, ['doctor']),
               searchParam ? or(
                  like(usersTable.name, `%${searchParam}%`),
                  like(usersTable.email, `%${searchParam}%`),
               ) : undefined
            )
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
}