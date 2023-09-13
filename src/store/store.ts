import { create } from 'zustand'
import { createBoardSlice } from './board.slice'
import { createPiecesSlice } from './pieces.slice'
import { type StoreState } from './state.type'

export const useChessStore = create<StoreState>((...args) => ({
  ...createBoardSlice(...args),
  ...createPiecesSlice(...args),
}))
