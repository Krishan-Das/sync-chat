import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Messagecard = ({ item }) => {
  const { user } = useContext(AuthContext)
  const isSender = item?.sender === user?._id;

  return (
    <div className={`flex items-center  gap-3 w-fit py-1 px-4  ${isSender
     ? "self-end bg-gray-800 text-white rounded-tr-2xl rounded-l-2xl" : "bg-white rounded-tl-2xl rounded-r-2xl"}`}>
      <h1>{item?.message
      }</h1>
      <p className={`self-end text-[10px] ${isSender ? 'text-[#e9e9e9b6]' : 'text-[#0f0f0feb]'}`}>10:33 pm</p>
    </div>
  )
}

export default Messagecard