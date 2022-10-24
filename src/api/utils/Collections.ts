import dotenv from 'dotenv'

dotenv.config()

export default {
  banners: `${process.env.POCKETBASE_TABLE_PREFIX}banners`,
  categories: `${process.env.POCKETBASE_TABLE_PREFIX}categories`,
  subCategories: `${process.env.POCKETBASE_TABLE_PREFIX}subCategories`,
  productsAnalytics: `${process.env.POCKETBASE_TABLE_PREFIX}productsAnalytics`,
  products: `${process.env.POCKETBASE_TABLE_PREFIX}products`
}
