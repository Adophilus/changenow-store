import { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../services/Backend'
import { IProduct } from '../types/Collections'

interface IPageCounter {
  mostPopular: number
  bestPriced: number
}
export interface IProducts { mostPopular: IProduct[], bestPriced: IProduct[] }

export const useGetProducts = (): IProducts => {
  const [mostPopular,setMostPopular] = useState<IProduct[]>([])
  const [bestPriced,setBestPriced] = useState<IProduct[]>([])
  const query = {
    mostPopular: useGetProductsQuery({
      page: 1,
      perPage: 5,
      sort: '+analytics.views'
    }),
    bestPriced: useGetProductsQuery({
      page: 1,
      perPage: 5,
      sort: '+analytics.sales'
    })
  }
  const [pageCounter,setPageCounter] = useState<IPageCounter>({
    mostPopular: 1,
    bestPriced: 1
  })

  useEffect(() => {
    if (query.mostPopular.data != null) {
      setMostPopular(mostPopular.concat(query.mostPopular.data.items as IProduct[]))
    }
  }, [query.mostPopular])

  useEffect(() => {
    if (query.bestPriced.data != null) {
      setBestPriced(bestPriced.concat(query.bestPriced.data.items as IProduct[]))
    }
  }, [query.bestPriced])

  return {
    mostPopular,
    bestPriced
  }
}

export default useGetProducts
