import CollectionNames from '../utils/Collections.js'
import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import pocketbase from 'pocketbase'
import { Logger } from 'tslog'

@Controller('api/products')
export default class {
  private readonly logger: Logger
  private readonly pocketBaseClient: pocketbase

  constructor({ pocketBaseClient, logger }) {
    this.logger = logger.getChildLogger({ name: 'ProductsAPI' })
    this.pocketBaseClient = pocketBaseClient
  }

  @Get()
  private async getProducts(req: Request, res: Response): Promise<void> {
    const { page, perPage, filter, sort } = req.query
    const options: { filter?: string; sort?: string } = {}

    if (filter != null) {
      options.filter = filter.toString()
    }

    if (sort != null) {
      options.sort = sort.toString()
    }

    try {
      const products = await this.pocketBaseClient.records.getList(
        CollectionNames.products,
        parseInt(String(page) ?? '1'),
        parseInt(String(perPage) ?? '10'),
        Object.assign({ $autoCancel: false }, options)
      )
      res.status(StatusCodes.OK).send({ message: products })
    } catch (err) {
      this.logger.error(err)
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }

  @Get('ids')
  private async getProductsByIds(req: Request, res: Response) {
    const ids = (req.query?.ids as string)?.split(',')?.filter((i) => i) ?? []
    const products = []
    this.logger.info('ids:', ids)

    if (ids.length === 0)
      return res.status(StatusCodes.OK).send({ message: [] })

    try {
      products.push(
        ...(await Promise.all(
          ids.map(
            async (id) =>
              await this.pocketBaseClient.records.getOne(
                CollectionNames.products,
                id,
                {
                  $autoCancel: false
                }
              )
          )
        ))
      )
    } catch (err) {
      this.logger.error(err)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }

    this.logger.info('products:', products)
    return res.status(StatusCodes.OK).send({ message: products })
  }

  @Get(':uniqueId')
  private async getProductByUniqueIdentifier(req: Request, res: Response) {
    const { uniqueId } = req.params
    let filter: string
    switch (req.query.type) {
      case 'id':
        filter = `id = '${uniqueId}'`
        break
      case 'sku':
        filter = `sku = ${uniqueId}`
        break
      default:
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Invalid 'type' specified" })
    }

    try {
      const products = await this.pocketBaseClient.records.getList(
        CollectionNames.products,
        1,
        1,
        { $autoCancel: false, expand: 'analytics', filter }
      )

      if (products.items.length !== 1)
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ error: ReasonPhrases.NOT_FOUND })

      const product = products.items[0]

      await this.pocketBaseClient.records.update(
        CollectionNames.productsAnalytics,
        product.analytics,
        {
          views: product['@expand'].analytics.views + 1
        },
        { $autoCancel: false }
      )

      return res.status(StatusCodes.OK).send({ message: product })
    } catch (err) {
      this.logger.error(err)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }
}
