import { BaseFormDTO } from '../DTO/BaseFormDTO'

export default interface SendBaseFormServiceInterface {
   sendForm(form: BaseFormDTO): Promise<void>
}