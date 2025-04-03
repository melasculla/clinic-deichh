import type { ToastType } from 'vue3-toastify'

export const useToastTemplate = (toast: ReturnType<typeof useVueToast>, instance: string, keyword: 'save' | 'delete' | 'upload' | 'send' = 'save', loading?: Ref<boolean>) => {
   const id = ref<number | string>('')

   const messages: Record<typeof keyword, Record<ToastType, string>> = {
      save: {
         loading: `Saving ${instance}...`,
         error: `${instance} wasn\`t saved`,
         success: `${instance} saved`,
         default: 'message not adjusted',
         info: `${instance} saved`,
         warning: 'message not adjusted'
      }, // TODO adjust messages
      delete: {
         loading: `Deleting ${instance}...`,
         error: `${instance} wasn\`t deleted`,
         success: `${instance} deleted`,
         default: 'message not adjusted',
         info: `${instance} deleted`,
         warning: 'message not adjusted'
      },
      upload: {
         loading: `Uploading ${instance}...`,
         error: `${instance} wasn\`t uploaded`,
         success: `${instance} uploaded`,
         default: 'message not adjusted',
         info: `${instance} uploaded`,
         warning: 'message not adjusted'
      },
      send: {
         loading: `Sending ${instance}...`,
         error: `${instance} wasn\`t sent`,
         success: `${instance} sent`,
         default: 'message not adjusted',
         info: `${instance} sent`,
         warning: 'message not adjusted'
      },
   }

   const create = () => {
      if (loading)
         loading.value = true

      id.value = toast.loading(messages[keyword].loading)
   }

   /**
    * @default type = 'success'
   */
   const update = (type: ToastType = 'success', err?: any, message?: string) => {
      const zodField = (err?.data?.data?.issues && err?.data?.data?.issues[0]?.path) ? `(${err?.data?.data?.issues[0]?.path[0]}) ` : ''

      nextTick(() => {
         if (loading)
            loading.value = false

         toast.update(id.value, {
            render: ((): string => {
               if (err)
                  return zodField + (err?.data?.message || messages[keyword].error)

               if (message)
                  return message

               return messages[keyword][type]
            })(),
            type: type,
            autoClose: true,
            closeOnClick: true,
            isLoading: false
         })
      })
   }

   return { id, create, update }
}