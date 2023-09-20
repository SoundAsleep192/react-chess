import { Board } from '../classes/board.class'
import { Coordinate } from '../types/coordinate.interface'
import { PieceEntity } from '../types/piece.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { getDirectionMoves } from './get-direction-moves.util'

export function canMoveBishop(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  pieces: SetOfPieces,
  bishop: PieceEntity
): boolean {
  const validMoves: Coordinate[] = [
    ...getDirectionMoves(from, bishop, board, pieces, 1, 1),
    ...getDirectionMoves(from, bishop, board, pieces, -1, 1),
    ...getDirectionMoves(from, bishop, board, pieces, 1, -1),
    ...getDirectionMoves(from, bishop, board, pieces, -1, -1),
  ]

  return validMoves.some(
    (move) => move.file === to.file && move.rank === to.rank
  )
}
