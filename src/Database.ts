import PocketBase from 'pocketbase'

export const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL)
interface IQueryOptions {
  page?: number
  perPage?: number
  options?: {
    $autoCancel?: boolean
    filter?: string
  }
}

export default {
  async getCategories () {
    return await client.records.getFullList('categories', 100, {
      $autoCancel: false
    })
  },
  async getSubCategories () {
    return await client.records.getFullList('subCategories', 100, {
      $autoCancel: false
    })
  },
  async getProducts (
    options: IQueryOptions
  ) {
    options = Object.assign(
      {
        page: 1,
        perPage: 10,
        options: { $autoCancel: false }
      },
      options
    )
    return await client.records.getList(
      'products',
      options.page,
      options.perPage,
      options.options
    )
  }
}
