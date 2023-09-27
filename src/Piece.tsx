import { FC } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import { useChessStore } from './store/store'
import { PieceId } from './types/piece-id'

interface Props {
  pieceId: PieceId
  rank: number
  file: string
}

export const PieceComponent: FC<Props> = ({ pieceId, file, rank }) => {
  const pieces = useChessStore((state) => state.pieces)
  const selected = useChessStore((state) => state.selected)
  const turn = useChessStore((state) => state.turn)
  const select = useChessStore((state) => state.select)
  const deselect = useChessStore((state) => state.deselect)
  const movePiece = useChessStore((state) => state.move)

  const piece = pieces.get(pieceId)!

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'piece',
      item: () => {
        select({ file, rank })
        return { file, rank }
      },
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

    if (selected !== null) {
      if (selected.file === file && selected.rank === rank) {
        deselect()
        return
      }

      if (pieces.get(pieceId)?.color !== turn) {
        movePiece(selected, { file, rank })
        return
      }
    }

    if (pieces.get(pieceId)?.color !== turn) {
      return
    }

    select({ file, rank })
  }

  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={`src/assets/${piece.type}_${piece.color}.svg`}
      ></DragPreviewImage>
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
    </>
  )
}
