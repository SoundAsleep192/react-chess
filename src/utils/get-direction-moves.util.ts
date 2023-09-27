import { Board } from '../classes/board.class'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { PieceEntity } from '../types/piece.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { coordinateExists } from './coordinate-exists.util'
import { offsetCoordinate } from './offset-coordinate.util'

export function getDirectionMoves(
  from: Coordinate,
  piece: PieceEntity,
  board: Board,
  pieces: SetOfPieces,
  xDirection: 0 | 1 | -1,
  yDirection: 0 | 1 | -1
): Coordinate[] {
  const legalMoves: Coordinate[] = []

  let currentMove: Coordinate = offsetCoordinate(from, xDirection, yDirection)

  while (coordinateExists(currentMove)) {
    const currentCell: PieceId | null = board.get(
      currentMove.rank,
      currentMove.file
    )

    if (currentCell !== null) {
      const targetPiece: PieceEntity = pieces.get(currentCell)!

      if (targetPiece.color !== piece.color) {
        legalMoves.push(currentMove)
      }

      break
    }

    legalMoves.push(currentMove)
    currentMove = offsetCoordinate(currentMove, xDirection, yDirection)
  }

  return legalMoves
}
