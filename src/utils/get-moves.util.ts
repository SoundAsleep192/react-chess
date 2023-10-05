import { Board } from '../classes/board.class'
import { PieceTypeEnum } from '../enums/piece-type.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { SetOfPieces } from '../types/set-of-pieces'
import { getBishopMoves } from './get-bishop-moves.util'
import { getKingMoves } from './get-king-moves.util'
import { getKnightMoves } from './get-knight-moves.util'
import { getPawnMoves } from './get-pawn-moves.util'
import { getQueenMoves } from './get-queen-moves.util'
import { getRookMoves } from './get-rook-moves.util'

export function getMoves(
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
    return getPawnMoves(from, board, pieces, piece, enPassant)
  }

  if (piece.type === PieceTypeEnum.Knight) {
    return getKnightMoves(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Bishop) {
    return getBishopMoves(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Rook) {
    return getRookMoves(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.Queen) {
    return getQueenMoves(from, board, pieces, piece)
  }

  if (piece.type === PieceTypeEnum.King) {
    return getKingMoves(from, board, pieces, piece)
  }

  return []
}
