import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IState } from './Store'

interface IFavouritesState {
  items: Map<string, boolean>
}

interface IPayload {
  product: string
}

const initialState: IFavouritesState = {
  items: new Map<string, boolean>()
}

const favoutitesSlice = createSlice({
  name: 'favoutites',
  initialState,
  reducers: {
    add (state, action: PayloadAction<IPayload>) {
      const { product } = action.payload
      state.items.set(product, true)
    },
    remove (state, action: PayloadAction<IPayload>) {
      const { product } = action.payload
      if (state.items.has(product)) state.items.delete(product)
    }
  }
})

export const { add, remove } = favoutitesSlice.actions
export const selectFavourites = (state: IState): IFavouritesState => state.favourites
export default favoutitesSlice.reducer
