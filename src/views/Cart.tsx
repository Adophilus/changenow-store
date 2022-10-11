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
import { useAppDispatch } from '../hooks/Store'
import { add as addToCart, remove as removeFromCart } from '../features/Cart'

const ProductRow: React.FC<{ product: IProduct; cart: ICartState }> = ({
  product,
  cart
}) => {
  const dispatch = useAppDispatch()

  const decreaseProduct = () => {
    dispatch(removeFromCart({ product: product.id, quantity: 1 }))
  }

  const increaseProduct = () => {
    dispatch(addToCart({ product: product.id, quantity: 1 }))
  }

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
      <div className="col-lg-3 product-qty">
        <a href="#!" onClick={() => decreaseProduct()}>
          -
        </a>
        {cart.items[product.id]}
        <a href="#!" onClick={() => increaseProduct()}>
          +
        </a>
      </div>
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
      <div className="cart">
        {isLoading ? (
          <div className="loader-full-screen" aria-busy="true"></div>
        ) : error != null ? (
          <div className="loader-full-screen no-products-found">
            <i className="bi bi-emoji-frown"></i>
            <h3>An error occurred!</h3>
          </div>
        ) : products.length === 0 ? (
          <article>
            <div className="loader-full-screen no-products-found">
              <i className="icon bi bi-bag"></i> <h3>No items in Cart!</h3>
              <Link to="/store">
                <i className="bi bi-chevron-left"></i>
                Back to store
              </Link>
            </div>
          </article>
        ) : (
          <>
            <article>
              <div className="row">
                <div className="row product-row-header">
                  <div className="col-lg-3">PRODUCT</div>
                  <div className="col-lg-3">PRICE</div>
                  <div className="col-lg-3">QTY</div>
                  <div className="col-lg-3">TOTAL</div>
                </div>
              </div>
            </article>
            <article>
              {products.map((product) => (
                <ProductRow key={product.id} product={product} cart={cart} />
              ))}
            </article>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Cart
