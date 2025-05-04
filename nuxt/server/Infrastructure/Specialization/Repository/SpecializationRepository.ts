import SpecializationRepositoryInterface from './SpecializationRepositoryInterface'

export default class SpecializationRepository implements SpecializationRepositoryInterface {
   public async findAll() {
      return await db.select().from(specializationsTable)
   }
}