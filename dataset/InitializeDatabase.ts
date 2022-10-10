import PocketBase, { Collection, Record } from 'pocketbase'
import * as dotenv from 'dotenv'

dotenv.config()
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

const configure = async () => {
  if (
    process.env.POCKETBASE_ADMIN_EMAIL == null ||
    process.env.POCKETBASE_ADMIN_PASS == null
  )
    throw new Error('Invalid admin credentials!')
  if (process.env.DB_URL == null) throw new Error('Invalid database URL!')

  const client = new PocketBase(process.env.POCKETBASE_URL)
  await client.admins.authViaEmail(
    process.env.POCKETBASE_ADMIN_EMAIL,
    process.env.POCKETBASE_ADMIN_PASS
  )

  let database: IDatabase = { products: [], banners: [] }

  try {
    const res = await fetch(process.env.DB_URL)
    database = JSON.parse(await res.text())
  } catch (err) {
    console.log('Failed to fetch database!')
    console.log(err)
  }

  return { client, database }
}

const deleteCollections = async ({ client }: { client: PocketBase }) => {
  console.log('Deleting collections...')

  const collections = [
    'products',
    'banners',
    'categories',
    'subCategories',
    'productsAnalytics'
  ]
  for (const collection of collections) {
    try {
      await client.collections.delete(collection)
    } catch (err) {}
  }
}

const createCollections = async ({ client }: { client: PocketBase }) => {
  console.log('Creating collections...')
  const collections: { [key: string]: Collection } = {}

  console.log('Creating categories collection...')
  collections.categories = await client.collections.create({
    name: 'categories',
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

  console.log('Creating subCategories collection...')
  collections.subCategories = await client.collections.create({
    name: 'subCategories',
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

  console.log('Creating productsAnalytics collection...')
  collections.productsAnalytics = await client.collections.create({
    name: 'productsAnalytics',
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

  console.log('Creating banners collection...')
  collections.banners = await client.collections.create({
    name: 'banners',
    schema: [
      {
        name: 'image',
        type: 'text',
        required: true
      }
    ]
  })

  console.log('Creating products collection...')
  collections.products = await client.collections.create({
    name: 'products',
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
      'categories',
      record.Category,
      { client }
    )
    let subCategory = await collectionToID(
      subCategories,
      'subCategories',
      record.SubCategory,
      { client }
    )

    const productAnalyticsRecord = await client.records.create(
      'productsAnalytics',
      {
        views: 0,
        sales: 0
      }
    )

    await client.records.create('products', {
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
    await client.records.create('banners', {
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
