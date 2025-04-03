import EditCatServiceInterface from './EditCatServiceInterface'
import CatRepository from '~~/server/Infrastructure/Cat/Repository/CatRepository'
import CatRepositoryInterface from '~~/server/Infrastructure/Cat/Repository/CatRepositoryInterface'
import { CatPatchRequest } from '~~/server/Application/Cat/Request/CatPatchRequest'
import Cat from '../Entity/Cat'

export default class EditCatService implements EditCatServiceInterface {
   constructor(
      private repository: CatRepositoryInterface = new CatRepository()
   ) { }

   public async editCat(cat: CatPatchRequest) {
      const result = await this.repository.save(new Cat(cat as any))
      return result
   }
}