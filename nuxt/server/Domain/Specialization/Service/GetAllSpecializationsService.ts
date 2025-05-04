import GetAllSpecializationsServiceInterface from './GetAllSpecializationsServiceInterface'
import SpecializtionRepository from '~~/server/Infrastructure/Specialization/Repository/SpecializationRepository'
import SpecializtionRepositoryInterface from '~~/server/Infrastructure/Specialization/Repository/SpecializationRepositoryInterface'

export default class GetAllSpecializationsService implements GetAllSpecializationsServiceInterface {
   constructor(
      private repository: SpecializtionRepositoryInterface = new SpecializtionRepository()
   ) { }

   public async getAllSpecializations() {
      return await this.repository.findAll()
   }
}