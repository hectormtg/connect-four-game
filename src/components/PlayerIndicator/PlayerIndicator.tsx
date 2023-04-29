import { FC } from 'react'
import styles from './PlayerIndicator.module.scss'
import clsx from 'clsx'
import { useMainContext } from '../../contexts/MainContext'
import { Players } from '../../types/types'
import playerIcon from '../../assets/facePink.png'
import guestIcon from '../../assets/faceYellow.png'

interface Props {
    guest?: boolean
}

const PlayerIndicator: FC<Props> = ({ guest }) => {

    const { score } = useMainContext()

    return (
        <div className={clsx(styles.container, guest && styles.containerGuest)}>
            <p>
                {guest
                    ? 'PLAYER 2'
                    : 'PLAYER 1'
                }
            </p>

            <span>
                {guest ? score[Players.GUEST] : score[Players.PLAYER_1]}
            </span>

            <div className={clsx(guest && styles.guest)}>
                <img
                    src={guest ? guestIcon : playerIcon}
                    alt=''
                    onDragStart={e => e.preventDefault()}
                />
            </div>
        </div>
    )
}

export default PlayerIndicator