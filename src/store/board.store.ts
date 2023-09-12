import { create } from 'zustand'
import { Board } from '../classes/board.class'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'

type BoardStore = {
  board: Board
  selected: Coordinate | null
  select: (coordinate: Coordinate) => void
  deselect: () => void
  move: (from: Coordinate, to: Coordinate) => void
}

export const useBoardStore = create<BoardStore>((set) => ({
  board: new Board(),
  selected: null,
  select: (coordinate: Coordinate) => {
    set(() => ({ selected: coordinate }))
  },
  deselect: () => {
    set(() => ({ selected: null }))
  },
  move: (from, to) => {
    set((state) => {
      const pieceId: PieceId | null = state.board.get(from.rank, from.file)

      if (pieceId === null) {
        return state
      }

      const nextBoard: Board = state.board
        .set(null, from.rank, from.file)
        .set(pieceId, to.rank, to.file)

      return { board: nextBoard, selected: null }
    })
  },
}))
