import React from 'react'
import { useParams, Link } from 'react-router-dom'
import '../assets/Loader.scss'
import '../assets/Product.scss'
import Layout from '../components/layout/Layout'
import { add as addToCart, remove as removeFromCart } from '../features/Cart'
import {
  add as addToFavourites,
  remove as removeFromFavourites
} from '../features/Favourites'
import { useGetProductQuery } from '../services/Backend'
import { useAppDispatch, useAppSelector } from '../hooks/Store'

const Product: React.FC = () => {
  const dispatch = useAppDispatch()
  const { sku } = useParams()
  const {
    data: product,
    error,
    isLoading
  } = useGetProductQuery({ sku: parseInt(sku) })
  const { inCart, inFavourites } = useAppSelector((state) => {
    return {
      inCart: state.cart.has(product?.id),
      inFavourites: state.favourites.has(product?.id)
    }
  })

  const toggleItemFromCart = (): void => {
    if (product == null) return

    if (inCart) {
      dispatch(removeFromCart({ product: product.id, quantity: 1 }))
    } else {
      dispatch(addToCart({ product: product.id, quantity: 1 }))
    }
  }

  const toggleItemFromFavourites = (): void => {
    if (product == null) return

    if (inFavourites) {
      dispatch(removeFromFavourites({ product: product.id }))
    } else {
      dispatch(addToFavourites({ product: product.id }))
    }
  }

  return (
    <Layout>
      {isLoading ? (
        <div className="loader-full-screen" aria-busy="true"></div>
      ) : error != null ? (
        <div className="loader-full-screen no-products-found">
          <i className="icon bi bi-emoji-frown"></i>
          <h3>Product not found!</h3>
          <Link to="/store">
            <i className="bi bi-chevron-left"></i>
            Back to store
          </Link>
        </div>
      ) : (
        <article>
          <div className="product-cover">
            <img src={product.image} />
          </div>
          <div>
            <h4 className="product-title">{product.title}</h4>
          </div>
          <div className="product-price">
            <h5>{product.price} XRP</h5>
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
              {inFavourites ? (
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
              className={`${inCart ? 'outline' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                toggleItemFromCart()
              }}
              href="#"
            >
              {inCart ? (
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

export default Product
