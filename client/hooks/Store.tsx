import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { IState, IDispatch } from '../features/Store'

export const useAppDispatch: () => IDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<IState> = useSelector
