import NodeTransporterInterface from './NodeTransporterInterface'
import { Mail } from '~~/server/Domain/Mail/Entity/Mail'
import { type Transporter } from 'nodemailer'

const config = useRuntimeConfig()

export default class NodeTransporter implements NodeTransporterInterface {
   constructor(
      private transporter: Transporter = useSMTPTransporter,
      private mailAccount: string = config.notify.smtp.user,
      private from: string = `Clinic Deichh <${mailAccount}>`,
   ) { }

   public async send(letter: Mail) {
      await this.transporter.sendMail({
         from: this.from,
         to: letter.to,
         subject: letter.subject,
         text: letter.plainText,
         html: letter.html,
         replyTo: letter.replyTo || this.mailAccount,
      })
   }
}