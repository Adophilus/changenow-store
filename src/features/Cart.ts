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
    },
    remove(state, action) {
      const { product } = action.payload
      const quantity = action.payload.quantity
      if (!(product.id in state.items)) return
      state.items[product.id] -= quantity
      if (!state.items[product.id]) delete state.items[product.id]
    }
  }
})

export const { add, remove } = cartSlice.actions
export default cartSlice.reducer
