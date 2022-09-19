import { Controller, Post, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Logger } from 'tslog'
import SaleScheduler from '../utils/SaleScheduler.js'

@Controller('api/sales')
export default class {
  app
  logger
  saleScheduler
  pocketBase
  currentSale

  constructor({ logger, pocketBase, app }) {
    this.app = app
    this.logger = logger.getChildLogger({ name: 'ProductShareAPI' })
    this.pocketBase = pocketBase
    this.saleScheduler = new SaleScheduler({ pocketBase, logger, app })
  }

  @Get()
  private async getCurrentSale(req: Request, res: Response) {
    const currentSale = this.app.locals.currentSale

    if (currentSale)
      return res.status(StatusCodes.OK).send(currentSale.id)

    return res.status(StatusCodes.NOT_FOUND).send()
  }

  @Post()
  private async createSale(req: Request, res: Response) {
    try {
      const sale = await this.pocketBase.Records.create('sales', req.body)
      this.saleScheduler.add(sale)
      return res.status(StatusCodes.CREATED).send({ message: ReasonPhrases.CREATED})
    }
    catch (err) {
      this.logger.error(err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }
}
