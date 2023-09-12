import { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CellComponent } from './Cell'
import { FILES } from './constants/files.constant'
import { RANKS } from './constants/ranks.constant'

export const BoardComponent: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      {RANKS.map((rank: number) => (
        <div className="row flex" key={rank}>
          {FILES.map((file: string) => (
            <CellComponent key={file} rank={rank} file={file}></CellComponent>
          ))}
        </div>
      ))}
    </DndProvider>
  )
}
