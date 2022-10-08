import './assets/App.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './features/Store'
import HomeView from './views/Home'
import CartView from './views/Cart'
import TestView from './views/Test'
import StoreView from './views/Store'
import StoreProductView from './views/Product'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/test" element={<TestView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/store" element={<StoreView />} />
          <Route path="/store/products/:sku" element={<StoreProductView />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
