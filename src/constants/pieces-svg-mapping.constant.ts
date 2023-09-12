import { PieceTypeEnum } from '../enums/piece-type.enum'

export const PIECES_SVG_MAPPING = {
  [PieceTypeEnum.Pawn]: 'pawn.svg',
  [PieceTypeEnum.Knight]: 'knight.svg',
  [PieceTypeEnum.Bishop]: 'bishop.svg',
  [PieceTypeEnum.Rook]: 'rook.svg',
  [PieceTypeEnum.Queen]: 'queen.svg',
  [PieceTypeEnum.King]: 'king.svg',
}
