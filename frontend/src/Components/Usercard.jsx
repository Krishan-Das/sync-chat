import React from 'react'

const Usercard = ({user, setSelectedUser, selectedUser}) => {
  return (
    <div
    onClick={() => setSelectedUser(user)}
     className={`flex items-center gap-3  p-2 rounded-md ${selectedUser === user ? 'bg-gray-800' : 'bg-gray-700'} cursor-pointer hover:bg-gray-800`}>
      <div className="profile w-10 h-10 object-cover overflow-hidden rounded-full ">
        <img className='w-full' src={user?.profilePicture || "https://ik.imagekit.io/rlvedbfnq/sync-chat/assets/sync-chat-svg.svg"} alt= "sync-chat" />
      </div>
      <div className="middle flex flex-col ">
        <h2 className="fullName text-[16px] font-semibold py-0 text-white">{user?.fullName}</h2>
        <p className='text-[13px] text-[#d7d7d7a6]'>{user?.email}</p>
      </div>
    </div>
  )
}

export default Usercard