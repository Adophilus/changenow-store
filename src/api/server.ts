import { Server } from '@overnightjs/core'
import CategoriesAPI from './controllers/Categories.js'
import SubCategoriesAPI from './controllers/SubCategories.js'
import ProductsAPI from './controllers/Products.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import PocketBase from 'pocketbase'
import { Logger } from 'tslog'
import httpProxy from 'http-proxy'

dotenv.config()

export default class EStoreServer extends Server {
  private readonly logger = new Logger({ name: 'EStore' })
  private readonly pocketBaseClient = new PocketBase(process.env.POCKETBASE_URL)
  private readonly proxy = httpProxy.createProxyServer({
    target: process.env.DEV_SERVER_URL,
    ws: true
  })

  constructor () {
    super()
    this.setupConfig()
    this.setupMiddleWare()

    const props = { logger: this.logger, pocketBaseClient: this.pocketBaseClient }
    super.addControllers([new CategoriesAPI(props)])
    super.addControllers([new SubCategoriesAPI(props)])
    super.addControllers([new ProductsAPI(props)])

    this.errorPages()
  }

  public setupConfig (): void {
    this.pocketBaseClient.admins.authViaEmail(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASS).catch(err => this.logger.error(err))
  }

  public setupMiddleWare (): void {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    if (process.env.NODE_ENV === 'development') {
      this.logger.info('Configuring dev environment...')
      this.app.all('*', (req, res, next) => {
        if (req.originalUrl.startsWith('/api')) {
          next()
        } else {
          this.proxy.web(req, res)
        }
      })
    }
  }

  public start (port: number): void {
    this.app.listen(port, () => {
      this.logger.info(`Server started on port ${port}`)
    })
  }

  public errorPages (): void {
    this.app.use((_, res) =>
      res.status(404).json({ error: 'Route not found!' })
    )
  }
}

new EStoreServer().start(parseInt(process.env.BACKEND_SERVER_PORT))
