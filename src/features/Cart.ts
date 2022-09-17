import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IState } from './Store'

export interface ICartState {
  items: Map<string, number>
}

interface IPayload {
  product: string
  quantity: number
}

const initialState: ICartState = {
  items: new Map<string, number>()
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add (state, action: PayloadAction<IPayload>) {
      const { product } = action.payload
      const quantity = action.payload.quantity
      if (state.items.has(product)) state.items.set(product, state.items.get(product) as number + quantity)
      else state.items.set(product, quantity)
    },
    remove (state, action: PayloadAction<IPayload>) {
      const { product } = action.payload
      const quantity = action.payload.quantity
      if (state.items.has(product)) state.items.set(product, state.items.get(product) as number - quantity)
      if (state.items.get(product) as number <= 0) state.items.delete(product)
    }
  }
})

export const { add, remove } = cartSlice.actions
export const selectCart = (state: IState): ICartState => state.cart
export default cartSlice.reducer
