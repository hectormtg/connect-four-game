import { FC, useState, useEffect } from 'react'
import styles from './Board.module.scss'
import image from '../../assets/turnIndicator.png'
import { useMainContext } from '../../contexts/MainContext'
import { CellData, Players } from '../../types/types'
import Button from '../Button/Button'
import arrowPink from '../../assets/arrowPink.png'
import arrowYellow from '../../assets/arrowYellow.png'

const Board: FC = () => {

    // Context
    const { columns, playTurn } = useMainContext()

    return (
        <div className={styles.boardWrapper}>
            <div className={styles.board}>
                {Object.keys(columns).map(key => (
                    <Column
                        key={key}
                        cells={columns[key]}
                        onClick={() => playTurn(key)}
                    />
                ))}
            </div>

            <TurnIndicator />
        </div>
    )
}

interface ColumnProps {
    cells: Array<CellData>
    onClick: () => void
}

const Column: FC<ColumnProps> = ({ cells, onClick }) => {

    const { currentTurn, winner } = useMainContext()

    const isGuestTurn = currentTurn === Players.GUEST

    return (
        <section
            onClick={onClick}
            className={styles.column}
            style={{
                pointerEvents: !!winner ? 'none' : 'all'
            }}
        >
            {!winner &&
                <div>
                    <img
                        src={isGuestTurn ? arrowYellow : arrowPink}
                        onDragStart={e => e.preventDefault()}
                        alt=''
                    />
                </div>}

            {cells.map((cell, index) => (
                <Cell
                    key={index}
                    cell={cell}
                />
            ))}
        </section>
    )
}

interface CellProps {
    cell: CellData
}

const Cell: FC<CellProps> = ({ cell }) => {

    return (
        <span
            className={styles.cell}
            style={{
                backgroundColor: cell.isSelected
                    ? cell.isGuest
                        ? 'var(--yellow)'
                        : 'var(--pink)'
                    : 'var(--bgMain)'
            }}
        />
    )
}

const INTERVAL = 1000
const TOTAL_TIME = 15000
let interval: any

const TurnIndicator: FC = () => {

    const { currentTurn, changeTurn, winner, restartGame } = useMainContext()

    const [time, setTime] = useState(TOTAL_TIME)

    useEffect(() => {
        clearInterval(interval)
        interval = setInterval(() => {
            setTime(prev => prev - INTERVAL)
        }, INTERVAL)

        return () => {
            clearInterval(interval)
            setTime(TOTAL_TIME)
        }
    }, [currentTurn])

    useEffect(() => {
        if (time < 0) {
            changeTurn()
        }
    }, [time])

    const player = currentTurn === Players.GUEST ? 'Player 2' : 'Player 1'
    const winnerPlayer = winner === Players.GUEST ? 'Player 2' : 'Player 1'

    if (!!winner) return (
        <div className={styles.victoryContainer}>
            <p>{winnerPlayer}</p>

            <span>Wins</span>

            <Button onClick={restartGame}>
                Play Again
            </Button>
        </div>
    )

    return (
        <div className={styles.turnIndicator}>
            <p>{player}'s turn</p>

            <span>{time / INTERVAL}s</span>

            <img
                src={image}
                onDragStart={e => e.preventDefault()}
                alt=''
            />
        </div>
    )
}

export default Board