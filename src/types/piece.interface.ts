import { ColorEnum } from '../enums/color.enum'
import { PieceTypeEnum } from '../enums/piece-type.enum'

export interface PieceEntity {
  type: PieceTypeEnum
  color: ColorEnum
}
