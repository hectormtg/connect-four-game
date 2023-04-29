import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.scss'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface Props {
    open: boolean
    children?: ReactNode
    onClose: () => void
}

const Modal: FC<Props> = ({ children, open, onClose }) => {

    if (!open) return null

    return createPortal(
        <>
            <div
                className={styles.bgLayer}
                onClick={onClose}
            />
            <div
                className={styles.modalWrapper}
                id='modal-wrapper'
            >
                <Button
                    onClick={onClose}
                    variant='icon'
                >
                    <FontAwesomeIcon icon={faXmark} />
                </Button>

                <div className={styles.modal}>
                    {children}
                </div>
            </div>
        </>,
        document.body
    )
}

export default Modal