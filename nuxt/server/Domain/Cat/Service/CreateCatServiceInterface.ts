import { CatPostRequest } from '~~/server/Application/Cat/Request/CatPostRequest'
import Cat from '../Entity/Cat'

export default interface CreateCatServiceInterface {
   createCat(cat: CatPostRequest): Promise<Cat>
}