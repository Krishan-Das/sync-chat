import React from 'react'

const Messagecard = ({send}) => {
  return (
    <div className={`flex items-center  gap-3 w-fit py-1.5 px-4  ${send?"self-end bg-gray-800 text-white rounded-tr-2xl rounded-l-2xl" : "bg-white rounded-tl-2xl rounded-r-2xl"}`}>
      <h1>Hellow How are you?</h1>
      <p className={`self-end text-[10px] ${send ? 'text-[#e9e9e9b6]' : 'text-[#0f0f0feb]'}`}>10:33 pm</p>
    </div>
  )
}

export default Messagecard