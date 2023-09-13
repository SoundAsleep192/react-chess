import { type BoardSlice } from './board.slice'
import { type PiecesSlice } from './pieces.slice'

export type StoreState = BoardSlice & PiecesSlice
