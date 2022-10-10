import { Record } from 'pocketbase'

export interface IListResult {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Record[]
}

export interface ICategory extends Record {
  name: string
}

export interface ISubCategory extends Record {
  name: string
}

export interface IProduct extends Record {
  sku: number
  title: string
  price: number
  category: string
  subCategory: string
  analytics: string
  type: string
  gender: string
  color: string
  usage: string
  image: string
}

export interface IBanner extends Record {
  image: string
}
