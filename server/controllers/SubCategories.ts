import CollectionNames from '@/utils/Collections'
import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import pocketbase from 'pocketbase'
import { Logger } from 'tslog'

@Controller('api/sub-categories')
export default class {
  private readonly logger: Logger
  private readonly pocketBaseClient: pocketbase

  constructor({ pocketBaseClient, logger }) {
    this.logger = logger.getChildLogger({ name: 'SubCategoriesAPI' })
    this.pocketBaseClient = pocketBaseClient
  }

  @Get()
  private async getSubCategories(req: Request, res: Response) {
    try {
      const subCategories = await this.pocketBaseClient.records.getFullList(
        CollectionNames.subCategories,
        100,
        { $autoCancel: false }
      )
      return res.status(StatusCodes.OK).send({ message: subCategories })
    } catch (err) {
      this.logger.error(err)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }

  @Get(':id')
  private async getSubCategoryById(req: Request, res: Response) {
    const { subCategoryId } = req.params
    try {
      const subCategory = await this.pocketBaseClient.records.getOne(
        CollectionNames.subCategories,
        subCategoryId,
        { $autoCancel: false }
      )
      return res.status(StatusCodes.OK).send({ message: subCategory })
    } catch (err) {
      this.logger.error(err)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }
}
