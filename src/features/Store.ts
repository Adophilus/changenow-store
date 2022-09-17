import { configureStore } from '@reduxjs/toolkit'
import cart from './Cart'
import favourites from './Favourites'

export const store = configureStore({
  reducer: {
    cart,
    favourites
  }
})

export type IState = ReturnType<typeof store.getState>
export type IDispatch = typeof store.dispatch

export default store
