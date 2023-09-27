import { Board } from '../classes/board.class'
import { Coordinate } from '../types/coordinate.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { getLegalMoves } from './get-legal-moves.util'

export function canMove(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  pieces: SetOfPieces,
  enPassant: Coordinate | null
): boolean {
  const legalMoves = getLegalMoves(from, board, pieces, enPassant)

  return legalMoves.some(
    (move) => move.file === to.file && move.rank === to.rank
  )
}
