import React, {useContext, useEffect, useState} from 'react'
import { createContext } from 'react'
import api from '../services/axios';
import toast from 'react-hot-toast';

export const OtherUserContext = createContext(null);

const OtherUsersProvider = ({children}) => {
  const [allOtherUsers, setallOtherUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [chats, setChats] = useState([])
  


  // --- selected users conversation ---
  useEffect(()=>{
    const getConversation = async()=>{
      if (!selectedUser) return;
      try {
        const response = await api.get(`/message/read/${selectedUser?._id}`);
        setChats(response.data?.messages);
      } catch (error) {
        console.error(error.response?.data?.message)
        toast.error(error.response?.data?.message || "Something is wrong!")
      }
    }
    getConversation()
  },[selectedUser])
  

  // --- other users ---
  useEffect(() => {
    const getAllOtherUsers = async () => {
      try {
        const response = await api.get('/auth/all-other-users');        
        setallOtherUsers(response.data?.users);
      } catch (error) {
        console.error(error.response?.data?.message)
        toast.error(error.response?.data?.message || "Something is wrong!")
      }
    }

    getAllOtherUsers()
  }, [])

  const values = {
    allOtherUsers, setallOtherUsers, selectedUser, setSelectedUser, chats
  }


  return (
    <OtherUserContext.Provider value={values}>
      {children}
    </OtherUserContext.Provider>
  )
}

export default OtherUsersProvider