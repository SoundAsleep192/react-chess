import { Board } from '../classes/board.class'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { PieceEntity } from '../types/piece.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { coordinateExists } from './coordinate-exists.util'
import { offsetCoordinate } from './offset-coordinate.util'

export function canMoveKnight(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  pieces: SetOfPieces,
  piece: PieceEntity
): boolean {
  const possibleMoves: Coordinate[] = [
    offsetCoordinate(from, 2, 1),
    offsetCoordinate(from, -2, 1),
    offsetCoordinate(from, 2, -1),
    offsetCoordinate(from, -2, -1),
    offsetCoordinate(from, 1, 2),
    offsetCoordinate(from, -1, 2),
    offsetCoordinate(from, 1, -2),
    offsetCoordinate(from, -1, -2),
  ]

  const validMoves: Coordinate[] = possibleMoves.filter((move) => {
    if (!coordinateExists(move)) {
      return false
    }

    const targetCellContent: PieceId | null = board.get(move.rank, move.file)

    if (targetCellContent === null) {
      return true
    }

    const targetPiece: PieceEntity = pieces.get(targetCellContent)!

    return targetPiece.color !== piece.color
  })

  return validMoves.some(
    (move) => move.file === to.file && move.rank === to.rank
  )
}
