import './App.css'
import { BoardComponent } from './Board'

export function App() {
  return (
    <>
      <BoardComponent></BoardComponent>
      <h1 className="font-bold text-xl">TO DO:</h1>
      <ul>
        <li>Castle</li>
        <li>Promotion</li>
        <li>Checkmate detection</li>
        <li>Game restart</li>
        <li>Timers</li>
        <li>Track of moves (*with import)</li>
      </ul>
    </>
  )
}
