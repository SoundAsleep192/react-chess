import { create } from 'zustand'
import { Board } from '../classes/board.class'
import { ColorEnum } from '../enums/color.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'

type BoardState = {
  board: Board
  selected: Coordinate | null
  turn: ColorEnum
}

export const useBoardStore = create<BoardState>(() => ({
  board: new Board(),
  selected: null,
  turn: ColorEnum.White,
}))

export const select = (coordinate: Coordinate) => {
  useBoardStore.setState(() => ({ selected: coordinate }))
}
export const deselect = () => {
  useBoardStore.setState(() => ({ selected: null }))
}

export const move = (from: Coordinate, to: Coordinate) => {
  useBoardStore.setState((state) => {
    const pieceId: PieceId | null = state.board.get(from.rank, from.file)

    if (pieceId === null) {
      return state
    }

    const nextBoard: Board = state.board
      .set(null, from.rank, from.file)
      .set(pieceId, to.rank, to.file)

    const nextTurn =
      state.turn === ColorEnum.White ? ColorEnum.Black : ColorEnum.White

    console.log({ nextTurn })

    return { board: nextBoard, selected: null, turn: nextTurn }
  })
}
