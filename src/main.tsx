import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { PortalAuthProvider } from '@/context/PortalAuthContext'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PortalAuthProvider>
        <App />
      </PortalAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
