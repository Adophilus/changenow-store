import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  IListResult,
  ICategory,
  ISubCategory,
  IProduct
} from '../types/Collections'

interface IPocketBaseRecordQueryParams {
  page?: number
  perPage?: number
  filter?: string
  sort?: string
}

type IProductsQueryParams = IPocketBaseRecordQueryParams
type IBannersQueryParams = IPocketBaseRecordQueryParams

interface IProductQueryParams {
  id?: string
  sku?: number
}

const baseUrl = `${import.meta.env.BASE_URL}api/` 

const prepareQuery = (
  params: IPocketBaseRecordQueryParams
): URLSearchParams => {
  const _query = new URLSearchParams()
  if (params.page != null) {
    _query.append('page', params.page.toString())
  }
  if (params.perPage != null) {
    _query.append('perPage', params.perPage.toString())
  }
  if (params.filter != null) {
    _query.append('filter', params.filter)
  }
  if (params.sort != null) {
    _query.append('sort', params.sort)
  }
  return _query
}

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategory[], null>({
      query() {
        return { url: 'categories' }
      },
      transformResponse(response: { message: ICategory[] }): ICategory[] {
        return response.message
      }
    }),
    getAllSubCategories: builder.query<ISubCategory[], null>({
      query() {
        return { url: 'sub-categories' }
      },
      transformResponse(response: { message: ISubCategory[] }): ISubCategory[] {
        return response.message
      }
    }),
    getProduct: builder.query<IProduct, IProductQueryParams>({
      query(params: IProductQueryParams) {
        const _query = new URLSearchParams()
        _query.append('type', 'id')
        let id: string // could be an id or sku
        if (params.id != null) {
          id = params.id
        } else if (params.sku != null) {
          id = params.sku.toString()
          _query.set('type', 'sku')
        }
        else {
          id = ''
        }
        return {
          url: `products/${id}?${_query.toString()}`
        }
      },
      transformResponse(response: { message: IProduct }): IProduct {
        return response.message
      }
    }),
    getBanners: builder.query<IListResult, IBannersQueryParams>({
      query(params: IBannersQueryParams) {
        const _query = prepareQuery(params)
        return {
          url: `banners?${_query.toString()}`
        }
      },
      transformResponse(response: { message: IListResult }): IListResult {
        return response.message
      }
    }),
    getProducts: builder.query<IListResult, IProductsQueryParams>({
      query(params: IProductsQueryParams) {
        const _query = prepareQuery(params)
        return {
          url: `products?${_query.toString()}`
        }
      },
      transformResponse(response: { message: IListResult }): IListResult {
        return response.message
      }
    }),
    getProductsByIds: builder.query<IProduct[], string[]>({
      query(params: string[]) {
        console.log(params)
        const _query = new URLSearchParams()
        _query.set('ids', params.join(','))
        return {
          url: `products/ids?${_query.toString()}`
        }
      },
      transformResponse(response: { message: IProduct[] }): IProduct[] {
        return response.message
      }
    })
  })
})

export const {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useGetBannersQuery,
  useGetProductQuery,
  useGetProductsQuery,
  useGetProductsByIdsQuery
} = backendApi

export default backendApi
