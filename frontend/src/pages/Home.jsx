import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Chatscreen from '../Components/Chatscreen'
import api from '../services/axios'

const Home = () => {
  const [allOtherUsers, setallOtherUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [chats, setChats] = useState([])


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


  return (
    <div
      className=' flex items-center justify-center h-screen flex-col py-15'>
      {/* --- main container --- */}
      <div
        className=' min-w-lg rounded-2xl 
      backdrop-blur-xs bg-white/12 border border-white/35
           shadow-lg shadow-black/20
           max-w-5xl w-full
          transition-all duration-300 flex-1 overflow-hidden'>

        <div className="con flex w-full h-full">
          {/* --- left bar --- */}
          <Sidebar otherUsers={allOtherUsers} setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>

          {/* --- right bar --- */}
          <Chatscreen chats={chats} />
        </div>



      </div>
    </div>
  )
}

export default Home