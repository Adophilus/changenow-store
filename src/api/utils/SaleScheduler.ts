class SaleScheduler
{
  app
  logger
  pocketBase

  constructor ({ pocketBase, logger, app }) {
    this.app = app
    this.logger = logger.getChildLogger({ name: 'SaleScheduler' })
    this.pocketBase = pocketBase
  }

  add (sale) {
    const timeout = Date.now() - sale.starting || 0
    setTimeout(() => {
      this.start(sale)
    }, timeout)
    this.logger.info(`Scheduling sale ${sale.id} to begin in ${timeout} seconds`)
  }

  async start (sale) {
    this.logger.info(`Starting sale ${sale.id}...`)
    for (let page = 1; page > 0; page++) {
      const productsList = await this.pocketBase.Records.getList('products', page, 50, { expand: 'stats' })
      const products = productsList.items
      if (!products || productsList.page !== page)
        break
      for (const product of products) {
        if (product['@expand'].stats.sale.discount > 0) {
          this.logger.info(`putting product ${product.id} on sale...`)
          await this.pocketBase.Records.update('products', product.id, { ...product, onSale: true })
        }
      }
    }
    await this.pocketBase.Records.update("sales", sale.id, sale)
    this.app.locals.currentSale = sale
    setTimeout(() => {
      this.end(sale)
    }, Date.now() - sale.starting + sale.duration)
  }

  async end (sale) {
    this.logger.info(`Ending sale ${sale.id}...`)
    for (let page = 1; page > 0; page++) {
      const productsList = await this.pocketBase.Records.getList('products', page, 50)
      const products = productsList.items
      if (!products || productsList.page !== page)
        break
      for (const product of products) {
        this.logger.info(`Removing product ${product.id} from sale...`)
        await this.pocketBase.Records.update('products', product.id, { ...product, onSale: false })
      }
    }
    this.app.locals.currentSale = null
  }
}

export default SaleScheduler
