import { Board } from '../classes/board.class'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { PieceEntity } from '../types/piece.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { coordinateExists } from './coordinate-exists.util'
import { offsetCoordinate } from './offset-coordinate.util'

export function getLegalMovesKing(
  from: Coordinate,
  board: Board,
  pieces: SetOfPieces,
  king: PieceEntity
): Coordinate[] {
  const possibleMoves: Coordinate[] = [
    offsetCoordinate(from, 1, 1),
    offsetCoordinate(from, -1, 1),
    offsetCoordinate(from, 1, -1),
    offsetCoordinate(from, -1, -1),
    offsetCoordinate(from, 0, 1),
    offsetCoordinate(from, 0, -1),
    offsetCoordinate(from, 1, 0),
    offsetCoordinate(from, -1, 0),
  ]

  const legalMoves: Coordinate[] = possibleMoves.filter((move) => {
    if (!coordinateExists(move)) {
      return false
    }

    const targetCellContent: PieceId | null = board.get(move.rank, move.file)

    if (targetCellContent === null) {
      return true
    }

    const targetPiece: PieceEntity = pieces.get(targetCellContent)!

    return targetPiece.color !== king.color
  })

  return legalMoves
}
