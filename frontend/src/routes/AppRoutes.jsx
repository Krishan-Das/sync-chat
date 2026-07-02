import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import SignupPage from '../pages/SignupPage.jsx'
import { AuthContext } from '../contexts/AuthContext.jsx'
import AuthProvider from '../contexts/AuthContext.jsx'

const AppRoutes = () => {

  const {user} = useContext(AuthContext)

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
    </Routes>
  )
}

export default AppRoutes