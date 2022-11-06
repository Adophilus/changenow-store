import PocketBase, { Collection } from 'pocketbase'
import CollectionNames from '@/utils/Collections.js'
import config from '@/utils/Config'

interface IProductRecord {
  ProductId: number
  ProductTitle: string
  Price: number
  Category: string
  SubCategory: string
  ProductType: string
  Gender: string
  Colour: string
  Usage: string
  ImageURL: string
}

interface IBannerRecord {
  image: string
}

interface IDatabase {
  products: IProductRecord[]
  banners: IBannerRecord[]
}

const collections: { [key: string]: Collection } = {}

const configure = async () => {
  if (
    config.pocketbase.admin.email == null ||
    config.pocketbase.admin.password == null
  )
    throw new Error('Invalid admin credentials!')
  if (config.db.url == null) throw new Error('Invalid database URL!')

  const client = new PocketBase(config.pocketbase.url)
  await client.admins.authViaEmail(
    config.pocketbase.admin.email,
    config.pocketbase.admin.password
  )

  let database: IDatabase = { products: [], banners: [] }

  const res = await fetch(config.db.url)
  database = JSON.parse(await res.text())

  return { client, database }
}

const deleteCollections = async ({ client }: { client: PocketBase }) => {
  console.log('Deleting collections...')

  for (let i = 0; i < 5; i++) {
    for (const collectionName of Object.values(CollectionNames)) {
      try {
        await client.collections.delete(collectionName)
      } catch (err) {}
    }
  }
}

const createCollections = async ({ client }: { client: PocketBase }) => {
  console.log('Creating collections...')

  for (const collectionName of Object.values(CollectionNames)) {
    switch (collectionName) {
      case CollectionNames.categories:
        console.log('Creating categories collection...')
        collections.categories = await client.collections.create({
          name: collectionName,
          schema: [
            {
              name: 'name',
              type: 'text',
              required: true
            }
          ],
          listRule: '',
          viewRule: ''
        })
        break
      case CollectionNames.subCategories:
        console.log('Creating subCategories collection...')
        collections.subCategories = await client.collections.create({
          name: collectionName,
          schema: [
            {
              name: 'name',
              type: 'text',
              required: true
            }
          ],
          listRule: '',
          viewRule: ''
        })
        break

      case CollectionNames.productsAnalytics:
        console.log('Creating productsAnalytics collection...')
        collections.productsAnalytics = await client.collections.create({
          name: collectionName,
          schema: [
            {
              name: 'views',
              type: 'number'
            },
            {
              name: 'sales',
              type: 'number'
            }
          ]
        })
        break

      case CollectionNames.banners:
        console.log('Creating banners collection...')
        collections.banners = await client.collections.create({
          name: collectionName,
          schema: [
            {
              name: 'image',
              type: 'text',
              required: true
            }
          ]
        })
        break
      case CollectionNames.products:
        console.log('Creating products collection...')
        collections.products = await client.collections.create({
          name: collectionName,
          schema: [
            {
              name: 'sku',
              type: 'number',
              required: true
            },
            {
              name: 'title',
              type: 'text',
              required: true
            },
            {
              name: 'price',
              type: 'number',
              required: true
            },
            {
              name: 'category',
              type: 'relation',
              required: true,
              options: {
                collectionId: collections.categories.id,
                maxSelect: 1
              }
            },
            {
              name: 'subCategory',
              type: 'relation',
              required: true,
              options: {
                collectionId: collections.subCategories.id,
                maxSelect: 5
              }
            },
            {
              name: 'analytics',
              type: 'relation',
              required: true,
              options: {
                collectionId: collections.productsAnalytics.id,
                maxSelect: 1
              }
            },
            {
              name: 'type',
              type: 'text',
              required: true
            },
            {
              name: 'gender',
              type: 'text',
              required: true
            },
            {
              name: 'color',
              type: 'text',
              required: true
            },
            {
              name: 'usage',
              type: 'text',
              required: true
            },
            {
              name: 'image',
              type: 'text',
              required: true
            }
          ],
          listRule: '',
          viewRule: ''
        })
        break
      default:
        console.log(`Doing nothing for collection ${collectionName}`)
        break
    }
  }
}

const collectionToID = async (
  map: { [key: string]: string },
  collectionName: string,
  collectionValue: string,
  { client }: { client: PocketBase }
) => {
  if (Object.keys(map).includes(collectionValue)) return map[collectionValue]

  const createdCollection = await client.records.create(collectionName, {
    name: collectionValue
  })
  map[collectionValue] = createdCollection.id
  return map[collectionValue]
}

const importProducts = async ({
  client,
  products
}: {
  client: PocketBase
  products: IProductRecord[]
}) => {
  console.log('Importing data...')
  const categories: { [key: string]: string } = {}
  const subCategories: { [key: string]: string } = {}

  for (let record of products) {
    let category = await collectionToID(
      categories,
      collections.categories.name,
      record.Category,
      { client }
    )
    let subCategory = await collectionToID(
      subCategories,
      collections.subCategories.name,
      record.SubCategory,
      { client }
    )

    const productAnalyticsRecord = await client.records.create(
      collections.productsAnalytics.name,
      {
        views: 0,
        sales: 0
      }
    )

    await client.records.create(collections.products.name, {
      sku: record.ProductId,
      title: record.ProductTitle,
      price: record.Price,
      category: category,
      subCategory: subCategory,
      analytics: productAnalyticsRecord.id,
      type: record.ProductType,
      gender: record.Gender,
      color: record.Colour,
      usage: record.Usage,
      image: record.ImageURL
    })
  }
}

const importBanners = async ({
  client,
  banners
}: {
  client: PocketBase
  banners: IBannerRecord[]
}) => {
  for (let banner of banners) {
    await client.records.create(collections.banners.name, {
      image: banner.image
    })
  }
}

const importData = async ({
  client,
  database
}: {
  client: PocketBase
  database: IDatabase
}) => {
  await importProducts({ client, products: database.products })
  await importBanners({ client, banners: database.banners })
}

const run = async () => {
  const { client, database } = await configure()
  await deleteCollections({ client })
  await createCollections({ client })
  await importData({ client, database })

  console.log('all done!')
}

run()
