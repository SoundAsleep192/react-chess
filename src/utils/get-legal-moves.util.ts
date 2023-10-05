import { Board } from '../classes/board.class'
import { Coordinate } from '../types/coordinate.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { checkKingSafety } from './check-king-safety.util'
import { getMoves } from './get-moves.util'

export function getLegalMoves(
  from: Coordinate | null,
  board: Board,
  pieces: SetOfPieces,
  enPassant: Coordinate | null
): Coordinate[] {
  if (from === null) {
    return []
  }

  const moves: Coordinate[] = getMoves(from, board, pieces, enPassant)

  return moves.filter((move) => checkKingSafety(from, move, board, pieces))
}
