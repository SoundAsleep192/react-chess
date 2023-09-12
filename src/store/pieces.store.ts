import { create } from 'zustand'
import { INITIAL_PIECES } from '../constants/initial-pieces.constant'
import { PieceTypeEnum } from '../enums/piece-type.enum'
import { PieceId } from '../types/piece-id'
import { SetOfPieces } from '../types/set-of-pieces'

type PromotionOptions =
  | PieceTypeEnum.Bishop
  | PieceTypeEnum.Knight
  | PieceTypeEnum.Rook
  | PieceTypeEnum.Queen

interface PiecesStore {
  pieces: SetOfPieces
  promote: (pawnId: PieceId, promoteTo: PromotionOptions) => void
}

export const usePiecesStore = create<PiecesStore>((set) => ({
  pieces: INITIAL_PIECES,
  promote: (pawnId, promoteTo) => void 0,
}))
