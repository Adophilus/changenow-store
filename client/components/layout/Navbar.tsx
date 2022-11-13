import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '@/client/assets/Navbar.scss'
import '@/client/assets/Cart.scss'
import React from 'react'
import { selectCart } from '@/client/assets/features/Cart'
import { LogoBlackImage } from '@/client/assets/logo-black.png'

const Navbar: React.FC = () => {
  const cart = useSelector(selectCart)

  return (
    <article className="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img className="logo" src={LogoBlackImage} />
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/store">Store</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link
              className={`cart-indicator ${
                Object.keys(cart.items).length > 0 ? 'not-empty' : ''
              }`}
              to="/cart"
            >
              {Object.keys(cart.items).length > 0 ? (
                <i className="bi bi-bag-check"></i>
              ) : (
                <i className="bi bi-bag-dash"></i>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  )
}

export default Navbar
