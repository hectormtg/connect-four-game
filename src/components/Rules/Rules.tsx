import { FC } from 'react'
import { createPortal } from 'react-dom'
import styles from './Rules.module.scss'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface Props {
    onGoBack: () => void
}

const Rules: FC<Props> = ({ onGoBack }) => {

    return (
        <>
            <div className={styles.container}>
                <h6>RULES</h6>

                <section>
                    <span>OBJECTIVE</span>
                    <p>
                        Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally or diagonally).
                    </p>
                </section>

                <section>
                    <span>HOW TO PLAY</span>
                    <ol>
                        <li>Red goes first in the first game.</li>
                        <li>Player must alternate tuns, and only one disc can be dropped in each turn.</li>
                        <li>The game ends when there is a 4-in-a-row or</li>
                        <li>The starter of the previous game goes first on the next game.</li>
                    </ol>
                </section>
            </div>

            <GoBackButton onClick={onGoBack} />
        </>
    )
}

interface GoBackButtonProps {
    onClick: () => void
}

const GoBackButton: FC<GoBackButtonProps> = ({ onClick }) => {
    return createPortal(
        <Button
            variant='icon'
            className={styles.goBackBtn}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faArrowLeft} />
        </Button>,
        document.querySelector('#modal-wrapper') || document.body
    )
}

export default Rules