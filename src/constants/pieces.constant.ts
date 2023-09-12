import { ColorEnum } from '../enums/color.enum'
import { PieceTypeEnum } from '../enums/piece-type.enum'
import { PieceEntity } from '../types/piece.interface'

export const WHITE_PAWN: PieceEntity = {
  type: PieceTypeEnum.Pawn,
  color: ColorEnum.White,
}

export const BLACK_PAWN: PieceEntity = {
  type: PieceTypeEnum.Pawn,
  color: ColorEnum.Black,
}

export const WHITE_BISHOP: PieceEntity = {
  type: PieceTypeEnum.Bishop,
  color: ColorEnum.White,
}

export const BLACK_BISHOP: PieceEntity = {
  type: PieceTypeEnum.Bishop,
  color: ColorEnum.Black,
}
export const WHITE_KNIGHT: PieceEntity = {
  type: PieceTypeEnum.Knight,
  color: ColorEnum.White,
}
export const BLACK_KNIGHT: PieceEntity = {
  type: PieceTypeEnum.Knight,
  color: ColorEnum.Black,
}
export const WHITE_ROOK: PieceEntity = {
  type: PieceTypeEnum.Rook,
  color: ColorEnum.White,
}

export const BLACK_ROOK: PieceEntity = {
  type: PieceTypeEnum.Rook,
  color: ColorEnum.Black,
}

export const WHITE_QUEEN: PieceEntity = {
  type: PieceTypeEnum.Queen,
  color: ColorEnum.White,
}

export const BLACK_QUEEN: PieceEntity = {
  type: PieceTypeEnum.Queen,
  color: ColorEnum.Black,
}

export const WHITE_KING: PieceEntity = {
  type: PieceTypeEnum.King,
  color: ColorEnum.White,
}

export const BLACK_KING: PieceEntity = {
  type: PieceTypeEnum.King,
  color: ColorEnum.Black,
}
