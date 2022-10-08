import React, { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../services/Backend'

const TestView: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const mostPopularProducts = useGetProductsQuery({
    page: pageNumber,
    perPage: 5,
    sort: '+analytics.views'
  })

  useEffect(() => {
    console.log(mostPopularProducts.data)
  }, [mostPopularProducts.data])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <a role="button" href="#!" onClick={() => setPageNumber(pageNumber + 1)}>
        Increase number
      </a>
    </div>
  )
}

export default TestView
