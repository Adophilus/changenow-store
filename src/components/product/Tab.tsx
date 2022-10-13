import { Link } from 'react-router-dom'
import '../../assets/Product.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { add as addToCart, remove as removeFromCart } from '../../features/Cart'
import React from 'react'
import { IProduct } from '../../types/Collections'
import { useAppDispatch, useAppSelector } from '../../hooks/Store'

interface Props {
  product: IProduct
}

const ProductTab: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch()
  const { inCart, cart } = useAppSelector(({ cart }) => {
    return { inCart: cart.has(product.id), cart }
  })

  const addItemToFavourites = (): void => {}
  const addItemToCart = (): void => {
    dispatch(
      addToCart({ product: product.id, price: product.price, quantity: 1 })
    )
  }
  const removeItemFromCart = (): void => {
    dispatch(
      removeFromCart({
        product: product.id,
        quantity: cart.items[product.id].quantity
      })
    )
  }

  const productTabStyle: React.CSSProperties = {
    ['--background' as any]: `url('${product.image}')`
  }
  return (
    <article className="product-tab">
      <div className="cover-img" style={productTabStyle}>
        <div className="cover">
          <Link
            role="button"
            to={`/store/products/${product.sku}`}
            className="contrast outline"
          >
            View
          </Link>
        </div>
      </div>
      <div className="content">
        <div className="details">
          {product.title}
          <br />
          <strong>{product.price} XRP</strong>
        </div>
        <div className="call-to-action">
          <a
            href="#!"
            onClick={() => {
              addItemToFavourites()
            }}
            className="favourite-marker"
          >
            <i className="bi bi-suit-heart"></i>
          </a>
          <a
            className="add-to-cart"
            href="#!"
            onClick={() => {
              if (inCart) return removeItemFromCart()
              addItemToCart()
            }}
          >
            {inCart ? (
              <>
                <i className="bi bi-trash-fill"></i>&nbsp; Remove
              </>
            ) : (
              <>
                <i className="bi bi-cart-plus"></i>&nbsp; Add to cart
              </>
            )}
          </a>
        </div>
      </div>
    </article>
  )
}

export default ProductTab
