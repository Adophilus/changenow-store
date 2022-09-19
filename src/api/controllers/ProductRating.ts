import { Controller, Get, Put } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Logger } from 'tslog'

@Controller('api/products/rating')
export default class {
  logger
  pocketBase

  constructor({ pocketBase, logger }) {
    this.logger = logger.getChildLogger({ name: 'ProductRatingAPI' })
    this.pocketBase = pocketBase
  }

 
  @Put(':id')
  private async createProductRating (req: Request, res: Response) {
    const { id: productId } = req.params
    try {
      this.logger.info(req.body)
      const review  = await this.pocketBase.Records.create('product_reviews', { creator: req.body.creator, stars: req.body.stars, review: req.body.review })
      const product = await this.pocketBase.Records.getOne('products', productId, { expand: 'stats'})

      const reviews = [ ...product['@expand'].stats.reviews, review.id ]
      const rating = { ...product['@expand'].stats.rating }
      rating.stars[`${req.body.stars}`] += 1
      rating.average = Object.keys(rating.stars).map(star => parseInt(star) * rating.stars[`${star}`]).reduce((prev, next) => prev + next) / Object.keys(rating.stars).map(star => rating.stars[`${star}`]).reduce((prev, next) => prev + next)
      await this.pocketBase.Records.update('product_stats', product.stats, { reviews, rating })
      return res.status(StatusCodes.OK).send({ message: "Review submitted!" })
    }
    catch (err) {
      this.logger.error(err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "An error occurred while submitting review!" })
    }
  }
}
