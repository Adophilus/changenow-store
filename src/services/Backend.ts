import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IListResult, ICategory, ISubCategory, IProduct } from '../types/Collections'

interface IProductQueryParams { page?: number, perPage?: number, filter?: string }

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: builder => ({
    getAllCategories: builder.query<ICategory[], null>({
      query () { return { url: 'categories' } },
      transformResponse (response: { message: ICategory[] }): ICategory[] {
        return response.message
      }
    }),
    getAllSubCategories: builder.query<ISubCategory[], null>({
      query () { return { url: 'sub-categories' } },
      transformResponse (response: { message: ISubCategory[] }): ISubCategory[] {
        return response.message
      }
    }),
    getProducts: builder.query<IListResult, IProductQueryParams>({
      query (params: IProductQueryParams) {
        const _query = new URLSearchParams(params)
        return {
          url: `products?${_query.toString()}`
        }
      },
      transformResponse (response: { message: IListResult }): IListResult {
        return response.message
      }
    })
  })
})

export const { useGetAllCategoriesQuery, useGetAllSubCategoriesQuery, useGetProductsQuery } = backendApi

export default backendApi
