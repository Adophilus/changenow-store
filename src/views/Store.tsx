import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Sidebar from '../components/layout/Sidebar'
import Pagination from '../components/Pagination'
import ProductTab from '../components/ProductTab'
import useFilter from '../hooks/Filter'
import { ISubCategory, ICategory, IProduct } from '../types/Collections'
import { useGetProductsQuery } from '../services/Backend'

const Store: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') ?? '1')
  const filter = useFilter(['category', 'subCategory'])
  const { data: productsMeta, error: productsError, isLoading: productsLoading } = useGetProductsQuery({ page, perPage: 10, filter: filter.getAll().join('&&') })

  const onPageChange = (page: string | number): void => {
    if (productsMeta == null) return
    setSearchParams({ page: page.toString() })
  }

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
          {(productsLoading)
            ? (
            <div aria-busy="true"></div>)
            : (productsError != null)
                ? (
                <div>Couldn&apos;t load products!</div>)
                : productsMeta?.items.length === 0
                  ? (
              <div className="no-products-found">
                <i className="icon bi bi-emoji-frown"></i>
                <h3>No products found!</h3>
              </div>)
                  : (
                      productsMeta?.items.map((product) => (
                <div key={product.id} className="col-xs-12 col-md-6">
                  <ProductTab product={product as IProduct} />
                </div>
                      ))
                    )
              }
          <div className="row">
            <Pagination totalCount={productsMeta?.totalItems} currentPage={productsMeta?.page} pageSize={productsMeta?.perPage} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Store
