import { Board } from '../classes/board.class'
import { PieceTypeEnum } from '../enums/piece-type.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { PieceEntity } from '../types/piece.interface'
import { SetOfPieces } from '../types/set-of-pieces'

export function checkEnPassantCapture(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  nextBoard: Board,
  pieces: SetOfPieces,
  enPassant: Coordinate | null,
  enPassantPawn: PieceId | null
): Board | null {
  if (enPassant === null || enPassantPawn === null) {
    return null
  }

  const pieceId: PieceId = board.get(from.rank, from.file)!
  const piece: PieceEntity = pieces.get(pieceId)!

  if (piece.type !== PieceTypeEnum.Pawn) {
    return null
  }

  if (to.file === enPassant.file && to.rank === enPassant.rank) {
    const capturedPawnCoordinate: Coordinate | null =
      board.getCoordinate(enPassantPawn)

    if (capturedPawnCoordinate === null) {
      return null
    }

    return nextBoard.set(
      null,
      capturedPawnCoordinate.rank,
      capturedPawnCoordinate.file
    )
  }

  return null
}
