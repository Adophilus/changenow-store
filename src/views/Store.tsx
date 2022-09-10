import 'bootstrap-icons/font/bootstrap-icons.css'
import '../assets/Product.scss'
import PocketBase from 'pocketbase'
import { useEffect, useState } from 'react'
import db from '../Database'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'

export default () => {
  const [products, setProducts] = useState([])

  const addItemToCart = () => {}

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts((await db.getProducts()).items)
    }
    fetchProducts()
  }, [])

  return (
    <main className="container">
      <Navbar />
      <div className="row">
        <div className="col-xs-0 col-lg-4">
          <Sidebar />
        </div>
        <div className="row col-lg-8 justify-content-center">
          {products.map((product) => (
            <div key={product.id} className="col-xs-12 col-md-6 p-2">
              <article className="product-tab">
                <div
                  className="cover-img"
                  style={{ '--background': `url('${product.image}')` }}
                >
                  <div className="cover">
                    <a
                      role="button"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()

                        addItemToCart(product)
                      }}
                      className="contrast outline"
                    >
                      View
                    </a>
                  </div>
                </div>
                <div className="content">
                  <div className="details">{product.title}</div>
                  <div className="call-to-action">
                    <a href="#" className="favourite-marker">
                      <i className="bi bi-suit-heart"></i>
                    </a>
                    <a
                      className="add-to-cart"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()

                        addItemToCart(product)
                      }}
                    >
                      <i className="bi bi-cart-plus"></i>&nbsp; Add to cart
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
