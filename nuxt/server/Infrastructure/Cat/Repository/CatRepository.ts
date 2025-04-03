import CatRepositoryInterface from './CatRepositoryInterface'
import Cat from '~~/server/Domain/Cat/Entity/Cat'

import { PaginationRequest } from '~~/server/Shared/Request/PaginationRequest'
import { CatQueryFilterRequest } from '~~/server/Application/Cat/Request/CatFilterRequest'

import { and, asc, between, count, desc, eq, gte, isNotNull, lte, sql, aliasedTable, or, isNull, inArray } from 'drizzle-orm'
import { PgSelectQueryBuilderBase } from 'drizzle-orm/pg-core'

export default class CatRepository implements CatRepositoryInterface {
   public async findAll(
      filters: CatQueryFilterRequest,
      pagination: PaginationRequest,
   ) {
      const sire = aliasedTable(catsTable, 'sire')
      const dam = aliasedTable(catsTable, 'dam')

      const query = db
         .select({
            id: catsTable.id,
            gender: catsTable.gender,
            name: catsTable.name,
            slug: catsTable.slug,
            thumbnail: catsTable.thumbnail,
            gallery: catsTable.gallery,
            color: catsTable.color,

            sire: {
               id: sire.id,
               name: sire.name,
               slug: sire.slug,
            },
            dam: {
               id: dam.id,
               name: dam.name,
               slug: dam.slug,
            }
         })
         .from(catsTable)
         .leftJoin(sire, eq(sire.id, catsTable.sire))
         .leftJoin(dam, eq(dam.id, catsTable.dam))
         .limit(100)
         .orderBy(desc(catsTable.createdAt))
         .$dynamic()

      if (pagination.perPage && pagination.page)
         query
            .limit(pagination.perPage)
            .offset((pagination.page! - 1) * pagination.perPage)

      this.applyFilters(filters, query)

      return await query.execute()
   }

   public async findBy(by: 'id' | 'slug', column: number | string) {
      const sire = aliasedTable(catsTable, 'sire')
      const dam = aliasedTable(catsTable, 'dam')
      const children = aliasedTable(catsTable, 'children')

      const relatedCatColumns = (table: TCatColumns) => ({
         id: table.id,
         name: table.name,
         slug: table.slug,
         thumbnail: table.thumbnail,
         // price: table.price,
      })

      const rows = await db.select({
         ...catsTable as TCatColumns,
         sire: relatedCatColumns(sire),
         dam: relatedCatColumns(dam),
         children: relatedCatColumns(children),
      })
         .from(catsTable)
         .leftJoin(sire, eq(sire.id, catsTable.sire))
         .leftJoin(dam, eq(dam.id, catsTable.dam))
         .leftJoin(children, or(
            eq(children.sire, catsTable.id),
            eq(children.dam, catsTable.id)
         ))
         .where(eq(catsTable[by], column)) as Array<
            TCatColumns & {
               sire: ReturnType<typeof relatedCatColumns>
               dam: ReturnType<typeof relatedCatColumns>
               children: ReturnType<typeof relatedCatColumns>[]
            }
         >

      if (!rows[0])
         return null

      const childrenArray = rows.map(item => item.children).filter(item => item)

      const result = {
         ...rows[0],
         children: childrenArray?.length ? childrenArray : undefined
      }

      return new Cat(result as any)
   }

   public async count(filters: CatQueryFilterRequest) {
      const query = db
         .select({ count: count() })
         .from(catsTable)
         .$dynamic()

      this.applyFilters(filters, query)

      return (await query.execute())[0].count
   }

   public async save(cat: Cat) {
      const { id, children, ...data } = cat.toJSON()

      if (cat.getId()) {
         const [updated] = await db.update(catsTable).set(data).where(eq(catsTable.id, cat.getId()!)).returning()

         cat.fromDB(updated)
      } else {
         const [inserted] = await db.insert(catsTable).values(data).returning()

         cat.fromDB(inserted)
      }

      return cat
   }

   public async removeBy(by: 'id', id: number) {
      await db.delete(catsTable).where(eq(catsTable[by], id))
   }

   private applyFilters<T extends PgSelectQueryBuilderBase<any, any, any, any, any, any, any, any, any>>(
      filters: CatQueryFilterRequest,
      query: T
   ) {
      const proccessMaybeArray = (column: any, data?: null | number | number[]) => {
         if (data == null)
            return undefined

         if (Array.isArray(data) && data.length)
            return inArray(column, data)

         return eq(column, data)
      }

      // query
      //    .where(and(
      //       proccessMaybeArray(catsTable.gender, filters.gender),
      //       proccessMaybeArray(catsTable.status, filters.status),
      //       proccessMaybeArray(catsTable.color, filters.color),
      //    ))
   }
}