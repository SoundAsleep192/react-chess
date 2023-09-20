import { Coordinate } from '../types/coordinate.interface'

export function offsetCoordinate(
  from: Coordinate,
  xOffset: number,
  yOffset: number
): Coordinate {
  const rank: number = from.rank + yOffset
  const file: string = String.fromCharCode(from.file.charCodeAt(0) + xOffset)
  return { rank, file }
}
