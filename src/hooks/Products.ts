import { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../services/Backend'
import { IProduct } from '../types/Collections'

export interface IProducts {
  mostPopular: IProduct[]
  bestPriced: IProduct[]
  loadMore: (category: 'mostPopular' | 'bestPriced') => void
}

export const useGetProducts = (): IProducts => {
  const [mostPopular, setMostPopular] = useState<IProduct[]>([])
  const [bestPriced, setBestPriced] = useState<IProduct[]>([])
  const [mostPopularPage, setMostPopularPage] = useState(1)
  const [bestPricedPage, setBestPricedPage] = useState(1)
  const query = {
    mostPopular: useGetProductsQuery({
      page: mostPopularPage,
      perPage: 5,
      sort: '+analytics.views'
    }),
    bestPriced: useGetProductsQuery({
      page: bestPricedPage,
      perPage: 5,
      sort: '+analytics.sales'
    })
  }

  useEffect(() => {
    if (query.mostPopular.data != null) {
      setMostPopular(
        mostPopular.concat(query.mostPopular.data.items as IProduct[])
      )
    }
  }, [query.mostPopular.data])

  useEffect(() => {
    if (query.bestPriced.data != null) {
      setBestPriced(
        bestPriced.concat(query.bestPriced.data.items as IProduct[])
      )
    }
  }, [query.bestPriced.data])

  return {
    mostPopular,
    bestPriced,
    loadMore(category: 'mostPopular' | 'bestPriced') {
      switch (category) {
        case 'mostPopular':
          setMostPopularPage(mostPopularPage + 1)
          break
        case 'bestPriced':
          setBestPricedPage(bestPricedPage + 1)
          break
      }
    }
  }
}

export default useGetProducts
