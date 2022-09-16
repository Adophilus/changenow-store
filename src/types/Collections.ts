interface ICollection {
  id: string
}

export interface IProduct extends ICollection {
  sku: number
  title: string
  price: number
  category: string
  subCategory: string
  type: string
  gender: string
  color: string
  usage: string
  image: string
}
