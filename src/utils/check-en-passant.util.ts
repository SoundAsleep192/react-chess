import { Board } from '../classes/board.class'
import { PieceTypeEnum } from '../enums/piece-type.enum'
import { Coordinate } from '../types/coordinate.interface'
import { PieceId } from '../types/piece-id'
import { PieceEntity } from '../types/piece.interface'
import { SetOfPieces } from '../types/set-of-pieces'

export function checkEnPassant(
  from: Coordinate,
  to: Coordinate,
  board: Board,
  pieces: SetOfPieces
): Coordinate | null {
  const pieceId: PieceId = board.get(from.rank, from.file)!
  const piece: PieceEntity = pieces.get(pieceId)!

  if (piece.type !== PieceTypeEnum.Pawn) {
    return null
  }

  if (Math.abs(from.rank - to.rank) !== 2) {
    return null
  }

  return {
    file: to.file,
    rank: Math.min(from.rank, to.rank) + 1,
  }
}
