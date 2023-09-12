import { FC } from 'react'

import { useDrag } from 'react-dnd'
import { useBoardStore } from './store/board.store'
import { usePiecesStore } from './store/pieces.store'
import { PieceId } from './types/piece-id'

interface Props {
  pieceId: PieceId
  rank: number
  file: string
}

export const PieceComponent: FC<Props> = ({ pieceId, file, rank }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { file, rank },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const pieces = usePiecesStore((state) => state.pieces)
  const piece = pieces.get(pieceId)!
  const selected = useBoardStore((state) => state.selected)
  const select = useBoardStore((state) => state.select)
  const deselect = useBoardStore((state) => state.deselect)
  const movePiece = useBoardStore((state) => state.move)

  const onPieceClick = (event: React.MouseEvent) => {
    event.stopPropagation()

    if (selected === null) {
      select({ file, rank })
      return
    }

    if (selected.file === file && selected.rank === rank) {
      deselect()
      return
    }

    movePiece(selected, { file, rank })
  }

  return (
    <img
      onClick={onPieceClick}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      className="h-full w-full"
      src={`src/assets/${piece.type}_${piece.color}.svg`}
      alt={`${piece.color} ${piece.type}`}
    ></img>
  )
}
