import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    add(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload.item.id
      )
      const quantity = action.payload.quantity || 1
      if (item) item.quantity += quantity
      else state.items.push({ id: action.payload.item.id, quantity })
    }
  }
})

export const { add } = cartSlice.actions
export default cartSlice.reducer
