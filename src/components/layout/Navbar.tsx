import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../assets/Navbar.scss'
import '../../assets/Cart.scss'
import React from 'react'
import { selectCart } from '../../features/Cart'

const Navbar: React.FC = () => {
  const cart = useSelector(selectCart)

  return (
    <article className="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img className="logo" src="/logo-black.png" />
            </Link>
          </li>
        </ul>
        <ul>
          <li>Home</li>
          <li>
            <Link to="/store">Store</Link>
          </li>
          <li>About</li>
          <li>
            <Link
              className={`cart-indicator ${
                (Object.keys(cart.items).length > 0) ? 'not-empty' : ''
              }`}
              to="/cart"
            >
              {(Object.keys(cart.items).length > 0)
                ? (
                <i className="bi bi-bag-check"></i>
                  )
                : (
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
