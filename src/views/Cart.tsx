import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import db from '../Database'
import '../assets/Loader.scss'
import '../assets/Product.scss'
import '../assets/Cart.scss'
import Layout from '../components/layout/Layout'
import { add as addToCart } from '../features/Cart'
import { remove as removeFromCart } from '../features/Cart'
import { add as addToFavourites } from '../features/Favourites'
import { remove as removeFromFavourites } from '../features/Favourites'

const CART_EMPTY = 1

const ProductRow = ({ product, cart }) => {
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
        <strong>{product.price * cart.items[product.id]}</strong>
      </div>
    </div>
  )
}

export default () => {
  const dispatch = useDispatch()
  const { cart, favourite } = useSelector((state) => state)
  const [state, setState] = useState({
    error: false,
    loading: true,
    products: []
  })

  useEffect(() => {
    ;(async () => {
      if (Object.keys(cart.items).length === 0)
        return setState({ loading: false, error: CART_EMPTY })

      const filter = Object.keys(cart.items)
        .map((item) => `id = '${item}'`)
        .join('||')

      try {
        const productMeta = await db.getProducts({
          options: { filter, $autoCancel: false }
        })
        return setState({
          loading: false,
          error: false,
          products: productMeta.items
        })
      } catch (err) {
        return setState({ loading: false, error: err.message })
      }
    })()
  }, [])

  return (
    <Layout>
      {state.loading ? (
        <div className="loader-full-screen" aria-busy="true"></div>
      ) : state.error === CART_EMPTY ? (
        <div className="loader-full-screen no-products-found">
          <i className="icon bi bi-bag"></i> <h3>No item in cart!</h3>
          <Link to="/store">
            <i className="bi bi-chevron-left"></i>
            Back to store
          </Link>
        </div>
      ) : state.error ? (
        <div className="loader-full-screen no-products-found">
          <i className="bi bi-emoji-frown"></i>
          <h3>{state.error}</h3>
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

            {state.products.map((product) => (
              <ProductRow key={product.id} product={product} cart={cart} />
            ))}
          </div>
        </article>
      )}
    </Layout>
  )
}
