import { Board } from '../classes/board.class'
import { PieceTypeEnum } from '../enums/piece-type.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { SetOfPieces } from '../types/set-of-pieces'
import { getValidMovesBishop } from './get-valid-moves-bishop.util'
import { getValidMovesKing } from './get-valid-moves-king.util'
import { getValidMovesKnight } from './get-valid-moves-knight.util'
import { getValidMovesPawn } from './get-valid-moves-pawn.util'
import { getValidMovesQueen } from './get-valid-moves-queen.util'
import { getValidMovesRook } from './get-valid-moves-rook.util'

export function getValidMoves(
  from: Coordinate | null,
  board: Board,
  pieces: SetOfPieces,
  enPassant: Coordinate | null
): Coordinate[] {
  if (from === null) {
    return []
  }

  const pieceId: PieceId | null = board.get(from.rank, from.file)

  if (pieceId === null) {
    return []
  }

  const piece = pieces.get(pieceId)!

  if (piece.type === PieceTypeEnum.Pawn) {
    return getValidMovesPawn(from, board, pieces, piece, enPassant)
  }

  if (piece.type === PieceTypeEnum.Knight) {
    return getValidMovesKnight(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Bishop) {
    return getValidMovesBishop(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Rook) {
    return getValidMovesRook(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Queen) {
    return getValidMovesQueen(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.King) {
    return getValidMovesKing(from, board, pieces, piece)
  }

  return []
}
