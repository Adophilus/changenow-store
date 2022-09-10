import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import db from '../Database'
import '../assets/Loader.scss'
import '../assets/Product.scss'
import Layout from '../components/layout/Layout'
import { add as addToCart } from '../features/Cart'
import { remove as removeFromCart } from '../features/Cart'
import { add as addToFavourites } from '../features/Favourites'
import { remove as removeFromFavourites } from '../features/Favourites'

const CART_EMPTY = 1

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
        <article>
          {state.products.map((product) => (
            <div key={product.id}>{product.title}</div>
          ))}
        </article>
      )}
    </Layout>
  )
}
