import { Board } from '../classes/board.class'
import { PieceTypeEnum } from '../enums/piece-type.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { SetOfPieces } from '../types/set-of-pieces'
import { getLegalMovesBishop } from './get-legal-moves-bishop.util'
import { getLegalMovesKing } from './get-legal-moves-king.util'
import { getLegalMovesKnight } from './get-legal-moves-knight.util'
import { getLegalMovesPawn } from './get-legal-moves-pawn.util'
import { getLegalMovesQueen } from './get-legal-moves-queen.util'
import { getLegalMovesRook } from './get-legal-moves-rook.util'

export function getLegalMoves(
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
    return getLegalMovesPawn(from, board, pieces, piece, enPassant)
  }

  if (piece.type === PieceTypeEnum.Knight) {
    return getLegalMovesKnight(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Bishop) {
    return getLegalMovesBishop(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Rook) {
    return getLegalMovesRook(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Queen) {
    return getLegalMovesQueen(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.King) {
    return getLegalMovesKing(from, board, pieces, piece)
  }

  return []
}
