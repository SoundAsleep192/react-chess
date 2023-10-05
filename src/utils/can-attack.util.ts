import { Board } from '../classes/board.class'
import { Coordinate } from '../types/coordinate.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { getMoves } from './get-moves.util'

export function canAttack(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  pieces: SetOfPieces,
  enPassant: Coordinate | null
): boolean {
  const possibleMoves: Coordinate[] = getMoves(from, board, pieces, enPassant)

  return possibleMoves.some(
    (move) => move.file === to.file && move.rank === to.rank
  )
}
