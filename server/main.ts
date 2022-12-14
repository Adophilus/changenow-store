import BannersAPI from './controllers/Banners'
import CategoriesAPI from './controllers/Categories'
import ProductsAPI from './controllers/Products'
import SubCategoriesAPI from './controllers/SubCategories'
import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as express from 'express'
import morgan from 'morgan'
import PocketBase from 'pocketbase'
import { Logger } from 'tslog'
import config from '@/utils/Config'

export default class AppServer extends Server {
  private readonly logger = new Logger({ name: 'EStore' })
  private readonly pocketBaseClient = new PocketBase(config.pocketbase.url)

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
        config.pocketbase.admin.email,
        config.pocketbase.admin.password
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
    this.app.get('*', (req, res) => {
      let returnFile: string
      if (req.originalUrl.match(/\/assets\/|\/api\//) != null) {
        returnFile = String(req.originalUrl.split('?').shift()).replace(`${config.project.baseUrl}`, '/')
      }
      else{
        returnFile = '/index.html'
      }
      return res.sendFile(returnFile, { root: config.project.frontendDir })
    })
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
