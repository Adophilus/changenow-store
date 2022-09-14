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

const PRODUCT_NOT_FOUND = 1

export default () => {
  const dispatch = useDispatch()
  const { sku } = useParams()
  const { cart, favourites } = useSelector((state) => state)
  const [state, setState] = useState({
    error: false,
    loading: true,
    product: null,
    inCart: false,
    inFavourites: false
  })

  const toggleItemFromCart = () => {
    if (state.inCart) {
      dispatch(
        removeFromCart({ product: { id: state.product.id }, quantity: 1 })
      )
      setState({ ...state, inCart: !!cart.items[state.product.id] })
    } else {
      dispatch(addToCart({ product: { id: state.product.id }, quantity: 1 }))
      setState({ ...state, inCart: true })
    }
  }

  const toggleItemFromFavourites = () => {
    if (state.inFavourites) {
      removeFromFavourites({ product: { id: state.product.id } })
      setState({ ...state, inFavourites: !!favourites.items[state.product.id] })
    } else {
      addToFavourites({ product: { id: state.product.id } })
      setState({ ...state, inFavourites: true })
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const productMeta = await db.getProducts({
          options: { filter: `sku = ${sku}`, $autoCancel: false }
        })
        if (productMeta.items.length) {
          return setState({
            loading: false,
            error: false,
            product: productMeta.items[0],
            inCart: productMeta.items[0].id in cart.items
          })
        } else {
          return setState({ loading: false, error: PRODUCT_NOT_FOUND })
        }
      } catch (err) {
        return setState({ loading: false, error: err.message })
      }
    })()
  }, [])

  return (
    <Layout>
      {state.loading ? (
        <div className="loader-full-screen" aria-busy="true"></div>
      ) : state.error === PRODUCT_NOT_FOUND ? (
        <div className="loader-full-screen no-products-found">
          <i className="icon bi bi-emoji-frown"></i>
          <h3>Product not found!</h3>
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
          <div className="product-cover">
            <img src={state.product.image} />
          </div>
          <div>
            <h4 className="product-title">{state.product.title}</h4>
          </div>
          <div className="product-price">
            <h5>{state.product.price} XRP</h5>
          </div>
          <div className="product-btns">
            <a
              role="button"
              className="contrast"
              onClick={(e) => {
                e.preventDefault()
                toggleItemFromFavourites()
              }}
              href="#"
            >
              {state.inFavourites ? (
                <>
                  <i className="bi bi-suit-heart-fill"></i>&nbsp; Saved
                </>
              ) : (
                <>
                  <i className="bi bi-suit-heart"></i>&nbsp; Save
                </>
              )}
            </a>
            <a
              role="button"
              className={`${state.inCart ? 'outline' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                toggleItemFromCart()
              }}
              href="#"
            >
              {state.inCart ? (
                <>
                  <i className="bi bi-cart-check"></i>&nbsp; Added
                </>
              ) : (
                <>
                  <i className="bi bi-cart-plus"></i>&nbsp; Add
                </>
              )}
            </a>
          </div>
        </article>
      )}
    </Layout>
  )
}
