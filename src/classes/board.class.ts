import { immerable, produce } from 'immer'
import { FILES } from '../constants/files.constant'
import { RANKS } from '../constants/ranks.constant'
import { PieceId } from '../types/piece-id'

type BoardContent = (PieceId | null)[][]

const INITIAL_BOARD_CONTENT: BoardContent = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14, 15],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [16, 17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30, 31],
]

export class Board {
  [immerable] = true

  readonly content: BoardContent

  constructor(content?: BoardContent) {
    this.content = content ?? INITIAL_BOARD_CONTENT
  }

  get(rank: number, file: string): PieceId | null {
    const rankIndex = RANKS.findIndex((item) => item === rank)
    const fileIndex = FILES.findIndex((item) => item === file)
    return this.content[rankIndex][fileIndex]
  }

  set(value: PieceId | null, rank: number, file: string): Board {
    const rankIndex = RANKS.findIndex((item) => item === rank)
    const fileIndex = FILES.findIndex((item) => item === file)
    return produce(this, (draft) => {
      draft.content[rankIndex][fileIndex] = value
    })
  }
}
