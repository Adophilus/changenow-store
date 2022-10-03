import { Link } from 'react-router-dom'
import '../assets/Product.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { add as addToCart } from '../features/Cart'
import React from 'react'
import { IProduct } from '../types/Collections'
import { useAppDispatch } from '../hooks/Store'

interface Props {
  product: IProduct
}

const ProductTab: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch()

  const addItemToFavourites = (): void => {}
  const addItemToCart = (): void => {
    dispatch(addToCart({ product: product.id, quantity: 1 }))
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
            href="#"
            onClick={(e) => {
              e.preventDefault()

              addItemToFavourites()
            }}
            className="favourite-marker"
          >
            <i className="bi bi-suit-heart"></i>
          </a>
          <a
            className="add-to-cart"
            href="#"
            onClick={(e) => {
              e.preventDefault()

              addItemToCart()
            }}
          >
            <i className="bi bi-cart-plus"></i>&nbsp; Add to cart
          </a>
        </div>
      </div>
    </article>
  )
}

export default ProductTab
