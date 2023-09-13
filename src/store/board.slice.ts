import { StateCreator } from 'zustand'
import { Board } from '../classes/board.class'
import { ColorEnum } from '../enums/color.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { type StoreState } from './state.type'

export interface BoardSlice {
  board: Board
  selected: Coordinate | null
  turn: ColorEnum
  select: (coordinate: Coordinate) => void
  deselect: () => void
  move: (from: Coordinate, to: Coordinate) => void
}

export const createBoardSlice: StateCreator<StoreState, [], [], BoardSlice> = (
  set
) => ({
  board: new Board(),
  selected: null,
  turn: ColorEnum.White,
  select: (coordinate) => {
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

      const nextTurn =
        state.turn === ColorEnum.White ? ColorEnum.Black : ColorEnum.White

      return { board: nextBoard, selected: null, turn: nextTurn }
    })
  },
})