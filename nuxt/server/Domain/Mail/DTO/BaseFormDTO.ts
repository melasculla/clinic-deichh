import { Mail } from '../Entity/Mail'
import { BaseFormRequest } from '~~/server/Application/Mail/Request/BaseFormRequest'

const config = useRuntimeConfig()

export class BaseFormDTO extends Mail {
   constructor(data: BaseFormRequest) {
      super(
         'BaseForm.html',
         data,
         'New Form from ' + config.public.baseUrl.replace('https://', '').replace('http://', ''),
         undefined,
         data.email
      )
   }
}