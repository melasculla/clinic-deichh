declare module 'h3' {
   interface H3EventContext {
      requestDTO: Record<any, any>
   }
}

export default defineEventHandler(async event => {
   event.context.requestDTO = {}
})