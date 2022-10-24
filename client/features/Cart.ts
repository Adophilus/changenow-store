import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IState } from './Store'

export interface ICartState {
  items: {
    [key: string]: { quantity: number; price: number }
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
    add(state, action: PayloadAction<IPayload & { price: number }>) {
      const { product, price, quantity } = action.payload
      if (state.items[product] != null)
        state.items[product].quantity += quantity
      else state.items[product] = { quantity, price }
    },
    remove(state, action: PayloadAction<IPayload>) {
      const { product, quantity } = action.payload
      if (state.items[product] != null) {
        state.items[product].quantity -= quantity
        if (state.items[product].quantity <= 0) delete state.items[product]
      }
    }
  }
})

export const { add, remove } = cartSlice.actions
export const selectCart = (state: IState): ICartState => state.cart
export default cartSlice.reducer
