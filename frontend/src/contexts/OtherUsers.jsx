import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import api from '../services/axios';
import toast from 'react-hot-toast';
import { AuthContext } from "../contexts/AuthContext.jsx"

export const OtherUserContext = createContext(null);

const OtherUsersProvider = ({ children }) => {
  const [allOtherUsers, setallOtherUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [chats, setChats] = useState([])
  const { user } = useContext(AuthContext)

  // --- for loaders ---
  const [usersLoading, setUsersLoading] = useState(false);
  const [chatsLoading, setChatsLoading] = useState(false);


  // --- selected users conversation ---
  useEffect(() => {
    const getConversation = async () => {
      if (!selectedUser) return;
      try {
        setChatsLoading(true)
        const response = await api.get(`/message/read/${selectedUser?._id}`);
        setChats(response.data?.messages);
      } catch (error) {
        console.error(error.response?.data?.message)
        toast.error(error.response?.data?.message || "Something is wrong!")
      } finally {
        setChatsLoading(false)
      }
    }
    getConversation()
  }, [selectedUser])


  // --- other users ---
  useEffect(() => {
    if (!user) return;
    const getAllOtherUsers = async () => {
      try {
        setUsersLoading(true)
        const response = await api.get('/auth/all-other-users');
        setallOtherUsers(response.data?.users);
      } catch (error) {
        console.error(error.response?.data?.message)
        toast.error(error.response?.data?.message || "Something is wrong!")
      } finally {
        setUsersLoading(false)
      }
    }

    getAllOtherUsers()
  }, [user])

  const values = {
    allOtherUsers, setallOtherUsers, selectedUser, setSelectedUser, chats, usersLoading, chatsLoading
  }


  return (
    <OtherUserContext.Provider value={values}>
      {children}
    </OtherUserContext.Provider>
  )
}

export default OtherUsersProvider