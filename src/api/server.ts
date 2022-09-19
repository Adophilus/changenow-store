import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import proxy from 'express-http-proxy'
import PocketBase from 'pocketbase'
import { Logger } from 'tslog'

dotenv.config()

export default class EStoreServer extends Server {
  private readonly logger = new Logger({ name: 'EStore' })
  private readonly pocketBaseClient = new PocketBase(process.env.POCKETBASE_URL)

  constructor () {
    super()
    this.setupConfig()
    this.setupMiddleWare()

    // const props = { logger: this.logger, pocketBase: this.pocketBase, app: this.app }
    // super.addControllers([])
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
      this.app.use(
        '/',
        proxy(process.env.DEV_SERVER_URL)
      )
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
