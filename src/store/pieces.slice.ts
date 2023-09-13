import { StateCreator } from 'zustand'
import { INITIAL_PIECES } from '../constants/initial-pieces.constant'
import { PieceTypeEnum } from '../enums/piece-type.enum'
import { PieceId } from '../types/piece-id'
import { SetOfPieces } from '../types/set-of-pieces'
import { type StoreState } from './state.type'

export interface PiecesSlice {
  pieces: SetOfPieces
  promote: (pawnId: PieceId, promoteTo: PromotionOptions) => void
}

type PromotionOptions =
  | PieceTypeEnum.Bishop
  | PieceTypeEnum.Knight
  | PieceTypeEnum.Rook
  | PieceTypeEnum.Queen

export const createPiecesSlice: StateCreator<
  StoreState,
  [],
  [],
  PiecesSlice
> = () => ({
  pieces: INITIAL_PIECES,
  promote: (pawnId: PieceId, promoteTo: PromotionOptions) => void 0,
})
