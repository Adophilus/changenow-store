import './assets/App.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './features/Store'
import CartView from './views/Cart'
import StoreView from './views/Store'
import StoreProductView from './views/Product'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/cart" element={<CartView />} />
          <Route path="/store" element={<StoreView />} />
          <Route path="/store/products/:sku" element={<StoreProductView />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
