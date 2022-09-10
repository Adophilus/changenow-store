import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {}
  },
  reducers: {
    add(state, action) {
      const { product } = action.payload
      const quantity = action.payload.quantity
      if (product.id in state.items) state.items[product.id] += quantity
      else state.items[product.id] = quantity
    }
  }
})

export const { add } = cartSlice.actions
export default cartSlice.reducer
