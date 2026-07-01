import React from 'react'
import Sidebar from '../Components/Sidebar'
import Chatscreen from '../Components/Chatscreen'

const Home = () => {
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
        <Sidebar />

        {/* --- right bar --- */}
        <Chatscreen/>
        </div>



      </div>
    </div>
  )
}

export default Home