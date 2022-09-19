import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICategory } from '../types/Collections'

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: builder => ({
    getAllCategories: builder.query<ICategory, null>({
      query: () => ({ url: 'categories' }),
      transformResponse (response: { message: ICategory[] }): ICategory[] {
        return response.message
      }
    })
  })
})

export const { useGetAllCategoriesQuery } = backendApi

export default backendApi
