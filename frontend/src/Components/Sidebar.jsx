import React, { useContext, useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Usercard from './Usercard';
import api from '../services/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { OtherUserContext } from "../contexts/OtherUsers.jsx"
import { AuthContext } from "../contexts/AuthContext.jsx"
import Loader from './Loader.jsx';
import { Socket } from 'socket.io-client';


const Sidebar = () => {
  const navigate = useNavigate()
  const { allOtherUsers, selectedUser, setSelectedUser, usersLoading } = useContext(OtherUserContext);
  const { socket } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState('')
  const [searchedUsers, setSearchedUsers] = useState([])


  useEffect(() => {
    if (allOtherUsers.length > 0) {
      setSelectedUser(allOtherUsers[0]);
    }
  }, [allOtherUsers])

  // socket
  useEffect(() => {
  if (!socket) return;

  const handleUserOffline = ({ userId, lastSeen }) => {
    setSelectedUser(prev => {
      if (!prev || prev._id !== userId) return prev;

      return {
        ...prev,
        lastSeen,
      };
    });
  };

  socket.on("userOffline", handleUserOffline);

  return () => {
    socket.off("userOffline", handleUserOffline);
  };
}, [socket]);



  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchedUsers(allOtherUsers)
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const response = await api.get(`/auth/search?query=${searchInput}`)
        setSearchedUsers(response.data?.users)
      } catch (error) {
        console.error(error)
      }
    }, 300);

    return () => clearTimeout(timer)
  }, [searchInput, allOtherUsers])


  // for showing other users 
  const usersToShow =
    searchedUsers.length > 0 ? searchedUsers : allOtherUsers;

  return (
    <div className='bg-gray-600 w-1/3 h-full p-4 flex flex-col'>
      {/* --- search --- */}
      <div className='flex items-center f-full bg-slate-300 rounded-md'>
        <i className='pl-2'><FaUser /></i>

        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='w-full px-2 py-1.5 focus:outline-none' type="text" placeholder='Search...' />

        <div
          className='p-1.5 m-1 cursor-pointer  rounded-full hover:bg-[#1e2939] hover:text-white  transition ease duration-400'><IoSearch /></div>
      </div>

      {/* --- friend list --- */}
      <div className="otherUsers flex-1 bg-zinc-400 my-3 rounded-md py-2 px-2 flex flex-col gap-1 relative">
        {
          usersLoading ? (
            <Loader />
          ) : usersToShow.length > 0 ? (
            usersToShow.map((item) => (
              <Usercard
                key={item._id}
                user={item}
                setSelectedUser={setSelectedUser}
                selectedUser={selectedUser}
              />
            ))
          ) : (
            <div>No Friends Yet.</div>
          )
        }
      </div>
    </div>
  )
}

export default Sidebar