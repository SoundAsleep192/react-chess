import { Board } from '../classes/board.class'
import { Coordinate } from '../types/coordinate.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { getValidMoves } from './get-valid-moves.util'

export function canMove(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  pieces: SetOfPieces,
  enPassant: Coordinate | null
): boolean {
  const validMoves = getValidMoves(from, board, pieces, enPassant)

  return validMoves.some(
    (move) => move.file === to.file && move.rank === to.rank
  )
}
