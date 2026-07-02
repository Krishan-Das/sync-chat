import React, { Children, createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../services/axios';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null)


  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;