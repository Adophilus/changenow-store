import PocketBase from 'pocketbase'
import * as dotenv from 'dotenv'
import Database from 'database.json' assert { type: 'json' }

dotenv.config()

const client = new PocketBase(pocess.env.POCKETBASE_URL)
await client.Admins.authViaEmail(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASS)

const createCollections = async () => {
  await client.Collections.delete('products')

  await client.Collections.create({
    name: 'products',
    schema: [
      {
        name: 'id',
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
        type: 'text',
        required: true
      },
      {
        name: 'subCategory',
        type: 'text',
        required: 'true'
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
    ]
  })
}

const importData = async () => {
  for (let record of Database) {
    await client.Records.create('products', {
      id: record.ProductId,
      title: record.ProductTitle,
      category: record.Category,
      subCategory: record.SubCategory,
      type: record.ProductType,
      gender: record.Gender,
      color: record.Color,
      usage: record.Usage,
      image: record.ImageURL
    }, {
        '$autoCancel': false
      })
  }
}


const run = async () => {
  await createCollections()
  await importData()

  console.log('all done!')
}
