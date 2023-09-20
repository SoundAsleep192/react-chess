import { Board } from '../classes/board.class'
import { PieceTypeEnum } from '../enums/piece-type.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { SetOfPieces } from '../types/set-of-pieces'
import { canMoveBishop } from './can-move-bishop.util'
import { canMoveKnight } from './can-move-knight.util'
import { canMovePawn } from './can-move-pawn.util'
import { canMoveQueen } from './can-move-queen.util'
import { canMoveRook } from './can-move-rook.util'

export function canMove(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  pieces: SetOfPieces
): boolean {
  const pieceId: PieceId | null = board.get(from.rank, from.file)

  if (pieceId === null) {
    return false
  }

  const piece = pieces.get(pieceId)!

  if (piece.type === PieceTypeEnum.Pawn) {
    return canMovePawn(from, to, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Knight) {
    return canMoveKnight(from, to, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Bishop) {
    return canMoveBishop(from, to, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Rook) {
    return canMoveRook(from, to, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Queen) {
    return canMoveQueen(from, to, board, pieces, piece)
  }

  return true
}
