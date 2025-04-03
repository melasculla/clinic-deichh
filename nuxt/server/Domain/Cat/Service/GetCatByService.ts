import GetCatByServiceInterface from './GetCatByServiceInterface'
import CatRepository from '~~/server/Infrastructure/Cat/Repository/CatRepository'
import CatRepositoryInterface from '~~/server/Infrastructure/Cat/Repository/CatRepositoryInterface'

export default class GetCatByService implements GetCatByServiceInterface {
   constructor(
      private repository: CatRepositoryInterface = new CatRepository()
   ) { }

   public async getCatBy(by: 'id' | 'slug', column: number | string) {
      const result = await this.repository.findBy(by, column)
      if (!result)
         throw createError({ statusCode: 404, message: `Cat with "${column}" not found` })

      return result
   }
}