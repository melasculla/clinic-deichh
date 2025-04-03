import { CatPatchRequest } from '~~/server/Application/Cat/Request/CatPatchRequest'
import Cat from '../Entity/Cat'

export default interface EditCatServiceInterface {
   editCat(cat: CatPatchRequest): Promise<Cat>
}