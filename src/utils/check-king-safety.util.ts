import { Board } from '../classes/board.class'
import { PieceTypeEnum } from '../enums/piece-type.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { PieceEntity } from '../types/piece.interface'
import { SetOfPieces } from '../types/set-of-pieces'
import { canMove } from './can-move.util'

export function checkKingSafety(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  pieces: SetOfPieces
): boolean {
  const pieceId: PieceId = board.get(from.rank, from.file)!
  const piece: PieceEntity = pieces.get(pieceId)!

  const nextBoard: Board = board
    .set(null, from.rank, from.file)
    .set(pieceId, to.rank, to.file)

  const kingId: PieceId = [...pieces.entries()].find(
    ([_, pieceEntity]) =>
      pieceEntity.color === piece.color &&
      pieceEntity.type === PieceTypeEnum.King
  )![0]

  const kingCoordinates: Coordinate | null = nextBoard.getCoordinate(kingId)

  if (kingCoordinates === null) {
    return false
  }

  const opponentsPieceCoordinates: Coordinate[] = nextBoard.content
    .flat()
    .filter((cell): cell is PieceId => cell !== null)
    .filter((id) => {
      const pieceOnBoard: PieceEntity = pieces.get(id)!
      return pieceOnBoard.color !== piece.color
    })
    .map((id) => nextBoard.getCoordinate(id))
    .filter((coordinate): coordinate is Coordinate => coordinate !== null)

  return !opponentsPieceCoordinates.some((from) =>
    canMove(from, kingCoordinates, nextBoard, pieces, null)
  )
}
