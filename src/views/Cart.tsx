import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/Loader.scss'
import '../assets/Product.scss'
import '../assets/Cart.scss'
import Layout from '../components/layout/Layout'
import { IProduct } from '../types/Collections'
import { useAppSelector } from '../hooks/Store'
import { ICartState } from '../features/Cart'
import { useGetProductsByIdsQuery } from '../services/Backend'

const ProductRow: React.FC<{ product: IProduct; cart: ICartState }> = ({
  product,
  cart
}) => {
  console.log(product)
  return (
    <div className="row product-row">
      <div className="col-lg-3">
        <div className="cover">
          <img src={product.image} />
          <small>
            <small>{product.title}</small>
          </small>
          <small>
            <small>
              <small>#{product.sku}</small>
            </small>
          </small>
          <small>
            <small>
              <small>Color: {product.color}</small>
            </small>
          </small>
        </div>
      </div>
      <div className="col-lg-3">
        <strong>{product.price} XRP</strong>
      </div>
      <div className="col-lg-3">- 1 +</div>
      <div className="col-lg-3">
        <strong>
          {(product.price as number) * (cart.items[product.id] ?? 0)}
        </strong>
      </div>
    </div>
  )
}

const Cart: React.FC = () => {
  const cart = useAppSelector((state) => state.cart)
  const {
    error,
    isLoading,
    data: products
  } = useGetProductsByIdsQuery(Object.keys(cart.items))

  return (
    <Layout>
      {isLoading ? (
        <div className="loader-full-screen" aria-busy="true"></div>
      ) : error != null ? (
        <div className="loader-full-screen no-products-found">
          <i className="bi bi-emoji-frown"></i>
          <h3>An error occurred!</h3>
        </div>
      ) : (
        <article className="cart">
          <div className="row">
            <div className="row product-row-header">
              <div className="col-lg-3">PRODUCT</div>
              <div className="col-lg-3">PRICE</div>
              <div className="col-lg-3">QTY</div>
              <div className="col-lg-3">TOTAL</div>
            </div>

            {products.map((product) => (
              <ProductRow key={product.id} product={product} cart={cart} />
            ))}
          </div>
        </article>
      )}
    </Layout>
  )
}

export default Cart
