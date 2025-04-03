import { type LocationQueryValue } from '#vue-router'

export const deepClone = (data: any) => {
   try {
      return JSON.parse(JSON.stringify(data))
   } catch (err: any) {
      return data
   }
}

export const parseParam = (param?: string | string[]) => {
   if (!param || !param?.length)
      return ''

   let output: string

   if (Array.isArray(param))
      output = param[0]!
   else
      output = param

   return output
}

export const convertQueryToStringArray = (param?: LocationQueryValue | LocationQueryValue[]): string[] => {
   if (param == null)
      return []

   if (Array.isArray(param))
      return param.filter(item => item != null)

   return param.split(',')
}