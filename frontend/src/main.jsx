import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import OtherUsersProvider from './contexts/otherUsers.jsx'
import AuthProvider from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <OtherUsersProvider>
        <App />
      </OtherUsersProvider>
    </AuthProvider>
  </BrowserRouter>
)
