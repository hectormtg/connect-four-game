import { useMainContext } from '../../contexts/MainContext'
import { Players } from '../../types/types'
import Board from '../Board/Board'
import OptionsBar from '../OptionsBar/OptionsBar'
import PlayerIndicator from '../PlayerIndicator/PlayerIndicator'
import styles from './App.module.scss'

const App = () => {

  const { winner } = useMainContext()

  return (
    <>
      <MobileLayout />

      <main className={styles.main}>
        <PlayerIndicator />

        <section className={styles.container}>
          <OptionsBar />

          <Board />
        </section>

        <PlayerIndicator guest />
      </main>

      <div
        className={styles.decorationBg}
        style={{
          backgroundColor: !winner
            ? 'var(--bgPurple)'
            : winner === Players.GUEST
              ? 'var(--yellow)'
              : 'var(--pink)'
        }}
      />
    </>
  )
}

const MobileLayout = () => {
  return (
    <main className={styles.mainMobile}>
      <OptionsBar />

      <section className={styles.indicatorsContainer}>
        <PlayerIndicator />
        <PlayerIndicator guest />
      </section>

      <section className={styles.container}>
        <Board />
      </section>
    </main>
  )
}

export default App
