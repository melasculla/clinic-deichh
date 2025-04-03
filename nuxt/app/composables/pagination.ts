export const usePagination = (
   _perPage: number,
   mode: 'state' | 'query' | 'page' = 'state',
   stateOrQueryName: string,
   urlBase?: (page?: number) => string
): { perPage: number, currentPage: Ref<number>, pages: Ref<number>, totaItems: Ref<number> } => {
   const route = useRoute()
   const perPage = _perPage
   const totaItems = useState<number>(`${stateOrQueryName}:total`, () => 0)

   const currentPage = computed<number>({
      get: () => {
         if (mode === 'state')
            return useState<number>(stateOrQueryName, () => 1).value

         if (mode === 'query')
            return route.query[stateOrQueryName] ? Number(route.query[stateOrQueryName]) : 1

         if (mode === 'page')
            return parseInt(route.path.split('/').pop() || '1') || 1

         return 1
      },
      set: async (page: number) => {
         if (mode === 'state')
            useState<number>(stateOrQueryName, () => 1).value = page

         if (mode === 'query')
            await navigateTo({
               query: {
                  ...route.query,
                  [stateOrQueryName]: page
               }
            })

         if (mode === 'page')
            urlBase ?
               await navigateTo(urlBase(page)) :
               alert('urlBase is not defined in usePagination()')
      }
   })

   const pages = computed<number>(() => Math.ceil(totaItems.value / perPage))

   return { perPage, currentPage, pages, totaItems }
}