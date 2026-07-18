import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Chatscreen from '../Components/Chatscreen'
import api from '../services/axios'

const Home = () => {

  return (
    <div
      className=' flex items-center justify-center h-screen flex-col '>
      {/* --- main container --- */}
      <div
        className='h-screen 
      backdrop-blur-xs bg-white/12 border border-white/35
           shadow-lg shadow-black/20
            w-full
          transition-all duration-300 flex-1 overflow-hidden'>

        <div className="con flex w-full h-full">
          {/* --- left bar --- */}
          <Sidebar />

          {/* --- right bar --- */}
          <Chatscreen />
        </div>



      </div>
    </div>
  )
}

export default Home