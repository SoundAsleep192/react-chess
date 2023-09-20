import { Board } from '../classes/board.class'
import { ColorEnum } from '../enums/color.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { PieceEntity } from '../types/piece.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { coordinateExists } from './coordinate-exists.util'
import { offsetCoordinate } from './offset-coordinate.util'

/* TODO: En passant */
export function canMovePawn(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  pieces: SetOfPieces,
  pawn: PieceEntity
): boolean {
  const vector: number = pawn.color === ColorEnum.White ? 1 : -1

  const validMoves: Coordinate[] = []

  const advanceMove: Coordinate = offsetCoordinate(from, 0, vector)
  const advanceCell: PieceId | null = board.get(
    advanceMove.rank,
    advanceMove.file
  )
  if (coordinateExists(advanceMove) && advanceCell === null) {
    validMoves.push(advanceMove)
  }

  const longAdvanceMove: Coordinate = offsetCoordinate(from, 0, vector * 2)
  const longAdvanceCell: PieceId | null = board.get(
    longAdvanceMove.rank,
    longAdvanceMove.file
  )
  const startingRank: number = pawn.color === ColorEnum.White ? 2 : 7
  if (
    from.rank === startingRank &&
    coordinateExists(advanceMove) &&
    coordinateExists(longAdvanceMove) &&
    advanceCell === null &&
    longAdvanceCell === null
  ) {
    validMoves.push(longAdvanceMove)
  }

  const captureMoves: Coordinate[] = [
    offsetCoordinate(from, -1, vector),
    offsetCoordinate(from, 1, vector),
  ]

  captureMoves.forEach((move, moveIndex) => {
    if (!coordinateExists(move)) {
      return
    }

    const cell: PieceId | null = board.get(move.rank, move.file)

    if (cell === null || pieces.get(cell)!.color === pawn.color) {
      return
    }

    validMoves.push(captureMoves[moveIndex])
  })

  console.log(validMoves)

  return validMoves.some(
    (move) => move.file === to.file && move.rank === to.rank
  )
}
