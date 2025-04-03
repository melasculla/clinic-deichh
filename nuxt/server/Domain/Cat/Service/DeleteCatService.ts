import DeleteCatServiceInterface from './DeleteCatServiceInterface'
import CatRepository from '~~/server/Infrastructure/Cat/Repository/CatRepository'
import CatRepositoryInterface from '~~/server/Infrastructure/Cat/Repository/CatRepositoryInterface'

export default class DeleteCatService implements DeleteCatServiceInterface {
   constructor(
      private repository: CatRepositoryInterface = new CatRepository()
   ) { }

   public async deleteCat(id: number) {
      await this.repository.removeBy('id', id)
   }
}