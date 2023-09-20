import { FILES } from '../constants/files.constant'
import { RANKS } from '../constants/ranks.constant'
import { Coordinate } from '../types/coordinate.interface'

export function coordinateExists(coordinate: Coordinate): boolean {
  return FILES.includes(coordinate.file) && RANKS.includes(coordinate.rank)
}
