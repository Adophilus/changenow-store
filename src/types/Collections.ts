import { Record } from 'pocketbase'

export interface ICategory extends Record {
  name?: string
}

export interface ISubCategory extends Record {
  name?: string
}

export interface IProduct extends Record {
  sku?: number
  title?: string
  price?: number
  category?: string
  subCategory?: string
  type?: string
  gender?: string
  color?: string
  usage?: string
  image?: string
}
