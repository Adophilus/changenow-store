import React, { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../services/Backend'

const TestView: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const mostPopularProducts = useGetProductsQuery({
    page: 1,
    perPage: 5,
    sort: '+analytics.views'
  })

  useEffect(() => {
    console.log(mostPopularProducts.data)
  }, [mostPopularProducts.data])

  return (
    <div>
      <button onClick={() => setPageNumber(pageNumber + 1)}>
        Increase number
      </button>
    </div>
  )
}

export default TestView
