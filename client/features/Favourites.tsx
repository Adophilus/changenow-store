import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IState } from './Store'

interface IFavouritesState {
  items: {
    [key: string]: boolean
  }
  has: (key: string) => boolean
}

interface IPayload {
  product: string
}

const initialState: IFavouritesState = {
  items: {},
  has(key: string) {
    return this.items[key] != null
  }
}

const favoutitesSlice = createSlice({
  name: 'favoutites',
  initialState,
  reducers: {
    add(state, action: PayloadAction<IPayload>) {
      const { product } = action.payload
      state.items[product] = true
    },
    remove(state, action: PayloadAction<IPayload>) {
      const { product } = action.payload
      delete state.items[product]
    }
  }
})

export const { add, remove } = favoutitesSlice.actions
export const selectFavourites = (state: IState): IFavouritesState =>
  state.favourites
export default favoutitesSlice.reducer
