import config from './Config.ts'
import PocketBase from 'pocketbase'

export const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL)

export default {
  async getProducts(
    options = {
      page: 1,
      perPage: 10,
      options: { $autoCancel: false }
    }
  ) {
    return client.Records.getList(
      'products',
      options.page,
      options.perPage,
      options.options
    )
  }
}
