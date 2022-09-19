import { Server } from '@overnightjs/core'
import CategoriesAPI from './controllers/Categories.js'
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
    this.errorPages()
  }

  public setupConfig () {
    this.pocketBaseClient.admins.authViaEmail(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASS)
  }

  public setupMiddleWare () {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    if (process.env.NODE_ENV === 'development') {
      this.logger.info('Configuring dev environment...')
      this.app.get(['/', '/store'], (req, res) => {
        this.proxy.web(req, res)
      })
    }
  }

  public start (port: number) {
    this.app.listen(port, () => {
      this.logger.info(`Server started on port ${port}`)
    })
  }

  public errorPages () {
    this.app.use((_, res) =>
      res.status(404).json({ error: 'Route not found!' })
    )
  }
}

new EStoreServer().start(parseInt(process.env.BACKEND_SERVER_PORT))
