import { configureStore } from '@reduxjs/toolkit'
import cart from './Cart'
import favourites from './Favourites'

export default configureStore({
  reducer: {
    cart,
    favourites
  }
})
