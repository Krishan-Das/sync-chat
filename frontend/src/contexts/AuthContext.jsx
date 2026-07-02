import React, { Children, createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../services/axios';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);



  useEffect(()=>{
    console.log("Current user:", user);
  },[user]);

  useEffect(()=>{
    if(user) return;
    const getMe = async ()=>{
      try {
        const response = await api.get('auth/me');        
        setUser(response.data?.user);
      } catch (error) {
        if (error.response?.status === 401) {
        setUser(null);
        return;
      }
        toast.error(error.response?.data?.message || "Something is wrong!")
      }
    }
    getMe()
  }, [])


  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;