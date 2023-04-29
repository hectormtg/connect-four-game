import { FC } from 'react'
import styles from './Dots.module.scss'

const Dots: FC = () => {
    return (
        <section className={styles.dotsContainer}>
            <span />
            <span />
            <span />
            <span />
        </section>
    )
}

export default Dots