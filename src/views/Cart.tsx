import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../Database'
import '../assets/Loader.scss'
import '../assets/Product.scss'
import '../assets/Cart.scss'
import Layout from '../components/layout/Layout'
import { IProduct } from '../types/Collections'
import { useAppSelector } from '../hooks/Store'
import { ICartState } from '../features/Cart'

enum Errors {
  CART_EMPTY = 'No item in cart!'
}

interface IState {
  error: boolean | string
  loading: boolean
  products: IProduct[]
}

const ProductRow: React.FC<{ product: IProduct, cart: ICartState }> = ({ product, cart }) => {
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
        <strong>{product.price as number * (cart.items.get(product.id) ?? 0) }</strong>
      </div>
    </div>
  )
}

const Cart: React.FC = () => {
  const { cart } = useAppSelector((state) => state)
  const [state, setState] = useState<IState>({
    error: false,
    loading: true,
    products: []
  })

  useEffect(() => {
    ;(async () => {
      if (Object.keys(cart.items).length === 0) {
        return setState({ ...state, loading: false, error: Errors.CART_EMPTY })
      }

      const filter = Object.keys(cart.items)
        .map((item) => `id = '${item}'`)
        .join('||')

      const productMeta = await db.getProducts({
        options: { filter, $autoCancel: false }
      })
      return setState({
        loading: false,
        error: false,
        products: productMeta.items
      })
    })().catch(err => setState({ ...state, loading: false, error: err.message }))
  }, [])

  return (
    <Layout>
      {state.loading
        ? (
        <div className="loader-full-screen" aria-busy="true"></div>
          )
        : state.error === Errors.CART_EMPTY
          ? (
        <div className="loader-full-screen no-products-found">
          <i className="icon bi bi-bag"></i> <h3>{state.error}</h3>
          <Link to="/store">
            <i className="bi bi-chevron-left"></i>
            Back to store
          </Link>
        </div>
            )
          : state.error !== false
            ? (
        <div className="loader-full-screen no-products-found">
          <i className="bi bi-emoji-frown"></i>
          <h3>{state.error}</h3>
        </div>
              )
            : (
        <article className="cart">
          <div className="row">
            <div className="row product-row-header">
              <div className="col-lg-3">PRODUCT</div>
              <div className="col-lg-3">PRICE</div>
              <div className="col-lg-3">QTY</div>
              <div className="col-lg-3">TOTAL</div>
            </div>

            {state.products.map((product) => (
              <ProductRow key={product.id} product={product} cart={cart} />
            ))}
          </div>
        </article>
              )}
    </Layout>
  )
}

export default Cart
