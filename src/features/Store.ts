import { configureStore } from '@reduxjs/toolkit'
import cart from './Cart'
import favourites from './Favourites'
import backendApi from '../services/Backend'

export const store = configureStore({
  reducer: {
    cart,
    favourites,
    [backendApi.reducerPath]: backendApi.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(backendApi.middleware)
  }
})

export type IState = ReturnType<typeof store.getState>
export type IDispatch = typeof store.dispatch

export default store
