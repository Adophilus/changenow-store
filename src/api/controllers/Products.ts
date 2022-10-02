import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import pocketbase from 'pocketbase'
import { Logger } from 'tslog'

@Controller('api/products')
export default class {
  private readonly logger: Logger
  private readonly pocketBaseClient: pocketbase

  constructor ({ pocketBaseClient, logger }) {
    this.logger = logger.getChildLogger({ name: 'ProductsAPI' })
    this.pocketBaseClient = pocketBaseClient
  }

  @Get()
  private async getProducts (req: Request, res: Response): Promise<void> {
    const { page, perPage, filter } = req.query

    try {
      const products = await this.pocketBaseClient.records.getList(
        'products',
        parseInt(String(page) ?? '1'),
        parseInt(String(perPage) ?? '10'),
        { $autoCancel: false, filter }
      )
      res.status(StatusCodes.OK).send({ message: products })
    } catch (err) {
      this.logger.error(err)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }

  @Get(':id')
  private async getProductByUniqueIdentifier (req: Request, res: Response) {
    const filters = []

    for (const key of Object.keys(req.query)) {
      filters.push(`${key} = '${req.query[key]}'`)
    }

    try {
      const products = await this.pocketBaseClient.records.getList(
        'products',
        1,
        1,
        { $autoCancel: false, expand: 'analytics', filter: filters.join('&&') }
      )

      if (products.items.length !== 1)
        return res.status(StatusCodes.NOT_FOUND).send({ error: ReasonPhrases.NOT_FOUND })
      
      const product = products.items[0]

      await this.pocketBaseClient.records.update('productsAnalytics', product.analytics, {
        views: product['@expand'].analytics.views + 1
      }, { $autoCancel: false })

      return res.status(StatusCodes.OK).send({ message: product })
    } catch (err) {
      this.logger.error(err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }
}
