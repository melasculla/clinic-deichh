import SendBaseFormServiceInterface from './SendBaseFormServiceInterface'
import NodeTransporter from '~~/server/Infrastructure/Mail/Transporter/NodeTransporter'
import NodeTransporterInterface from '~~/server/Infrastructure/Mail/Transporter/NodeTransporterInterface'
import { BaseFormDTO } from '../DTO/BaseFormDTO'

export default class SendBaseFormService implements SendBaseFormServiceInterface {
   constructor(
      private mail: NodeTransporterInterface = new NodeTransporter()
   ) { }

   public async sendForm(form: BaseFormDTO) {
      await this.mail.send(form)
   }
}