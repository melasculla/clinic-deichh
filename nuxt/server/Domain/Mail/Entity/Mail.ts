import handlebars from 'handlebars'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

handlebars.registerHelper('stripHTML', (html: string) => {
   html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')

   return html.replace(/<\/?[^>]+(>|$)/g, '')
})

export abstract class Mail {
   private htmlTemplate: string
   public html: string
   public plainText: string
   /**
    * @param to @default - 'mail@example.com'
    * @param subject string
    * @param data object with data to insert in html template
    * @param replyTo if specifed Reply-To assigned @default - 'mail@example.com'
   */
   constructor(
      htmlFilePath: string,
      private data: Record<any, any>,
      public subject: string,
      public to: string = 'mail@example.com',
      public replyTo?: string | null
   ) {
      this.htmlTemplate = this.loadTemplate(htmlFilePath)
      this.html = this.compileHTML(this.htmlTemplate)
      this.plainText = this.generatePlainText(this.html)
   }

   private compileHTML(template: string): string {
      return handlebars.compile(template)(this.data)
   }

   private generatePlainText(html: string): string {
      return handlebars.compile(`{{stripHTML html}}`)({ html })
   }

   private loadTemplate(filePath: string): string {
      return readFileSync(path.resolve(
         fileURLToPath(
            new URL(`/app/server/assets/templates/${filePath}`, import.meta.url)
         )
      ), 'utf-8')
   }
}