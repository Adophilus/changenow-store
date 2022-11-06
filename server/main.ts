import BannersAPI from './controllers/Banners'
import CategoriesAPI from './controllers/Categories'
import ProductsAPI from './controllers/Products'
import SubCategoriesAPI from './controllers/SubCategories'
import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import * as express from 'express'
import morgan from 'morgan'
import path from 'path'
import PocketBase from 'pocketbase'
import { Logger } from 'tslog'

dotenv.config()

export default class AppServer extends Server {
  private readonly logger = new Logger({ name: 'EStore' })
  private readonly pocketBaseClient = new PocketBase(process.env.POCKETBASE_URL)

  constructor() {
    super()
    this.setupConfig()
    this.setupMiddleWare()

    this.setupControllers()
    this.setupRoutes()
  }

  public setupConfig(): void {
    this.pocketBaseClient.admins
      .authViaEmail(
        process.env.POCKETBASE_ADMIN_EMAIL,
        process.env.POCKETBASE_ADMIN_PASSWORD
      )
      .catch((err) => this.logger.error(err))
  }

  public setupMiddleWare(): void {
    this.app.use(cors())
    this.app.use(morgan('tiny'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(express.static('dist'))
    this.app.use(express.static('public'))
  }

  public setupRoutes(): void {
    this.app.get('*', (_, res) =>
      res.sendFile(path.join(process.cwd(), 'frontend/index.html'))
    )
  }

  public setupControllers(): void {
    const props = {
      logger: this.logger,
      pocketBaseClient: this.pocketBaseClient
    }
    super.addControllers([
      new CategoriesAPI(props),
      new SubCategoriesAPI(props),
      new BannersAPI(props),
      new ProductsAPI(props)
    ])
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      this.logger.info(`Server started on port ${port}`)
    })
  }
}

export const { app } = new AppServer()
