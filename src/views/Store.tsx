import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import db from '../Database'
import Layout from '../components/layout/Layout'
import Sidebar from '../components/layout/Sidebar'
import Pagination from '../components/Pagination'
import ProductTab from '../components/ProductTab'
import useFilter from '../hooks/Filter'
import { ISubCategory, ICategory, IProduct } from '../types/Collections'

const Store: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>()
  const [paginationData, setPaginationData] = useState({
    totalCount: 1,
    pageSize: 1,
    currentPage: 1
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = useFilter(['category', 'subCategory'])

  const onPageChange = (page: string | number): void => {
    setSearchParams({ page: page.toString() })
  }

  const fetchProducts = async (): Promise<void> => {
    const page = searchParams.get('page') ?? '1'
    const _filter = filter.getAll()
    const productMeta = await db.getProducts({
      page: parseInt(page),
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
    fetchProducts().catch(err => console.log(err))
  }, [searchParams, filter.state])

  useEffect(() => {
    fetchProducts().catch(err => console.log(err))
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
          {(products != null)
            ? (
                (products.length > 0)
                  ? (
                      products.map((product) => (
                <div key={product.id} className="col-xs-12 col-md-6">
                  <ProductTab product={product} />
                </div>
                      ))
                    )
                  : (
              <div className="no-products-found">
                <i className="icon bi bi-emoji-frown"></i>
                <h3>No products found!</h3>
              </div>
                    )
              )
            : (
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

export default Store
