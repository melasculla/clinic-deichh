import { createTransport } from 'nodemailer'

const config = useRuntimeConfig()

export const useSMTPTransporter = createTransport({
   pool: true,
   host: config.notify.smtp.host,
   port: import.meta.dev ? 1025 : 465,
   secure: import.meta.dev ? false : true,
   auth: {
      user: config.notify.smtp.user,
      pass: config.notify.smtp.password,
   },
})