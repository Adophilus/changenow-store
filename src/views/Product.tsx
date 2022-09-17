import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import db from '../Database'
import '../assets/Loader.scss'
import '../assets/Product.scss'
import Layout from '../components/layout/Layout'
import { add as addToCart, remove as removeFromCart } from '../features/Cart'
import { add as addToFavourites, remove as removeFromFavourites } from '../features/Favourites'
import { useAppDispatch, useAppSelector } from '../hooks/Store'
import { IProduct } from '../types/Collections'

enum Errors {
  PRODUCT_NOT_FOUND = 'Product not found!'
}

interface IState {
  error: string | boolean
  loading: boolean
  product?: IProduct
  inCart: boolean
  inFavourites: boolean
}

const Product: React.FC = () => {
  const dispatch = useAppDispatch()
  const { sku } = useParams() ?? ''
  const { cart, favourites } = useAppSelector((state) => state)
  const [state, setState] = useState<IState>({
    error: false,
    loading: true,
    inCart: false,
    inFavourites: false
  })

  const toggleItemFromCart = (): void => {
    if (state.product != null && state.inCart) {
      dispatch(
        removeFromCart({ product: state.product.id, quantity: 1 })
      )
      setState({ ...state, inCart: cart.items.has(state.product.id) })
    } else {
      dispatch(addToCart({ product: state?.product?.id ?? '', quantity: 1 }))
      setState({ ...state, inCart: true })
    }
  }

  const toggleItemFromFavourites = (): void => {
    if (state.product != null && state.inFavourites) {
      removeFromFavourites({ product: state.product.id })
      setState({ ...state, inFavourites: favourites.items.has(state.product.id) })
    } else {
      addToFavourites({ product: state?.product?.id ?? '' })
      setState({ ...state, inFavourites: true })
    }
  }

  useEffect(() => {
    ;(async () => {
      const productMeta = await db.getProducts({
        options: { filter: `sku = ${sku ?? ''}`, $autoCancel: false }
      })
      if (productMeta.items.length > 0) {
        return setState({
          ...state,
          loading: false,
          error: false,
          product: productMeta.items[0],
          inCart: cart.items.has(productMeta.items[0].id)
        })
      } else {
        return setState({ ...state, loading: false, error: Errors.PRODUCT_NOT_FOUND })
      }
    })().catch(err => setState({ ...state, loading: false, error: err.message as string }))
  }, [])

  return (
    <Layout>
      {state.loading
        ? (
        <div className="loader-full-screen" aria-busy="true"></div>
          )
        : state.error === Errors.PRODUCT_NOT_FOUND
          ? (
        <div className="loader-full-screen no-products-found">
          <i className="icon bi bi-emoji-frown"></i>
          <h3>Product not found!</h3>
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
        <article>
          <div className="product-cover">
            <img src={state?.product?.image} />
          </div>
          <div>
            <h4 className="product-title">{state?.product?.title}</h4>
          </div>
          <div className="product-price">
            <h5>{state?.product?.price} XRP</h5>
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
              {state.inFavourites
                ? (
                <>
                  <i className="bi bi-suit-heart-fill"></i>&nbsp; Saved
                </>
                  )
                : (
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
              {state.inCart
                ? (
                <>
                  <i className="bi bi-cart-check"></i>&nbsp; Added
                </>
                  )
                : (
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
