import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import SignupPage from '../pages/SignupPage.jsx'
import { AuthContext } from '../contexts/AuthContext.jsx'

const AppRoutes = () => {

  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" replace />}
      />

      <Route
        path="/signup"
        element={!user ? <SignupPage /> : <Navigate to="/" replace />}
      />
    </Routes>
  )
}

export default AppRoutes