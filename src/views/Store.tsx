import PocketBase from 'pocketbase'
import { useRef, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import db from '../Database'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Pagination from '../components/Pagination'
import ProductTab from '../components/ProductTab'
import useFilter from '../hooks/Filter'

export default () => {
  const [products, setProducts] = useState(null)
  const [paginationData, setPaginationData] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = useFilter(['category', 'subCategory'])

  const onPageChange = (page) => {
    setSearchParams({ page })
  }

  const fetchProducts = async () => {
    const page = searchParams.get('page')
      ? parseInt(searchParams.get('page'))
      : 1
    const _filter = filter.getAll() || []
    const productMeta = await db.getProducts({
      page,
      options: { filter: _filter.join('&&'), $autoCancel: false }
    })

    let totalPages = productMeta.totalItems / productMeta.perPage
    if (productMeta.totalItems % productMeta.perPage) totalPages += 1
    setPaginationData({
      totalCount: productMeta.totalItems,
      pageSize: productMeta.perPage,
      currentPage: productMeta.page
    })
    console.log(productMeta.items)
    setProducts(productMeta.items)
  }

  useEffect(() => {
    fetchProducts()
  }, [searchParams, filter.state])

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <main className="container">
      <Navbar />
      <div className="row">
        <div className="col-xs-0 col-lg-4">
          <Sidebar
            onCategoryChange={(category, active) => {
              const _filter = `category ~ '${category.id}'`
              if (active) return filter.add('category', _filter)
              return filter.remove('category', _filter)
            }}
            onSubCategoryChange={(subCategory, active) => {
              const _filter = `subCategory ~ '${subCategory.id}'`
              if (active) return filter.add('subCategory', _filter)
              return filter.remove('subCategory', _filter)
            }}
          />
        </div>
        <div className="row col-lg-8 justify-content-center">
          {products ? (
            products.map((product) => (
              <div key={product.id} className="col-xs-12 col-md-6">
                <ProductTab product={product} />
              </div>
            ))
          ) : (
            <div aria-busy="true"></div>
          )}
          <div className="row" style={{ textAlign: 'center' }}>
            <Pagination {...paginationData} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </main>
  )
}
