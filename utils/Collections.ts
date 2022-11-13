import Config from '@/utils/Config'

export default {
  banners: `${Config.pocketbase.tablePrefix}banners`,
  categories: `${Config.pocketbase.tablePrefix}categories`,
  subCategories: `${Config.pocketbase.tablePrefix}subCategories`,
  productsAnalytics: `${Config.pocketbase.tablePrefix}productsAnalytics`,
  products: `${Config.pocketbase.tablePrefix}products`
}
