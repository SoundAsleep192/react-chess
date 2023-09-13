import { FC } from 'react'

import { useDrag } from 'react-dnd'
import {
  deselect,
  move as movePiece,
  select,
  useBoardStore,
} from './store/board.store'
import { usePiecesStore } from './store/pieces.store'
import { PieceId } from './types/piece-id'

interface Props {
  pieceId: PieceId
  rank: number
  file: string
}

export const PieceComponent: FC<Props> = ({ pieceId, file, rank }) => {
  const pieces = usePiecesStore((state) => state.pieces)
  const piece = pieces.get(pieceId)!
  const selected = useBoardStore((state) => state.selected)
  const turn = useBoardStore((state) => state.turn)

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'piece',
      item: { file, rank },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag() {
        return pieces.get(pieceId)?.color === turn
      },
    }),
    [turn]
  )

  const onPieceClick = (event: React.MouseEvent) => {
    event.stopPropagation()

    if (selected === null) {
      if (pieces.get(pieceId)?.color !== turn) {
        return
      }

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
        pointerEvents: pieces.get(pieceId)?.color === turn ? 'auto' : 'none',
      }}
      className="h-full w-full"
      src={`src/assets/${piece.type}_${piece.color}.svg`}
      alt={`${piece.color} ${piece.type}`}
    ></img>
  )
}
