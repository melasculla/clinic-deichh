export default interface DeleteCatServiceInterface {
   deleteCat(id: number): Promise<void>
}