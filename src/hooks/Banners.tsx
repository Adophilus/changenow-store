import { useEffect, useState } from 'react'
import { useGetBannersQuery } from '../services/Backend'
import { IBanner } from '../types/Collections'

export interface IBanners {
  banners: IBanner[]
  loadMore: () => void
}

export const useGetBanners = (): IBanners => {
  const [bannersPage, setBannersPage] = useState(1)
  const [banners, setBanners] = useState<IBanner[]>([])
  const query = {
    banners: useGetBannersQuery({
      page: bannersPage,
      perPage: 5
    })
  }

  useEffect(() => {
    if (query.banners.data != null) {
      setBanners(banners.concat(query.banners.data.items as IBanner[]))
    }
  }, [query.banners.data])

  return {
    banners,
    loadMore() {
      setBannersPage(bannersPage + 1)
    }
  }
}

export default useGetBanners
