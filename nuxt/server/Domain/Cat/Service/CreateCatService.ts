import CreateCatServiceInterface from './CreateCatServiceInterface'
import CatRepository from '~~/server/Infrastructure/Cat/Repository/CatRepository'
import CatRepositoryInterface from '~~/server/Infrastructure/Cat/Repository/CatRepositoryInterface'
import { CatPostRequest } from '~~/server/Application/Cat/Request/CatPostRequest'
import Cat from '../Entity/Cat'

export default class CreateCatService implements CreateCatServiceInterface {
   constructor(
      private repository: CatRepositoryInterface = new CatRepository()
   ) { }

   public async createCat(cat: CatPostRequest) {
      const result = await this.repository.save(new Cat(cat as any))
      return result
   }
}