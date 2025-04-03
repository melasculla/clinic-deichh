import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin({
   parallel: true,
   setup: nuxtApp => {
      nuxtApp.vueApp.use(Vue3Toastify, {
         position: toast.POSITION.TOP_RIGHT,
         theme: 'colored',
         progressStyle: {
            background: 'linear-gradient(90deg, rgba(255,53,0,1) 0%, rgba(255,53,0,1) 25%, rgba(0,136,255,1) 100%)'
         },
         autoClose: 2000,
      } as ToastContainerOptions)

      return {
         provide: { toast }
      }
   }
})