import { Link } from 'react-router-dom'
import '../assets/Product.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useDispatch } from 'react-redux'
import { add as addToCart } from '../features/Cart'

export default ({ product }) => {
  const dispatch = useDispatch()

  const addItemToFavourites = () => {}
  const addItemToCart = () => {
    dispatch(addToCart({ product: { id: product.id }, quantity: 1 }))
  }

  return (
    <article className="product-tab">
      <div
        className="cover-img"
        style={{ '--background': `url('${product.image}')` }}
      >
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
        <div className="details">{product.title}</div>
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
