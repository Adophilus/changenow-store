import './assets/App.scss'
import './assets/Product.scss'
import './assets/Sidebar.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import PocketBase from 'pocketbase'
import { useEffect, useState } from 'react'
import db from './Database'

function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      setProducts((await db.getProducts()).items)
    }
    fetchProducts()
  }, [])

  return (
    <main className="container">
      <div className="row">
        <div className="col-xs-0 col-lg-4">
          <aside className="sidebar">
            <article>Sidebar</article>
          </aside>
        </div>
        <div className="row col-lg-8 justify-content-center">
          {products.map((product) => (
            <div className="col-xs-12 col-md-6 p-2">
              <article key={product.id} className="product-tab">
                <div
                  className="cover-img"
                  style={{ '--background': `url('${product.image}')` }}
                >
                  <div className="cover">
                    <a role="button" href="#" className="contrast outline">
                      View
                    </a>
                  </div>
                </div>
                <div className="content">
                  <div className="details">{product.title}</div>
                  <div className="call-to-action">
                    <a className="add-to-cart" href="#">
                      <i class="bi bi-cart-plus"></i>&nbsp; Add to cart
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

export default App
