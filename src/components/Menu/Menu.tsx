import { FC, useState } from 'react'
import styles from './Menu.module.scss'
import Dots from '../Dots/Dots'
import Rules from '../Rules/Rules'
import pvpIcon from '../../assets/pvp.png'
import pveIcon from '../../assets/pve.png'
import Button from '../Button/Button'
import { useMainContext } from '../../contexts/MainContext'

interface Props {
    onClose: () => void
}

const Menu: FC<Props> = ({ onClose }) => {

    const { restartGame } = useMainContext()

    const [showRules, setShowRules] = useState(false)

    function toggleRules() {
        setShowRules(prev => !prev)
    }

    function handleGoBack() {
        setShowRules(false)
    }

    function handlePVP() {
        restartGame()
        onClose()
    }
    
    function handlePVE() {
        restartGame()
        onClose()
    }

    if (showRules) return <Rules onGoBack={handleGoBack} />

    return (
        <div className={styles.menu}>
            <Dots />

            <Button onClick={handlePVE}>
                <span>PLAY VS CPU</span>
                <img
                    src={pveIcon}
                    alt=''
                    onDragStart={e => e.preventDefault()}
                />
            </Button>
            <Button onClick={handlePVP}>
                <span>PLAY VS PLAYER</span>
                <img
                    src={pvpIcon}
                    alt=''
                    onDragStart={e => e.preventDefault()}
                />
            </Button>
            <Button onClick={toggleRules}>
                GAME RULES
            </Button>
        </div>
    )
}

export default Menu