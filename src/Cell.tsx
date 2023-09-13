import { FC } from 'react'
import { useDrop } from 'react-dnd'
import { PieceComponent } from './Piece'
import { Board } from './classes/board.class'
import { FILES } from './constants/files.constant'
import { RANKS } from './constants/ranks.constant'
import { move as movePiece, useBoardStore } from './store/board.store'
import { Coordinate } from './types/coordinate.interface'

const WHITE_CELL_COLOR = '#ebf4fc'
const BLACK_CELL_COLOR = '#4984cc'
const HIGHLIGHTED_CELL_COLOR = '#e3b022'

interface Props {
  rank: number
  file: string
}

export const CellComponent: FC<Props> = ({ rank, file }) => {
  const board: Board = useBoardStore((state) => state.board)
  const selected = useBoardStore((state) => state.selected)

  const pieceId = board.get(rank, file)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (from: Coordinate) => {
      if (from.rank === rank && from.file === file) {
        return
      }

      movePiece(from, { rank, file })
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const onCellClick = () => {
    if (selected === null) {
      return
    }

    movePiece(selected, { rank, file })
  }

  return (
    <div
      onClick={onCellClick}
      ref={drop}
      className="cell w-20 h-20 flex justify-center items-center"
      style={{ backgroundColor: getCellColor(rank, file, selected) }}
    >
      {pieceId !== null && (
        <PieceComponent
          pieceId={pieceId}
          file={file}
          rank={rank}
        ></PieceComponent>
      )}
    </div>
  )
}

function getCellColor(
  rank: number,
  file: string,
  selected: Coordinate | null
): string {
  if (selected?.rank === rank && selected?.file === file) {
    return HIGHLIGHTED_CELL_COLOR
  }

  const rankIndex = RANKS.findIndex((item) => item === rank)
  const fileIndex = FILES.findIndex((item) => item === file)
  return rankIndex % 2 === fileIndex % 2 ? WHITE_CELL_COLOR : BLACK_CELL_COLOR
}
