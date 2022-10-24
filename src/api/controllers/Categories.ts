import CollectionNames from '../utils/Collections.js'
import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import pocketbase from 'pocketbase'
import { Logger } from 'tslog'

@Controller('api/categories')
export default class {
  private readonly logger: Logger
  private readonly pocketBaseClient: pocketbase

  constructor({ pocketBaseClient, logger }) {
    this.logger = logger.getChildLogger({ name: 'CategoriesAPI' })
    this.pocketBaseClient = pocketBaseClient
  }

  @Get()
  private async getCategories(req: Request, res: Response) {
    try {
      const categories = await this.pocketBaseClient.records.getFullList(
        CollectionNames.categories,
        100,
        { $autoCancel: false }
      )
      return res.status(StatusCodes.OK).send({ message: categories })
    } catch (err) {
      this.logger.error(err)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }

  @Get(':id')
  private async getCategoryById(req: Request, res: Response) {
    const { id: categoryId } = req.params
    try {
      const category = await this.pocketBaseClient.records.getOne(
        CollectionNames.categories,
        categoryId,
        { $autoCancel: false }
      )
      return res.status(StatusCodes.OK).send({ message: category })
    } catch (err) {
      this.logger.error(err)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }
}
