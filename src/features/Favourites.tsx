import { createSlice } from '@reduxjs/toolkit'

const favoutitesSlice = createSlice({
  name: 'favoutites',
  initialState: {
    items: {}
  },
  reducers: {
    add(state, action) {
      const { product } = action.payload
      if (!(product.id in state.items)) state.items[product.id] = true
    },
    remove(state, action) {
      const { product } = action.payload
      if (product.id in state.items) delete state.items[product.id]
    }
  }
})

export const { add, remove } = favoutitesSlice.actions
export default favoutitesSlice.reducer
