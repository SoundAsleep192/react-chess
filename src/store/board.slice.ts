import { StateCreator } from 'zustand'
import { Board } from '../classes/board.class'
import { ColorEnum } from '../enums/color.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { canMove } from '../utils/can-move.util'
import { checkEnPassantCapture } from '../utils/check-en-passant-capture.util'
import { checkEnPassant } from '../utils/check-en-passant.util'
import { checkKingSafety } from '../utils/check-king-safety.util'
import { getValidMoves } from '../utils/get-valid-moves.util'
import { type StoreState } from './state.type'

export interface BoardSlice {
  board: Board
  selected: Coordinate | null
  validMoves: Coordinate[]
  lastFrom: Coordinate | null
  lastTo: Coordinate | null
  turn: ColorEnum
  enPassant: Coordinate | null
  enPassantPawn: PieceId | null
  select: (coordinate: Coordinate) => void
  deselect: () => void
  move: (from: Coordinate, to: Coordinate) => void
}

export const createBoardSlice: StateCreator<StoreState, [], [], BoardSlice> = (
  set
) => ({
  board: new Board(),
  selected: null,
  validMoves: [],
  lastFrom: null,
  lastTo: null,
  turn: ColorEnum.White,
  enPassant: null,
  enPassantPawn: null,
  select: (coordinate) => {
    set((state) => {
      const validMoves = getValidMoves(
        coordinate,
        state.board,
        state.pieces,
        state.enPassant
      )

      return { selected: coordinate, validMoves }
    })
  },
  deselect: () => {
    set(() => ({ selected: null, validMoves: [] }))
  },
  move: (from, to) => {
    set((state) => {
      const pieceId: PieceId | null = state.board.get(from.rank, from.file)

      if (pieceId === null) {
        return state
      }

      if (
        !canMove(from, to, state.board, state.pieces, state.enPassant) ||
        !checkKingSafety(from, to, state.board, state.pieces)
      ) {
        return { selected: null, validMoves: [] }
      }

      const nextBoard: Board = state.board
        .set(null, from.rank, from.file)
        .set(pieceId, to.rank, to.file)

      const nextTurn =
        state.turn === ColorEnum.White ? ColorEnum.Black : ColorEnum.White

      const enPassantCaptureBoard: Board | null = checkEnPassantCapture(
        from,
        to,
        state.board,
        nextBoard,
        state.pieces,
        state.enPassant,
        state.enPassantPawn
      )

      const enPassant: Coordinate | null = checkEnPassant(
        from,
        to,
        state.board,
        state.pieces
      )

      return {
        board: enPassantCaptureBoard ?? nextBoard,
        selected: null,
        validMoves: [],
        lastFrom: from,
        lastTo: to,
        turn: nextTurn,
        enPassant,
        enPassantPawn: enPassant ? pieceId : null,
      }
    })
  },
})
