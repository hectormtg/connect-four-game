import { FC, useState } from 'react'
import Button from '../Button/Button'
import styles from './OptionsBar.module.scss'
import { useMainContext } from '../../contexts/MainContext'
import Modal from '../Modal/Modal'
import Menu from '../Menu/Menu'
import Dots from '../Dots/Dots'
import { useEscapeKey } from '../../hooks/hooks'

const OptionsBar: FC = () => {

    const { restartGame } = useMainContext()

    const [open, setOpen] = useState(false)

    function toggleModal() {
        setOpen(prev => !prev)
    }

    function handleEscapeClose(){
        setOpen(false)
    }

    useEscapeKey(handleEscapeClose)

    return (
        <>
            <div className={styles.container}>
                <Button onClick={toggleModal}>
                    Menu
                </Button>

                <Dots/>

                <Button onClick={restartGame}>
                    Restart
                </Button>
            </div>

            <Modal 
                open={open}
                onClose={toggleModal}
            >
                <Menu onClose={toggleModal} />
            </Modal>
        </>
    )
}

export default OptionsBar