import React, { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../services/Backend'

const TestView: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { error, data, isLoading } = useGetProductsQuery({
    page: pageNumber,
    perPage: 5,
    sort: '+analytics.views'
  })

  useEffect(() => {
    if (error != null) {
      console.warn(error)
      return
    }
    if (isLoading) return
    console.log(data.items.map((item) => item.id))
  }, [data])

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
