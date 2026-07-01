import React from 'react'
import { IoMdSend } from "react-icons/io";
import Messagecard from './Messagecard';

const Chatscreen = () => {
  return (
    <div className='w-2/3 h-full flex flex-col border-l-3 border-[#e4e4e48a]'>
      <div className='bg-gray-600 py-2 px-4 border-b-3 border-[#e4e4e48a] flex items-center gap-4'>
        {/* --- profile --- */}
        <div className="profile w-10 h-10 overflow-hidden rounded-full">
          <img className='w-full object-cover' src="https://tse1.explicit.bing.net/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sync-chat" />
        </div>

        <div className="middle flex flex-col ">
          <h2 className="fullName text-[16px] font-semibold py-0 text-white">Krishan Das</h2>
          <p className='text-[13px] text-[#d7d7d7a6]'>sync-chat</p>
        </div>

      </div>

      <div className="msgContainer flex-1 p-2 flex-col gap-2 flex">
        <Messagecard/>
        <Messagecard send={true} />
      </div>

      <div className="sendMsg bg-gray-600 py-2 px-4 flex items-center">
        <input className='w-full focus:outline-none py-2 text-white' type="text" placeholder='Message'/>
        <button className='border-2 text-white border-[#efefef68] p-2 rounded-full cursor-pointer'><IoMdSend size={20} /></button>
      </div>
    </div>
  )
}

export default Chatscreen