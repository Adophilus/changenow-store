import { configureStore } from '@reduxjs/toolkit'
import cart from './Cart'

export default configureStore({
  reducer: {
    cart
  }
})
