import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './styles/globals.scss'
import MainContextProvider from './contexts/MainContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </React.StrictMode>,
)
