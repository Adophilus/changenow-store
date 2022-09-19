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
  private async getProducts (req: Request, res: Response) {
    const { page, perPage } = req.params
    try {
      const products = await this.pocketBaseClient.records.getList(
        'products',
        parseInt(page ?? '1'),
        parseInt(perPage ?? '10'),
        { $autoCancel: false }
      )
      return res.status(StatusCodes.OK).send({ message: products })
    } catch (err) {
      this.logger.error(err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }

  @Get(':id')
  private async getProductById (req: Request, res: Response) {
    const { productId } = req.params
    try {
      const product = await this.pocketBaseClient.records.getOne(
        'products',
        productId,
        { $autoCancel: false }
      )
      return res.status(StatusCodes.OK).send({ message: product })
    } catch (err) {
      this.logger.error(err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }
}
