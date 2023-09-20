import { Board } from '../classes/board.class'
import { Coordinate } from '../types/coordinate.interface'
import { PieceEntity } from '../types/piece.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { getDirectionMoves } from './get-direction-moves.util'

export function canMoveRook(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  pieces: SetOfPieces,
  rook: PieceEntity
): boolean {
  const validMoves: Coordinate[] = [
    ...getDirectionMoves(from, rook, board, pieces, 0, 1),
    ...getDirectionMoves(from, rook, board, pieces, 0, -1),
    ...getDirectionMoves(from, rook, board, pieces, 1, 0),
    ...getDirectionMoves(from, rook, board, pieces, -1, 0),
  ]

  return validMoves.some(
    (move) => move.file === to.file && move.rank === to.rank
  )
}
