import './assets/App.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './features/Store'
import StoreView from './views/Store'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/store" element={<StoreView />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
