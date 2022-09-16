import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import db from '../Database'
import Layout from '../components/layout/Layout'
import Sidebar from '../components/layout/Sidebar'
import Pagination from '../components/Pagination'
import ProductTab from '../components/ProductTab'
import useFilter from '../hooks/Filter'
import { ICategory, ISubCategory } from '../types'

export default function Store(): React.FC {
  const [products, setProducts] = useState(null)
  const [paginationData, setPaginationData] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = useFilter(['category', 'subCategory'])

  const onPageChange = (page): void => {
    setSearchParams({ page })
  }

  const fetchProducts = async (): void => {
    const page = parseInt(searchParams.get('page')) ?? 1
    const _filter = filter.getAll()
    const productMeta = await db.getProducts({
      page,
      options: { filter: _filter.join('&&'), $autoCancel: false }
    })

    setPaginationData({
      totalCount: productMeta.totalItems,
      pageSize: productMeta.perPage,
      currentPage: productMeta.page
    })
    setProducts(productMeta.items)
  }

  useEffect(() => {
    fetchProducts()
  }, [searchParams, filter.state])

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Layout>
      <div className="row">
        <div className="col-xs-0 col-lg-4">
          <Sidebar
            onCategoryChange={(category: ICategory, active: boolean) => {
              const _filter = `category ~ '${category.id}'`
              if (active) return filter.add('category', _filter)
              return filter.remove('category', _filter)
            }}
            onSubCategoryChange={(
              subCategory: ISubCategory,
              active: boolean
            ) => {
              const _filter = `subCategory ~ '${subCategory.id}'`
              if (active) return filter.add('subCategory', _filter)
              return filter.remove('subCategory', _filter)
            }}
          />
        </div>
        <div className="row col-lg-8 justify-content-center">
          {products ? (
            products.length ? (
              products.map((product) => (
                <div key={product.id} className="col-xs-12 col-md-6">
                  <ProductTab product={product} />
                </div>
              ))
            ) : (
              <div className="no-products-found">
                <i className="icon bi bi-emoji-frown"></i>
                <h3>No products found!</h3>
              </div>
            )
          ) : (
            <div aria-busy="true"></div>
          )}
          <div className="row">
            <Pagination {...paginationData} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
