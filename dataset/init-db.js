import PocketBase from 'pocketbase'
import * as dotenv from 'dotenv'
import Database from './database.json' assert { type: 'json' }

dotenv.config()

const client = new PocketBase(process.env.POCKETBASE_URL)
await client.Admins.authViaEmail(
  process.env.POCKETBASE_ADMIN_EMAIL,
  process.env.POCKETBASE_ADMIN_PASS
)

const deleteCollections = async () => {
  console.log('Deleting collections...')

  const collections = ['products', 'categories', 'subCategories']
  for (const collection of collections) {
    try {
      await client.Collections.delete(collection)
    } catch (err) {}
  }
}

const createCollections = async () => {
  console.log('Creating collections...')
  const collections = {}

  console.log('Creating categories collections...')
  collections.categories = await client.Collections.create({
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

  console.log('Creating subCategories collections...')
  collections.subCategories = await client.Collections.create({
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

  console.log('Creating products collections...')
  collections.products = await client.Collections.create({
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

const collectionToID = async (map, collectionName, collectionValue) => {
  if (Object.keys(map).includes(collectionValue)) return map[collectionValue]

  const createdCollection = await client.Records.create(collectionName, {
    name: collectionValue
  })
  map[collectionValue] = createdCollection.id
  return map[collectionValue]
}

const importData = async () => {
  console.log('Importing data...')
  const categories = {}
  const subCategories = {}

  for (let record of Database) {
    let category = await collectionToID(
      categories,
      'categories',
      record.Category
    )
    let subCategory = await collectionToID(
      subCategories,
      'subCategories',
      record.SubCategory
    )

    await client.Records.create('products', {
      sku: record.ProductId,
      title: record.ProductTitle,
      category: category,
      subCategory: subCategory,
      type: record.ProductType,
      gender: record.Gender,
      color: record.Colour,
      usage: record.Usage,
      image: record.ImageURL
    })
  }
}

const run = async () => {
  await deleteCollections()
  await createCollections()
  await importData()

  console.log('all done!')
}

run()
