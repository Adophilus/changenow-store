export namespace PocketBaseCollection {
  export interface ICategory {
    name: string
  }

  export interface ISubCategory {
    name: string
  }

  export interface IProduct {
    title: string
    price: number
  }
}

export interface IPocketBaseQueryCollectionResult<
  T extends IPocketBaseCollection
> {
  page?: number
  perPage?: number
  items?: T[]
}
