import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Logger } from 'tslog'

@Controller('share/products')
export default class {
  logger
  pocketBase
  
  constructor({ logger, pocketBase }) {
    this.logger = logger.getChildLogger({ name: 'ProductShareAPI' })
    this.pocketBase = pocketBase
  }

  @Get(':slug')
  private async getProduct(req: Request, res: Response) {
    const { slug: productSlug } = req.params

    const product = (
      await this.pocketBase.Records.getList('products', 1, 1, {
        filter: `slug = '${productSlug}'`,
        expand: 'cover'
      })
    ).items[0]

    if (!product)
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)

    return res.render('product/share', {
      product,
      pocketBaseURL: process.env.POCKETBASE_URL,
      frontendBaseUrl: process.env.FRONTEND_BASE_URL
    })
  }
}
