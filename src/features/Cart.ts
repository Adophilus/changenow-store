import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IState } from './Store'

export interface ICartState {
  items: {
    [key: string]: number
  }
  has: (key: string) => boolean
}

interface IPayload {
  product: string
  quantity: number
}

const initialState: ICartState = {
  items: {},
  has(key) {
    return this.items[key] != null
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action: PayloadAction<IPayload>) {
      const { product } = action.payload
      const quantity = action.payload.quantity
      if (state.items[product] != null) state.items[product] += quantity
      else state.items[product] = quantity
    },
    remove(state, action: PayloadAction<IPayload>) {
      const { product } = action.payload
      const quantity = action.payload.quantity
      if (state.items[product] != null) {
        state.items[product] -= quantity
        if (state.items[product] <= 0) delete state.items[product]
      }
    }
  }
})

export const { add, remove } = cartSlice.actions
export const selectCart = (state: IState): ICartState => state.cart
export default cartSlice.reducer
