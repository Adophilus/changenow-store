import config from './Config.ts'
import PocketBase from 'pocketbase'

export const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL)

export default {
  async getCategories() {
    return client.Records.getFullList('categories', 100, { $autoCancel: false })
  },
  async getSubCategories() {
    return client.Records.getFullList('subCategories', 100, {
      $autoCancel: false
    })
  },
  async getProducts(options) {
    options = Object.assign(
      {
        page: 1,
        perPage: 10,
        options: { $autoCancel: false }
      },
      options
    )
    return client.Records.getList(
      'products',
      options.page,
      options.perPage,
      options.options
    )
  }
}
