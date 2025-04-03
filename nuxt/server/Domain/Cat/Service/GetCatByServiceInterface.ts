import Cat from '../Entity/Cat'

export default interface GetCatByServiceInterface {
   getCatBy(by: 'id' | 'slug', column: number | string): Promise<Cat>
}