import PocketBase, { Collection, Record } from 'pocketbase'
import { readFile } from 'fs/promises'
import path from 'path'
import {getEnv} from '../src/utils/Env.js'
import { fileURLToPath } from 'url'

const {ENV, CURRENT_SCRIPT_DIR, CURRENT_SCRIPT} = getEnv(fileURLToPath(import.meta.url), '../../')

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

type IDatabase = IProductRecord[]

const configure = async () => {
  const client = new PocketBase(ENV.POCKETBASE_URL)
  await client.admins.authViaEmail(
    ENV.POCKETBASE_ADMIN_EMAIL,
    ENV.POCKETBASE_ADMIN_PASS
  )
  const database:IDatabase = JSON.parse(await readFile(path.resolve(path.join(CURRENT_SCRIPT_DIR, '../../data/database.json')), { encoding: 'utf8'}))
  return { client, database }
}

const deleteCollections = async ({ client } : { client: PocketBase}) => {
  console.log('Deleting collections...')

  const collections = ['products', 'categories', 'subCategories']
  for (const collection of collections) {
    try {
      await client.collections.delete(collection)
    } catch (err) {}
  }
}

const createCollections = async ({ client } : { client: PocketBase}) => {
  console.log('Creating collections...')
  const collections : { [key:string]: Collection } = {}

  console.log('Creating categories collections...')
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

  console.log('Creating subCategories collections...')
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

  console.log('Creating products collections...')
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

const collectionToID = async (map: { [key:string]: string }, collectionName:string, collectionValue:string, { client } : { client: PocketBase }) => {
  if (Object.keys(map).includes(collectionValue)) return map[collectionValue]

  const createdCollection = await client.records.create(collectionName, {
    name: collectionValue
  })
  map[collectionValue] = createdCollection.id
  return map[collectionValue]
}

const importData = async ({ client, database } : { client: PocketBase, database: IDatabase}) => {
  console.log('Importing data...')
  const categories: { [key:string]: string } = {}
  const subCategories: { [key:string]:string } = {}

  for (let record of database) {
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

    await client.records.create('products', {
      sku: record.ProductId,
      title: record.ProductTitle,
      price: record.Price,
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
  const { client, database } = await configure()
  await deleteCollections({ client })
  await createCollections({ client })
  await importData({ client, database })

  console.log('all done!')
}

run()
