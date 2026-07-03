import React, { useContext, useState } from 'react'
import { IoMdSend, IoMdSettings } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Messagecard from './Messagecard';
import { OtherUserContext } from "../contexts/OtherUsers.jsx"
import toast from 'react-hot-toast';
import api from '../services/axios.js';
import ProfileSec from './ProfileSec.jsx';
import Loader from './Loader.jsx';

const Chatscreen = () => {

  const { chats, selectedUser, chatsLoading } = useContext(OtherUserContext);
  const [message, setMessage] = useState('')
  const [isSetting, setIsSetting] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendMessageHandler = async () => {
    try {
      setLoading(true)
      const response = await api.post(`/message/send/${selectedUser?._id}`, { message });
      toast.success(response.data?.message)
      setMessage("")
    } catch (error) {
      console.error(error.response)
      toast.error(error.response?.data?.message || "Something is wrong!")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='w-2/3 h-full flex flex-col border-l-3 border-[#e4e4e48a]'>
      <div className='bg-gray-600 py-2 px-4 border-b-3 border-[#e4e4e48a] flex items-center justify-between relative'>
        <div className='flex items-center gap-4'>
          {/* --- profile --- */}
          <div className="profile w-10 h-10 overflow-hidden rounded-full cursor-pointer">
            <img className='w-full object-cover' src={selectedUser?.profilePicture || "https://ik.imagekit.io/rlvedbfnq/sync-chat/assets/sync-chat-svg.svg"} alt="sync-chat" />
          </div>

          <div className="middle flex flex-col ">
            <h2 className="fullName text-[16px] font-semibold py-0 text-white">{selectedUser?.fullName}</h2>
            <p className='text-[13px] text-[#d7d7d7a6]'>{selectedUser?.lastSeen}</p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => setIsSetting(!isSetting)}
          className="text-white bg-[#33435b76] border hover:bg-[#1e2939] transition active:scale-90 cursor-pointer p-2 rounded-full"
        >
          {isSetting ? <IoClose size={20} /> : <IoMdSettings size={20} />}
        </button>

        {/* Profile */}
        <ProfileSec isSetting={isSetting} />

      </div>

      <div className="msgContainer flex-1 py-4 px-2 flex-col gap-2 flex relative">
        {
          chatsLoading ? (
            <Loader/>
          ):
          (
            chats.length > 0 ?
            chats.map((item) => {
              return <Messagecard key={item._id} item={item} />
            })
            :
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white'>No messages yet.</div>
          )
        }
        {
         // --- for msg send loading ---
          loading && <Loader/>
        }

      </div>


      {/* --- send message --- */}
      <div className="sendMsg bg-gray-600 py-2 px-4 flex items-center">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-full tracking-wider focus:outline-none py-2 text-white' type="text" placeholder='message...' />
        <button
          onClick={sendMessageHandler}
          className='border-2 text-white border-[#efefef68] p-2 rounded-full cursor-pointer'><IoMdSend size={20} /></button>
      </div>
    </div>
  )
}

export default Chatscreen