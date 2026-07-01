import React from 'react'
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Usercard from './Usercard';
import api from '../services/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({otherUsers, setSelectedUser, selectedUser}) => {
  const navigate = useNavigate()

  const logoutHandler = async()=>{
    try {
      const response = await api.post("/auth/logout");
      toast.success(response.data?.message);
      navigate("/login")
    } catch (error) {
      console.error("Error:", error)
      toast.error(error.response?.data?.message || "Something is wrong!")
    }
  }


  return (
    <div className='bg-gray-600 w-1/3 h-full p-4 flex flex-col'>
      {/* --- search --- */}
      <div className='flex items-center f-full bg-slate-300 rounded-md'>
        <i className='pl-2'><FaUser /></i>
        <input className='w-full px-2 py-1.5 focus:outline-none' type="text" placeholder='Search'/>
        <button className='p-1.5 m-1 cursor-pointer  rounded-full hover:bg-blue-600 hover:text-white  transition ease duration-400'><IoSearch/></button>
      </div>

      {/* --- friend list --- */}
      <div className="otherUsers flex-1 bg-zinc-400 my-3 rounded-md py-2 px-2 flex flex-col gap-1">
        {
          otherUsers.length > 0 ? 
          otherUsers.map((item)=>{
            return <Usercard key={item._id} user={item} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
          })
          :
          <div>No Friends Yet.</div>
        }
      </div>

      {/* --- logout btn --- */}
      <button 
      onClick={logoutHandler}
      className="logout bg-[#cecece] text-[16px] font-semibold rounded-md py-1 cursor-pointer hover:bg-red-100 transition ease"

      >Logout</button>
    </div>
  )
}

export default Sidebar