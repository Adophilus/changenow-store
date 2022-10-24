import CollectionNames from '../utils/Collections.js'
import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import pocketbase from 'pocketbase'
import { Logger } from 'tslog'

@Controller('api/banners')
export default class {
  private readonly logger: Logger
  private readonly pocketBaseClient: pocketbase

  constructor({ pocketBaseClient, logger }) {
    this.logger = logger.getChildLogger({ name: 'BannersAPI' })
    this.pocketBaseClient = pocketBaseClient
  }

  @Get()
  private async getBanners(req: Request, res: Response): Promise<void> {
    const { page, perPage, filter, sort } = req.query
    const options: { filter?: string; sort?: string } = {}

    if (filter != null) {
      options.filter = filter.toString()
    }

    if (sort != null) {
      options.sort = sort.toString()
    }

    try {
      const banners = await this.pocketBaseClient.records.getList(
        CollectionNames.banners,
        parseInt(String(page) ?? '1'),
        parseInt(String(perPage) ?? '10'),
        Object.assign({ $autoCancel: false }, options)
      )
      res.status(StatusCodes.OK).send({ message: banners })
    } catch (err) {
      this.logger.error(err)
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }

  @Get(':id')
  private async getBannerById(req: Request, res: Response) {
    const { id } = req.params
    if (id == null)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "No 'id' specified" })

    try {
      const banner = await this.pocketBaseClient.records.getOne(
        CollectionNames.banners,
        id,
        {
          $autoCancel: false
        }
      )

      return res.status(StatusCodes.OK).send({ message: banner })
    } catch (err) {
      this.logger.error(err)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }
}
