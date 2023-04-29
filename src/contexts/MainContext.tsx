import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { Columns, Players, Score } from '../types/types'

interface ContextModel {
    currentTurn: Players
    changeTurn: () => void
    columns: Columns
    playTurn: (column: string) => void
    restartGame: () => void
    score: Score
    winner: Players | null
}

interface Props {
    children: ReactNode
}

const COLUMNS = 7
const ROWS = 6

function createCells() {
    return new Array(ROWS).fill(true).map((_, index) => ({ index, isGuest: false, isSelected: false }))
}

function createColumns() {
    let result: Columns = {}
    Array(COLUMNS).fill(true).forEach((_, index) => {
        result[index] = createCells()
    })
    return result
}

const INIT_COLUMNS: Columns = createColumns()

const initState: ContextModel = {
    currentTurn: Players.PLAYER_1,
    changeTurn: () => { },
    columns: INIT_COLUMNS,
    playTurn: () => { },
    restartGame: () => { },
    score: {
        [Players.PLAYER_1]: 0,
        [Players.GUEST]: 0,
    },
    winner: null
}

const MainContext = createContext<ContextModel>(initState)

let currentTurnHandler: Players = initState.currentTurn
let starterPlayer: Players = initState.currentTurn

const MainContextProvider: FC<Props> = ({ children }) => {

    const [currentTurn, setCurrentTurn] = useState(initState.currentTurn)
    const [columns, setColumns] = useState<Columns>(initState.columns)
    const [score, setScore] = useState<Score>(initState.score)
    const [winner, setWinner] = useState<Players | null>(initState.winner)

    function changeTurn() {
        setCurrentTurn(prev => prev === Players.PLAYER_1 ? Players.GUEST : Players.PLAYER_1)
    }

    function playTurn(column: string) {

        let col = columns[column]
        for (let i = col.length - 1; i >= 0; i--) {
            let cell = col[i]
            if (!cell.isSelected) {
                cell.isSelected = true
                cell.isGuest = currentTurn === Players.GUEST
                currentTurnHandler = currentTurn
                countCells()
                break
            }
        }
        setColumns({ ...columns, [column]: col })
        changeTurn()

    }

    function restartGame() {
        setColumns(createColumns())
        starterPlayer = starterPlayer === Players.PLAYER_1 ? Players.GUEST : Players.PLAYER_1
        setCurrentTurn(starterPlayer)
        setWinner(null)
    }

    let counter: Record<number, Record<number, boolean>> = {}
    let counterGuest: Record<number, Record<number, boolean>> = {}

    // function countCells(col: number, row: number) {
    function countCells() {

        // for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, COLUMNS - 1); r++) {
        for (let c = 0; c < COLUMNS; c++) {
            // if (c < 0 || c > ROWS - 1) continue

            // for (let c = Math.max(0, col - 1); c <= Math.min(col + 1, ROWS - 1); c++) {
            for (let r = 0; r < ROWS; r++) {
                // if (r < 0 || r > COLUMNS - 1) continue
                // if (c === col && r === row) continue

                const cell = columns[c][r]
                // console.log('Column: ', c, ' - Cell: ', cell.index)

                if (!cell.isSelected) continue

                if (cell.isGuest && currentTurnHandler === Players.GUEST) {
                    counterGuest = { ...counterGuest, [c]: { ...counterGuest[c], [r]: true } }
                    console.log('Is same color: ', currentTurnHandler)
                    // countCells(c, r)
                } else if (!cell.isGuest && currentTurnHandler === Players.PLAYER_1) {
                    counter = { ...counter, [c]: { ...counter[c], [r]: true } }
                    console.log('Is same color: ', currentTurnHandler)
                }

                checkWin()
            }
        }
    }

    function checkWin() {
        const toCheck = currentTurnHandler === Players.GUEST ? counterGuest : counter

        let prevCol: number = parseInt(!!toCheck ? Object.keys(toCheck)[0] : '0')
        let prevRow: number = parseInt(Number.isInteger(prevCol) ? Object.keys(toCheck[prevCol])[0] : '0')
        let sum: Record<number, number> = { [prevCol]: 0 }
        let sumCol: Record<number, number> = { [prevRow]: 0 }

        Object.keys(toCheck).forEach((col: any) => {
            Object.keys(toCheck[col]).forEach((row: any) => {
                const diff = row - prevRow
                const diffCol = col - prevCol

                // console.log('Diff: ' , diff)
                if (diff < 2) {
                    sum = { ...sum, [col]: !!sum[col] ? sum[col] + 1 : 1 }
                } else {
                    sum = { ...sum, [col]: 1 }
                }
                // console.log('Sum: ', sum)

                // console.log('Diff col: ' , diffCol)
                // if (col !== prevCol && row === prevRow && diffCol < 2) {
                if (toCheck[prevCol][row] && diffCol < 2 && col !== prevCol) {
                    sumCol = { ...sumCol, [row]: !!sumCol[row] ? sumCol[row] + 1 : 1 }
                } else {
                    sumCol = { ...sumCol, [row]: 1 }
                }

                prevRow = row
            })

            // console.log('Sum: ', sum)
            if (sum[col] === 4 || sumCol[prevRow] === 4) {
                setWinner(currentTurnHandler)
                setScore(prev => ({
                    ...prev,
                    [currentTurnHandler]: prev[currentTurnHandler] + 1
                }))
                counter = {}
                counterGuest = {}
            }

            // sum = 0
            prevCol = col
        })

        console.log('Sum vertical (cols): ', sum)
        console.log('Sum horizontal (rows): ', sumCol)
    }

    return (
        <MainContext.Provider value={{
            currentTurn, changeTurn, columns, playTurn, restartGame,
            score, winner
        }}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext)

export default MainContextProvider