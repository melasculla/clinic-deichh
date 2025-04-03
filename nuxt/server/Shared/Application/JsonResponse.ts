export default class JsonResponse<T> {
   constructor(
      public data: T,
      public status: number = 200,
      public total?: number,
      public message?: string
   ) { }
}