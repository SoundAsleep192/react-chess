import { FC } from 'react'
import { useDrop } from 'react-dnd'
import { PieceComponent } from './Piece'
import { FILES } from './constants/files.constant'
import { RANKS } from './constants/ranks.constant'
import { useChessStore } from './store/store'
import { Coordinate } from './types/coordinate.interface'

const WHITE_CELL_COLOR = '#ebf4fc'
const BLACK_CELL_COLOR = '#4984cc'
const HIGHLIGHTED_CELL_COLOR = '#e3b022'
const LAST_MOVE_CELL_COLOR = '#fcf681'

interface Props {
  rank: number
  file: string
}

export const CellComponent: FC<Props> = ({ rank, file }) => {
  const board = useChessStore((state) => state.board)
  const selected = useChessStore((state) => state.selected)
  const lastFrom = useChessStore((state) => state.lastFrom)
  const lastTo = useChessStore((state) => state.lastTo)
  const movePiece = useChessStore((state) => state.move)
  const legalMoves = useChessStore((state) => state.legalMoves)

  const pieceId = board.get(rank, file)

  const isValidMoveCell = legalMoves.some(
    (move) => move.file === file && move.rank === rank
  )

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (from: Coordinate) => {
      if (!isValidMoveCell) {
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
      className="cell w-20 h-20 flex justify-center items-center relative"
      style={{
        backgroundColor: getCellColor(rank, file, selected, lastFrom, lastTo),
      }}
    >
      {pieceId !== null && (
        <PieceComponent
          pieceId={pieceId}
          file={file}
          rank={rank}
        ></PieceComponent>
      )}
      {isValidMoveCell && (
        <div className="absolute w-5 h-5 opacity-40 bg-slate-600 pointer-events-none rounded-full"></div>
      )}
    </div>
  )
}

function getCellColor(
  rank: number,
  file: string,
  selected: Coordinate | null,
  lastFrom: Coordinate | null,
  lastTo: Coordinate | null
): string {
  if (selected?.rank === rank && selected?.file === file) {
    return HIGHLIGHTED_CELL_COLOR
  }

  if (
    (lastFrom?.rank === rank && lastFrom?.file === file) ||
    (lastTo?.rank === rank && lastTo?.file === file)
  ) {
    return LAST_MOVE_CELL_COLOR
  }

  const rankIndex = RANKS.findIndex((item) => item === rank)
  const fileIndex = FILES.findIndex((item) => item === file)
  return rankIndex % 2 === fileIndex % 2 ? WHITE_CELL_COLOR : BLACK_CELL_COLOR
}
